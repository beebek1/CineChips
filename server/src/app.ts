import "dotenv/config";
import express from "express";
import cors from "cors";
import "./utils/crons.js";
import path from "path";
import { fileURLToPath } from "url";

import rootRouter from "./modules/main.router.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Uploads stuff
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "https://cine-chips.vercel.app/",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to CineChips API" });
});
app.use("/api", rootRouter);

// Error Handler
app.use(errorHandler);

export default app;
