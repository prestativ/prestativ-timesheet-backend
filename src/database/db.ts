import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const { DB_URL, DB_HOST, DB_NAME, DB_PORT, DB_USER, DB_PASS } = process.env;

mongoose.set("strictQuery", false);

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        `${DB_URL}` ||
          `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
      )
      .then(() => {
        console.log("Database connected");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

module.exports = new Database();
