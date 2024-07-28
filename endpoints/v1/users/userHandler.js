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

router.use(
    require("./getUser.js"),
    require("./deleteUser.js"),
    require("./updateUser.js")
);

module.exports = router;