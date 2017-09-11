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

const buildEmail = (subject, name, email, phone) => ({
  to: MAIL_TO,
  from: MAIL_FROM,
  subject,
  text: `
      Name: ${name}\r\n
      Email: ${email}\r\n
      Phone: ${phone}\r\n
    `,
  html: `
      <html>
        <head>
          <title>Grend email</title>
        </head>
        <body>
          <h3>Info</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
            <tr>
              <td>${name}</td>
              <td>${email}</td>
              <td>${phone}</td>
            </tr>
          </table>
        </body>
      </html>
    `
});

const sendMail = (body, callBack) => {
  const { subject, name, email, phone } = body; // fields in request json body
  return transporter.sendMail(
    buildEmail(subject, name, email, phone),
    (error, info) => {
      if (error) {
        callBack({ sent: false, msg: error });
      }
      callBack({
        sent: true,
        msg: `Mail ${info.messageId} sent: ${info.response}`
      });
    }
  );
};

module.exports = {
  sendMail
};
