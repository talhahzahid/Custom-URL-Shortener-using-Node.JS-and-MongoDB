import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectdb from "./src/db/index.js";
import router from "./src/routes/urlroutes.js";
const app = express();
const port = process.env.PORT;
import url from "./src/models/urlmodels.js";

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Url");
});
app.get("/:shortID", async (req, res) => {
  const { shortID } = req.params;
  try {
    const entry = await url.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectedUrl);
    res.status(200).json({
      "Url Short ID" : "heloo"
    })
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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
