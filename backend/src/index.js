import "dotenv/config"; // Load variables from .env
import express from "express";
import cors from "cors";
import { sequelize, connectDB } from "./db/database.js";

// Import Routes
import authRoutes from "./routes/authRoute.js";
import movieRoutes from "./routes/movieRoute.js";

// Import Models/Associations index to ensure tables are defined
import "./models/index.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true,
  }),
);

app.use(express.json());

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Home Page" });
});

const startServer = async () => {
  const PORT = process.env.PORT || 3000;
  try {
    await connectDB();

    // SYNC LOGIC EXPLAINED BELOW
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
