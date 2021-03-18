"use strict";
const host = "queenie.db.elephantsql.com",
  database = "ixcrksyx",
  user = "ixcrksyx",
  password = "PU0ckXxBxbFdZvbG6CBijDsNrCwzcTRt";

const pgp = require("pg-promise")({
  query: function (e) {
    console.log("QUERY:", e.query);
  },
});

const options = {
  host: host,
  database: database,
  user: user,
  password: password,
};

const db = pgp(options);

module.exports = db;
