"use strict";

const db = require("./conn"),
  bcrypt = require("bcryptjs");

class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async checkUserNames(username) {
    try {
      const response = await db.one(
        `SELECT username FROM users WHERE username=${username};`
      );
      return true;
    } catch (err) {
      return false;
    }
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

  static async addEntry(
    user_id,
    job_id,
    title,
    location,
    company,
    company_url,
    created_at,
    description,
    how_to_apply,
    company_logo,
    table
  ) {
    try {
      const response = await db.result(
        `INSERT INTO ${table} (user_id, job_id, title, location, company, company_url, created_at, description, how_to_apply, company_logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`,
        [
          user_id,
          job_id,
          title,
          location,
          company,
          company_url,
          created_at,
          description,
          how_to_apply,
          company_logo,
        ]
      );
      return response;
    } catch (err) {
      console.log(err.message);
      return err.message;
    }
  }

  static async getData(user_id, table) {
    const query = `SELECT * FROM ${table} WHERE user_id = ${user_id} ORDER BY date DESC;`;
    try {
      const response = await db.any(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getUserData(user_id, table) {
    const query = `SELECT * FROM ${table} WHERE id = ${user_id}`;
    try {
      const response = await db.one(query);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async deleteEntry(user_id, job_id, table) {
    try {
      const response = await db.result(
        `DELETE FROM ${table} WHERE user_id = $1 AND job_id = $2`,
        [user_id, job_id]
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = User;
