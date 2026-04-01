import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRoutes from "./routes/aiRoutes.js";

dotenv.config();

const app = express();

function normalizeOrigin(value) {
  return String(value || "")
    .trim()
    .replace(/\/+$/, "");
}

const frontendOriginRaw = normalizeOrigin(process.env.FRONTEND_ORIGIN);
const allowAllOrigins = frontendOriginRaw === "*";
const allowedOrigins = allowAllOrigins
  ? []
  : normalizeOrigin(process.env.FRONTEND_ORIGIN || "http://localhost:5173")
      .split(",")
      .map(normalizeOrigin)
      .filter(Boolean);

app.disable("x-powered-by");
app.use(
  cors({
    origin(origin, callback) {
      if (allowAllOrigins) {
        callback(null, true);
        return;
      }
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.includes(normalized)) {
        callback(null, true);
        return;
      }
      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api", aiRoutes);

app.use((err, _req, res, _next) => {
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  if (String(err?.message || "").startsWith("Not allowed by CORS:")) {
    return res.status(403).json({ error: err.message });
  }
  console.error("Unhandled server error:", err);
  return res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
