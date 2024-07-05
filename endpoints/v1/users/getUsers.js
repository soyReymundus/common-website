const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const extractInfo = require("../../../utils/extractInfo.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.get("/", async (req, res) => {
    //req.query
    //DisplayName
    //LastName
    //FirstName
    //Username
    //Description

    DBManager.find(DBModels.USERS, {
        "ID": [{
            "$unequal": 1
        }, {
            "$unequal": 2
        }]
    }, {
        "elements": ["*"],
        "limit": -1,
        "useOR": false
    })

    let privilege = (req.me && req.me.ID == req.user.ID);
    
    responseManager(req, res, responsesEnum.USER_SUCCESSFULLY_RETRIEVE, {
        user: await extractInfo.user(req.user, privilege)
    });
});

module.exports = router;