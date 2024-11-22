import express from "express";
import { handleURL } from "../controllers/urlcontrollers.js";

const router = express.Router();

router.post("/url" , handleURL );

export default router;
