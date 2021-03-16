"use strict";

const express = require("express"),
  router = express.Router(),
  fetch = require("node-fetch");

router.get("/:progLang", async (req, res) => {
  console.log("i am here");
  const { progLang } = req.params;
  console.log("PROGLANG", progLang);
  const url = `https://jobs.github.com/positions.json?description=${progLang}`;
  const jobsData = await fetch(url).then((response) => response.json());
  console.log("JOBSDATA: ", jobsData);
  if (jobsData) {
    res.json(jobsData).status(200);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
