import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../lib/generateToken.js";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "The password must be at least 6 symbols" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Such a User exists, choose another email" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json({ message: "User created sucessfully" });
  } catch (error) {
    console.log("Signup error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateToken(user._id, res);
    return res.status(200).json({ message: "Logged In successfully" });
  } catch (error) {
    console.log("Log In error", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.status(200).json({ message: "Logged Out successfully" });
  } catch (error) {
    console.log("Log Out error", error);
    return res.status(500).json({ message: "Server error" });
  }
};
