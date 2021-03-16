"use strict";

const express = require("express"),
  router = express.Router();

router.get("/", (req, res) => {
  res.json("Crystalize!").status(200);
});

module.exports = router;
