import express from "express";
import { handleURL, getAllUrl } from "../controllers/urlcontrollers.js";

const router = express.Router();

router.post("/url", handleURL);
router.get("/all", getAllUrl);  

// router.get("/url/analytice/:shortId", handleAnalytics);

export default router;
