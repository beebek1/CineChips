import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize, connectDB } from "./db/database.js";
import rootRouter from "./modules/main.router.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Replace your old app.use line with this:
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Mount Routes
app.use("/api", rootRouter);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await connectDB();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
