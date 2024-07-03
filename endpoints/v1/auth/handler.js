const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const { createHash } = require("crypto");
const DBManager = require("../../../utils/DBManager.js");
const EmailSender = require("../../../utils/EmailSender.js");
const DBTables = require("../../../constants/DBTables.js");
const statusEnum = require("../../../constants/statusEnum.js");
const checkUserStatus = require("../../../utils/checkUserStatus.js");
const responsesEnum = require("../../../constants/responsesEnum.js");
const responseManager = require("../../../utils/responseManager.js");
const emailResponses = require("../../../constants/emailResponses.js");

router.use("/login", require("./login.js"));
router.use("/register", require("./register.js"));
router.use("/reset", require("./reset.js"));
router.use("/verify", require("./verify.js"));

router.use((req, res, next) => {
    if (req.method != "GET" && req.method != "HEAD") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    next();
});

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

module.exports = router;