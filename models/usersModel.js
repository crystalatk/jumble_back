"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async addUser(
    username,
    password,
    first_name,
    last_name,
    zip_code,
    phone_num,
    picture
  ) {
    try {
      const query = `INSERT INTO users (username, password, first_name, last_name, zip_code, phone_num, picture) VALUES ('${username}',  '${password}', '${first_name}', '${last_name}', '${zip_code}', '${phone_num}', '${picture}') RETURNING id;`;
      const response = await db.one(query);
      return response;
    } catch (error) {
      return error.message;
    }
  }

  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }

  async login() {
    try {
      const query = `SELECT * FROM users WHERE username = '${this.username}';`;
      const response = await db.one(query);
      const isValid = this.checkPassword(response.password);
      if (!!isValid) {
        const { id, username } = response;
        return { isValid, user_id: id, username };
      } else {
        return { isValid };
      }
    } catch (error) {
      return error.message;
    }
  }

  static async addEntry(user_id, job_id, table) {
    const query = `INSERT INTO ${table} (user_id, job_id) VALUES ('${user_id}', '${job_id}');`;
    try {
      const response = await db.result(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = User;
