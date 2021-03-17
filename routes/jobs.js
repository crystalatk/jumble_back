"use strict";

const express = require("express"),
  got = require("got"),
  router = express.Router();

router.get("/", async (req, res) => {
  const { progLang, zip } = req.query;
  const url = `https://jobs.github.com/positions.json?description=${progLang}&location=${zip}`;
  //   request(url).pipe(res);
  const jobsData = await got(url);
  if (jobsData) {
    res.send(jobsData.body);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
