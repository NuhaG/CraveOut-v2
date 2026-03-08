import express from "express";
import { askAI } from "../controllers/aiController.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/ai/chat", aiLimiter, askAI);

export default router;
