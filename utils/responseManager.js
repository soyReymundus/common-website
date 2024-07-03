const responsesList = require("../constants/responses");
const lanParser = require('accept-language-parser');
const { request, response } = require("express");

/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {Number} index 
 * @param {Object} data 
 */
module.exports = (req, res, index, data = null) => {
    let responseElement = responsesList[index];
    let msg = responseElement.message[process.serverConfig["defaultLanguage"]];

    var languages = lanParser.parse(req.headers["accept-language"]);

    for (let index = 0; index < languages.length; index++) {
        const language = languages[index];

        if (language.region) {
            if (responseElement.message[language.code + "-" + language.region]) {
                msg = responseElement.message[language.code + "-" + language.region];
                break;
            };
        };

        if (!responseElement.message[language.code]) continue;

        msg = responseElement.message[language.code];
        break;
    };

    res
        .setHeader("X-Status-Cat", "https://http.cat/" + responseElement.status)
        .status(responseElement.status)
        .json({
            "code": index,
            "message": msg,
            "data": data
        })
        .end();

};