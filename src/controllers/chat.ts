import { Request, Response } from "express";
import { Text } from "../models/chat";

export const addChat = async (req: Request, res: Response) => {
  try {
    const { username, text } = req.body;
    const newText = new Text({
      username,
      text,
    });

    await newText.save();
    res.status(201).json({
      success: true,
      newText,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await Text.find();

    res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const deleteChats = async (req: Request, res: Response) => {
  try {
    await Text.deleteMany();
    res.status(200).json({
      success: true,
      message: "all chats successfully deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
