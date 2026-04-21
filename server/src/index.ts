import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./db/db.js";
import router from "./router/router.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/auth", router);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server starts at Port: ${PORT}`));
};

start();
