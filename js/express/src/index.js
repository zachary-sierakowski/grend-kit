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

app.post("/mail", (req, res) => {
  sendMail(req.body, (error, info) => {
    if (error) {
      console.error(error.response);
    }
    res.status(error ? 500 : 200).send({ error, info });
  });
});

app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
