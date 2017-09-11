"use strict";

const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const { sendMail } = require("./mail");

const app = express();

const HOST = "0.0.0.0";
const PORT = 8080;
const DIST_PATH = "../../react/dist";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, DIST_PATH)));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, DIST_PATH, "index.html"))
);

app.post("/contact", (req, res) => {
  sendMail(req.body, response => {
    if (!response.sent) {
      console.error(response.msg);
    } else {
      console.log(response.msg);
    }
    res.send({ sent: response });
  });
});

app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
