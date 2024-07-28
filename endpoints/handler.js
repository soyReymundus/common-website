const { Router } = require("express");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");
const cors = require('cors');
const router = Router();

router.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env["FRONTEND_SITE"]);
    next();
});

router.use((req, res, next) => {
    if (!process.serverConfig["methods"].includes(req.method)) return responseManager(req, res, responsesEnum.HTTP_METHOD_NOT_IMPLEMENTED);

    next();
});

router.use("/v1", require("./v1/handler.js"));

//BLANK PAGE
router.all("/", (req, res) => {
    if (req.method != "GET" && req.method != "HEAD") return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);

    responseManager(req, res, responsesEnum.OK);
});

//NOT FOUND PAGE
router.use((req, res) => {
    responseManager(req, res, responsesEnum.NOT_FOUND);
});

//Error handler
router.use((err, req, res, next) => {
    console.error(err);
    responseManager(req, res, responsesEnum.INTERNAL_SERVER_ERROR);
});

module.exports = router;