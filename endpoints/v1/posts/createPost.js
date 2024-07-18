const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");
const relationshipsChecker = require("../../../utils/relationshipsChecker.js");

router.post("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    let body = req.body;
    let post = {
        "UserID": req.me.ID,
        "PublicationDate": Date.now()
    };

    if (typeof body.title == "undefined" || typeof body.content == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.title != "string" || typeof body.content != "string") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if (body.title) {
        if (3 > body.title.length || 32 < body.title.length) return responseManager(req, res, responsesEnum.INVALID_TITLE);

        post["Title"] = body.title;
    };

    if (body.content) {
        if (5 > body.content.length || 3000 < body.content.length) return responseManager(req, res, responsesEnum.INVALID_CONTENT);

        post["Content"] = body.content;
    };

    if (body.postID) {
        if (typeof body.postID != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

        let p = await DBModels.posts.findOne({
            "where": {
                "ID": body.postID
            }
        });

        if (p == null) return responseManager(req, res, responsesEnum.INVALID_POSTID);

        if (await relationshipsChecker.checkBlock(p.UserID, req.me.ID)) return responseManager(req, res, responsesEnum.YOU_ARE_BLOCKED);
        if (await relationshipsChecker.checkBlock(req.me.ID, p.UserID)) return responseManager(req, res, responsesEnum.YOU_HAVE_BLOCKED);

        post["PostID"] = body.postID;
    };

    await DBModels.posts.create(post);

    responseManager(req, res, responsesEnum.POSTS_SUCCESSFULLY_CREATE);
});

module.exports = router;