const { Router } = require("express");
const responsesEnum = require("../constants/responsesEnum.js");
const responseManager = require("../utils/responseManager.js");
const router = Router();

//BLANK PAGE
router.get("/", (req, res) => {
    responseManager(req, res, responsesEnum.OK);
});

router.use("/v1", require("./v1/handler.js"));

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