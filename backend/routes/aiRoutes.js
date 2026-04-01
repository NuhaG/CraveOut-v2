import express from "express";
import { askAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai/chat", askAI);

export default router;
