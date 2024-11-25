import mongoose from "mongoose";
import { nanoid } from "nanoid";
import url from "../models/urlmodels.js";

const handleURL = async (req, res) => {
  const { URL } = req.body;
  if (!URL) {
    return res.status(400).json({
      Error: "Url is required",
    });
  }
  const shortid = nanoid(8);
  const addUrlIntoDatabase = await url.create({
    shortID: shortid,
    redirectedUrl: URL,
    visitHistory: [],
  });
  res.status(200).json({
    id: shortid,
  });
};

// const handleAnalytics = async (req, res) => {
//   try {
//     const shortID = req.params.shortID;
//     const click = await url.findOne({ shortID });

//     if (!click) {
//       return res.status(404).json({ message: "Short URL not found" });
//     }

//     const totalClicks = click.visitHistory ? click.visitHistory.length : 0; // Counting total clicks
//     return res.json({
//       totalClicks,
//       analytics: click.visitHistory,
//     });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ message: "An error occurred", error: error.message });
//   }
// };

const getAllUrl = async (req, res) => {
    const urls = await url.find({}); // Fetch all URLs from the database
    res.json(urls); // Return the fetched URLs as JSON
}
export { handleURL, getAllUrl };
