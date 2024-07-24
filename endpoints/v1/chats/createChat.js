const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { createHash } = require("crypto");
const parser = require('accept-language-parser');
const extractInfo = require("../../../utils/extractInfo.js");
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

    if (typeof body.userID == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.userID != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    let u = await DBModels.users.findOne({
        "where": {
            "ID": body.userID
        }
    });

    if (u == null) return responseManager(req, res, responsesEnum.USERID_NOT_FOUND);
    if (u["Status"] == statusEnum.users["BANNED"]) return responseManager(req, res, responsesEnum.USERID_BANNED);
    if (u["Status"] == statusEnum.users["DELETED"]) return responseManager(req, res, responsesEnum.USERID_DELETED);

    let c = await DBModels.chats.findOne({
        include: {
            model: DBModels.chatParticipants,
            as: 'ChatParticipants',
            required: true,
            where: {
                UserID: {
                    [Op.in]: [req.me.ID, body.userID]
                }
            }
        },
        where: {
            [Op.and]: [
                sequelize.literal(`(
              SELECT COUNT(DISTINCT cp.UserID)
              FROM ChatParticipants AS cp
              WHERE cp.ChatID = Chats.ID
            ) = 2`),
                sequelize.literal(`(
              SELECT COUNT(cp.UserID)
              FROM ChatParticipants AS cp
              WHERE cp.ChatID = Chats.ID
                AND cp.UserID IN (${req.me.ID}, ${body.userID})
            ) = 2`)
            ]
        }
    });

    if (c && c["dataValues"]) {
        if (c["dataValues"]["Status"] == statusEnum.chats["OK"]) {
            let participants = await DBModels.chatParticipants.findAll({
                "where": {
                    "ChatID": c["dataValues"]["ID"]
                }
            });

            return responseManager(req, res, responsesEnum.CHAT_SUCCESSFULLY_RETRIEVED, {
                chat: await extractInfo.chat(c["dataValues"], participants, req.me.ID)
            });
        };
    };

    if (await relationshipsChecker.checkBlock(body.userID, req.me.ID)) return responseManager(req, res, responsesEnum.YOU_ARE_BLOCKED);
    if (await relationshipsChecker.checkBlock(req.me.ID, body.userID)) return responseManager(req, res, responsesEnum.YOU_HAVE_BLOCKED);

    let newChat = await DBModels.chats.create({
        LastMessage: Date.now(),
    });

    let participants = await DBModels.chatParticipants.bulkCreate([
        {
            ChatID: newChat.ID,
            UserID: body.userID,
            Unread: 0,
            Closed: false
        },
        {
            ChatID: newChat.ID,
            UserID: req.me.ID,
            Unread: 0,
            Closed: false
        }
    ]);

    responseManager(req, res, responsesEnum.CHAT_SUCCESSFULLY_CREATED, {
        chat: await extractInfo.chat(newChat["dataValues"], participants, req.me.ID)
    });
});

module.exports = router;