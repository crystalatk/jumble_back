"use strict";

const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  UserModel = require("../models/usersModel");

// GETS

router.get("/", async (req, res) => {
  res.sendStatus(200);
});

// POSTS

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = new UserModel(null, username, password);
  const response = await user.login();
  if (!!response.isValid) {
    res.send(response);
  } else {
    res.sendStatus(500);
  }
});

router.post("/signup", async (req, res) => {
  console.log("IN THE USER SIGN UP!");
  const {
    username,
    password,
    first_name,
    last_name,
    zip_code,
    phone_num,
    picture,
  } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const response = await UserModel.addUser(
    username,
    hash,
    first_name,
    last_name,
    zip_code,
    phone_num,
    picture
  );
  if (response.id) {
    res.send(response);
  } else {
    res.send("Error: please try again").status(500);
  }
});

router.post("/add", async (req, res) => {
  const { user_id, job_id, table } = req.body;
  const response = await UserModel.addEntry(user_id, job_id, table);
  response ? res.sendStatus(200) : res.sendStatus(500);
});

module.exports = router;
