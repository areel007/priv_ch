import { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const newUser = new User({
      username,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "new user registered",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token for user authentication
    const jwtSecretToken = String(process.env.JWT_SECRET_TOKEN as string);
    const token = jwt.sign({ userId: user._id }, jwtSecretToken, {
      expiresIn: "1h", // Token expiration time
    });

    // Create a user object without the username field
    const userWithoutUsername = {
      _id: user._id,
    };

    res.status(200).json({
      success: true,
      user: { ...userWithoutUsername, token },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
