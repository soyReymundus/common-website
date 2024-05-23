process.on("uncaughtException", (exception) => {
    process.report.writeReport(exception);
    process.exit(1);
});
require('dotenv').config();

const express = require("express");
const app = express();
process.serverConfig = require("./constants/serverConfig.json");

if (!process.serverConfig["x-powered-by"]) app.disable('x-powered-by');

app.use(require("./endpoints/handler.js"));

app.listen(process.serverConfig["port"], process.serverConfig["host"]);