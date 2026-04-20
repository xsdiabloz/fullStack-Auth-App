import express from "express";
import "dotenv/config";
import { connectDB } from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

const start = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server starts at Port: ${PORT}`));
};

start();
