import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import path from "path";
import connectdb from "./src/db/index.js";
import url from "./src/models/urlmodels.js";
import router from "./src/routes/urlroutes.js";
import { connect } from "http2";
const app = express();
const port = process.env.PORT;

// ejs setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// middleware
app.use(express.json());
app.use(cors());

// router setup
app.use("/", router);

app.get("/hello", (req, res) => {
  res.send("Hello Url");
});
// app.get("/ ", async (req, res) => {
//   const allUrls = await url.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });
app.get('/shortid' , async (req,res)=>{
  await url.findOne({shortId})
  res.json()
})
app.get("/:shortID", async (req, res) => {
  const { shortID } = req.params;
  const entry = await url.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectedUrl);
});

// data base connect function
connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log("Server Running Is Successfully", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
