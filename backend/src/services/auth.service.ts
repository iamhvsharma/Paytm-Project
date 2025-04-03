import { Request, Response } from "express";
import User from "../models/user.model";

export const registerUserService = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({
      email: email,
      password: password,
    });

    if (!existingUser) {
      const user = new User({
        name: name,
        email: email,
        password: password,
      });
      await user.save();
      res.status(201).json({
        message: "User registered successfully",
        email: user.email,
        name: user.name,
      });
    } else {
      res.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const loginUserService = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({
      email: email,
      password: password,
    });

    if (user) {
      res.status(200).json({
        message: "User logged in successfully",
        token: user._id,
      });
    } else {
      res.status(401).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
