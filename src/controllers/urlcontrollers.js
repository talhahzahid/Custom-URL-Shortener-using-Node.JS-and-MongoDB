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
    data: addUrlIntoDatabase,
  });
};

export { handleURL };
