const { Router, json } = require("express");
const jwt = require('jsonwebtoken');
const DBManager = require("../../utils/DBManager.js");
const DBTables = require("../../constants/DBTables.js");
const statusEnum = require("../../constants/statusEnum.js");
const checkUserStatus = require("../../utils/checkUserStatus.js");
const responseManager = require("../../utils/responseManager.js");
const responsesEnum = require("../../constants/responsesEnum.js");
const router = Router();

router.use((req, res, next) => {
    if (!req.headers["accept"]) return responseManager(req, res, responsesEnum.NOT_ACCEPT_HEADER);

    if (!/(application|\*)\/(json|\*)/g.test(req.headers["accept"])) return responseManager(req, res, responsesEnum.UNACCEPTABLE_ACCEPT_HEADER);

    if (req.method != "GET" && req.method != "DELETE") {
        if (!req.headers["content-type"]) return responseManager(req, res, responsesEnum.NOT_CONTENT_TYPE_HEADER);

        let contentType = req.headers["content-type"].replace(/ /g, "").split(";");

        if (!contentType.includes("application/json")) return responseManager(req, res, responsesEnum.UNACCEPTABLE_CONTENT_TYPE_HEADER);
    };

    next();
});

router.use((req, res, next) => {
    if (!req.headers["authorization"]) return;

    let rawToken = req.headers["authorization"].split(/ /g);

    let tokenSchema = rawToken[0];
    let token = rawToken.slice(1).join(" ");

    switch (tokenSchema) {
        case "bearer":
            jwt.verify(token, process.env["JWT_KEY"], async (err, decoded) => {
                if (err) {
                    switch (err.name) {
                        case "NotBeforeError":
                            return responseManager(req, res, responsesEnum.INVALID_NBF_TOKEN, {
                                "before": (new Date(err.date)).getTime()
                            });
                            break;
                        case "TokenExpiredError":
                            return responseManager(req, res, responsesEnum.EXPIRED_TOKEN);
                            break;
                        case "JsonWebTokenError":
                            return responseManager(req, res, responsesEnum.INVALID_TOKEN);
                            break;
                        default:
                            return responseManager(req, res, responsesEnum.INVALID_TOKEN);
                            break;
                    }
                };

                let user = await DBManager.find(DBTables.USERS, {
                    "ID": decoded.ID
                });

                if (user == null) return responseManager(req, res, responsesEnum.INVALID_TOKEN);

                let userCheck = await checkUserStatus(req, res, user);

                if (!userCheck) return;
                if (user.PasswordResets != decoded.serie) return responseManager(req, res, responsesEnum.INVALID_TOKEN);
                if (user.DeletionDate) return responseManager(req, res, responsesEnum.SCHEDULED_DELETION);

                req.me = user;
            });
            break;
        default:
            return responseManager(req, res, responsesEnum.INVALID_TOKEN_SCHEME);
            break;
    }

    next();
});

router.use(json());
router.use("/auth", require("./auth/handler.js"));

//BLANK PAGE
router.post("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

//Error handler
router.use((err, req, res, next) => {
    if (err.type == "entity.parse.failed") return responseManager(req, res, responsesEnum.OK);
    if (err.type == "entity.too.large") return responseManager(req, res, responsesEnum.OK);

    next(err);
});

module.exports = router;