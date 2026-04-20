import mongoose from "mongoose";

export const connectDB = async () => {
  const DB = process.env.MONGODB_URI;
  if (!DB) {
    throw new Error("MONGODB_URI is not defined");
  }

  try {
    await mongoose.connect(DB as string);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Cannot connect DB");
  }
};
