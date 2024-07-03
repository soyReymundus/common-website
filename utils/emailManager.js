const nodemailer = require("nodemailer");
const lanParser = require('accept-language-parser');

const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"],
    port: process.env["SMTP_PORT"],
    secure: true,
    auth: {
    user: process.env["SMTP_USERNAME"],
    pass: process.env["SMTP_PASSWORD"],
    }
});

/**
 * 
 * @param {String} to  
 * @param {String} language 
 * @param {{ from: String, message: { en: { subject: string, html: string } } }} email 
 * @param {Object} data 
 */
module.exports.send = (to, language, email,  data = null) => {
  let msg = email.message[process.serverConfig["defaultLanguage"]];

  var languages = lanParser.parse(language);

  for (let index = 0; index < languages.length; index++) {
    const language = languages[index];

    if (language.region) {
      if (email.message[language.code + "-" + language.region]) {
          msg = email.message[language.code + "-" + language.region];
          break;
      };
  };

    if (!email.message[language.code]) continue;

    msg = email.message[language.code];
    break;
  };

  let dataKeys = Object.keys(data);

  for (let index = 0; index < dataKeys.length; index++) {
    const dataKey = dataKeys[index];
    let info = data[dataKey];

    msg.subject = msg.subject.replace(`%${dataKey}%`, info);
    msg.html = msg.html.replace(`%${dataKey}%`, info);
  };

  transporter.sendMail({
    "to": to,
    "from": email.from,
    "subject": msg.subject,
    "html": msg.html
  });
};