const jwt = require('jsonwebtoken');
const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const emailManager = require("../../../utils/emailManager.js");
const DBModels = require("../../../constants/DBModels.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");
const relationshipsChecker = require("../../../utils/relationshipsChecker.js");

router.use((req, res, next) => {
    if (req.method != "POST") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

router.post("/", async (req, res) => {
    if (!req.me) return responseManager(req, res, responsesEnum.UNAUTHENTICATED);
    let body = req.body;
    let order = [req.me.ID, req.user.ID].sort((a, b) => { return a - b });

    if (typeof body.type == "undefined") return responseManager(req, res, responsesEnum.NOT_JSON_PARAM);
    if (typeof body.type != "number") return responseManager(req, res, responsesEnum.WRONG_JSON_PARAM);

    if (req.me.ID == req.user.ID) return responseManager(req, res, responsesEnum.RELATIONSHIP_CONFLICT);

    switch (body.type) {
        case statusEnum.usersRelationships.SEND_FRIEND_REQUEST:
            if (await relationshipsChecker.checkBlock(req.user.ID, req.me.ID)) return responseManager(req, res, responsesEnum.YOU_ARE_BLOCKED);
            if (await relationshipsChecker.checkBlock(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.YOU_HAVE_BLOCKED);
            if (await relationshipsChecker.checkFriendRequest(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.FRIEND_REQUEST_ALREADY_SENT);
            if (await relationshipsChecker.checkFriendship(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.ALREADY_FRIENDS);

            if (await relationshipsChecker.checkFriendRequest(req.user.ID, req.me.ID)) {
                await DBModels.usersFriendRequests.destroy({
                    "where": {
                        "FROM": req.user.ID,
                        "TO": req.me.ID
                    }
                });

                await DBModels.usersFriends.create({
                    "User": req.me.ID,
                    "User2": req.user.ID
                });

                responseManager(req, res, responsesEnum.FRIEND_REQUEST_SUCCESSFULLY_ACCEPTED);
            } else {
                await DBModels.usersFriendRequests.create({
                    "FROM": req.me.ID,
                    "TO": req.user.ID
                });

                responseManager(req, res, responsesEnum.FRIEND_REQUEST_SUCCESSFULLY_SENT);
            };
            break;
        case statusEnum.usersRelationships.DELETE_FRIEND:
            if (!(await relationshipsChecker.checkFriendship(req.me.ID, req.user.ID))) return responseManager(req, res, responsesEnum.NOT_FRIENDS);

            await DBModels.usersFriends.destroy({
                "where": {
                    [Op.or]: [
                        { [Op.and]: [{ User: req.me.ID }, { User2: req.user.ID }] },
                        { [Op.and]: [{ User: req.user.ID }, { User2: req.me.ID }] }
                    ]
                }
            });

            responseManager(req, res, responsesEnum.FRIEND_REMOVE);
            break;
        case statusEnum.usersRelationships.ACCEPT_FRIEND_REQUEST:
            if (await relationshipsChecker.checkFriendship(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.ALREADY_FRIENDS);
            if (!(await relationshipsChecker.checkFriendRequest(req.user.ID, req.me.ID))) return responseManager(req, res, responsesEnum.FRIEND_REQUEST_DOES_NOT_EXIST);

            await DBModels.usersFriendRequests.destroy({
                "where": {
                    "FROM": req.user.ID,
                    "TO": req.me.ID
                }
            });

            DBModels.usersFriends.create({
                "User": req.me.ID,
                "User2": req.user.ID
            });

            responseManager(req, res, responsesEnum.FRIEND_REQUEST_SUCCESSFULLY_ACCEPTED);
            break;
        case statusEnum.usersRelationships.CANCEL_FRIEND_REQUEST:
            if (await relationshipsChecker.checkFriendship(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.ALREADY_FRIENDS);
            if (!(await relationshipsChecker.checkFriendRequest(req.me.ID, req.user.ID))) return responseManager(req, res, responsesEnum.FRIEND_REQUEST_DOES_NOT_EXIST);

            await DBModels.usersFriendRequests.destroy({
                "where": {
                    "FROM": req.me.ID,
                    "TO": req.user.ID
                }
            });

            responseManager(req, res, responsesEnum.FRIEND_REQUEST_SUCCESSFULLY_CANCELLED);

            break;
        case statusEnum.usersRelationships.REJECTED_FRIEND_REQUEST:
            if (await relationshipsChecker.checkFriendship(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.ALREADY_FRIENDS);
            if (!(await relationshipsChecker.checkFriendRequest(req.user.ID, req.me.ID))) return responseManager(req, res, responsesEnum.FRIEND_REQUEST_DOES_NOT_EXIST);

            await DBModels.usersFriendRequests.destroy({
                "where": {
                    "FROM": req.user.ID,
                    "TO": req.me.ID
                }
            });

            responseManager(req, res, responsesEnum.FRIEND_REQUEST_SUCCESSFULLY_REJECTED);

            break;
        case statusEnum.usersRelationships.BLOCK:
            if (await relationshipsChecker.checkBlock(req.me.ID, req.user.ID)) return responseManager(req, res, responsesEnum.YOU_HAVE_ALREADY_BLOCKED);

            await DBModels.usersBlocks.create({
                "FROM": req.me.ID,
                "TO": req.user.ID
            });

            responseManager(req, res, responsesEnum.USER_SUCCESSFULLY_BLOCKED);

            DBModels.usersFriends.destroy({
                "where": {
                    [Op.or]: [
                        { [Op.and]: [{ User: req.me.ID }, { User2: req.user.ID }] },
                        { [Op.and]: [{ User: req.user.ID }, { User2: req.me.ID }] }
                    ]
                }
            });

            DBModels.usersFriendRequests.destroy({
                "where": {
                    "FROM": req.user.ID,
                    "TO": req.me.ID
                }
            });

            DBModels.usersFriendRequests.destroy({
                "where": {
                    "FROM": req.me.ID,
                    "TO": req.user.ID
                }
            });
            break;
        case statusEnum.usersRelationships.UNBLOCK:
            if (!(await relationshipsChecker.checkBlock(req.me.ID, req.user.ID))) return responseManager(req, res, responsesEnum.USER_NOT_BLOCKED);

            await DBModels.usersBlocks.destroy({
                "where": {
                    "FROM": req.user.ID,
                    "TO": req.me.ID
                }
            });

            responseManager(req, res, responsesEnum.USER_SUCCESSFULLY_UNBLOCKED);

            break;
        default:
            return responseManager(req, res, responsesEnum.INVALID_RELATIONSHIP);
            break;
    };
});

module.exports = router;