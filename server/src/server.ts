import app from "./app.js";
import db from "./config/db.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await db.$connect();
    console.log(" PSQL Database connected successfully ");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
