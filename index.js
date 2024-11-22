import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connect } from "mongoose";
import connectdb from "./src/db/index.js";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Url");
});

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Running Is Successfully", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
