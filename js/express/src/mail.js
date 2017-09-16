const nodemailer = require("nodemailer");
const MAIL_TO = "go.react@gmail.com";
const MAIL_FROM = '"Test App" <go.react@gmail.com>';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "go.react@gmail.com",
    pass: "Password123"
  }
});

const buildEmail = (subject, name) => ({
  to: MAIL_TO,
  from: MAIL_FROM,
  subject,
  text: `
      Hello ${name}
    `,
  html: `
      <html>
        <head>
          <title>Grend email</title>
        </head>
        <body>
          <p>Hello ${name}</p>
        </body>
      </html>
    `
});

const sendMail = (body, expressCallback) => {
  const { subject, name } = body; // fields in request json body
  return transporter.sendMail(buildEmail(subject, name), expressCallback);
};

module.exports = {
  sendMail
};
