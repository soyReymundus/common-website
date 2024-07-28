const { Router, json } = require("express");
const jwt = require('jsonwebtoken');
const DBManager = require("../../utils/DBManager.js");
const DBModels = require("../../constants/DBModels.js");
const statusEnum = require("../../constants/statusEnum.js");
const checkUserStatus = require("../../utils/checkUserStatus.js");
const responseManager = require("../../utils/responseManager.js");
const responsesEnum = require("../../constants/responsesEnum.js");
const router = Router();
const rateLimit = new Map();

/**
 * 
 * @param {Map} map 
 * @param {{key: string, method: string, path: string}} req 
 * @param {{max: number, every: number}} limit 
 */

router.use((req, res, next) => {
    let endpointPath = req.path.split("/").slice(1);
    let serverConfig = process.serverConfig["root"]["v1"];
    let endpointConfig = serverConfig;

    if (serverConfig["routingDisabled"]) return responseManager(req, res, responsesEnum.DISABLED_PATH);

    for (let index = 0; index < endpointPath.length; index++) {
        let pathChunk = endpointConfig[endpointPath[index]];

        if (!endpointPath[index] && index == 0) {
            pathChunk = endpointConfig;

            continue;
        };

        if (typeof pathChunk == "undefined" || typeof pathChunk["routingDisabled"] != "boolean") {
            if (
                typeof endpointConfig == "undefined"
                ||
                typeof endpointConfig["routingDisabled"] != "boolean"
            ) return next();
            if (
                typeof endpointConfig["PARAM"] == "undefined"
                ||
                typeof endpointConfig["PARAM"]["routingDisabled"] != "boolean"
            ) return next();

            endpointPath[index] = "PARAM";
            pathChunk = endpointConfig["PARAM"];
        };

        if (pathChunk["routingDisabled"]) return responseManager(req, res, responsesEnum.DISABLED_PATH);

        endpointConfig = pathChunk;
    };

    if (endpointConfig["disabled"]) return responseManager(req, res, responsesEnum.DISABLED_ENDPOINT);

    res.setHeader("Access-Control-Allow-Methods", endpointConfig["methods"].join(", "));

    if (req.method == "OPTIONS") return responseManager(req, res, responsesEnum.OK);

    if (!endpointConfig["methods"].includes(req.method)) {
        res.setHeader("Allow", endpointConfig["methods"].join(", "));

        return responseManager(req, res, responsesEnum.METHOD_NOT_ALLOWED);
    };

    req.configPath = "/" + endpointPath.join("/");
    req.config = endpointConfig;

    next();
});

module.exports = router;