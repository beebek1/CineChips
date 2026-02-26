import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize, connectDB } from "./db/database.js";
import rootRouter from "./modules/main.router.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Mount Routes
app.use("/api", rootRouter);

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
