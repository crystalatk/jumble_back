"use strict";
require("dotenv").config();

const HTTP = require("http");

const HOSTNAME = "127.0.0.1";
const PORT = process.env.PORT || 3232;
const express = require("express"),
  app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

const SERVER = HTTP.createServer(app);

SERVER.listen(PORT, HOSTNAME, () => {
  console.log(`CRYSTALIZED on http://${HOSTNAME}:${PORT}`);
});

const rootController = require("./routes/index"),
  jobsController = require("./routes/jobs"),
  usersController = require("./routes/users");

app.use("/", rootController);
app.use("/jobs", jobsController);
app.use("/users", usersController);
