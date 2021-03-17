"use strict";

const express = require("express"),
  got = require("got"),
  router = express.Router();

router.get("/", async (req, res) => {
  const { url } = req.query;
  //   request(url).pipe(res);
  const jobsData = await got(url);
  console.log("JOBSDATA: ", jobsData);
  if (jobsData) {
    res.send(jobsData.body);
  } else {
    res.sendStatus(500);
  }
});

module.exports = router;
