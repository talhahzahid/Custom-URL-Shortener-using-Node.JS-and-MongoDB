import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectdb from "./src/db/index.js";
import router from "./src/routes/urlroutes.js";
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Url");
});
app.use("/", router);

connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Running Is Successfully", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
