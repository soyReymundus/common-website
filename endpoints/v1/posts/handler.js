const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.param('post', async (req, res, next, post) => {
    if (isNaN(parseInt(post))) return responseManager(req, res, responsesEnum.POST_NOT_FOUND);

    let p = await DBModels.posts.findOne({
        "where": {
            "ID": post
        }
    });

    if (p == null) return responseManager(req, res, responsesEnum.POST_NOT_FOUND);

    if (p["Status"] == statusEnum.posts["HIDDEN"]) {
        if (
            (req.path != "/" + p.ID)
            ||
            (req.method != "GET" && req.method != "HEAD")
        ) return responseManager(req, res, responsesEnum.POST_HIDDEN);
    };

    if (p["Status"] == statusEnum.posts["DELETED"]) {
        if (
            (req.path != "/" + p.ID)
            ||
            (req.method != "GET" && req.method != "HEAD")
        ) return responseManager(req, res, responsesEnum.POST_DELETED);
    };

    req.post = p;

    next();
});

router.use("/:post", require("./postHandler.js"));
router.use("/", require("./postsHandler.js"));

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;