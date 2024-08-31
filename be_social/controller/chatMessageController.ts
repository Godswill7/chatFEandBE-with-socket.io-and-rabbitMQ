import { Request, Response } from "express";
import chatMessageModel from "../model/chatMessage";

export const ccreateChatMessage = async (req: Request, res: Response) => {
  try {
    const { authID, chatID } = req.params;
    const { message } = req.body;

    const chatMessage = await chatMessageModel.create({
      authID,
      chatID,
      message,
    });

    return res.status(201).json({
      message: "create message",
      data: chatMessage,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const readChatMessage = async (req: Request, res: Response) => {
  try {
    const { chatID } = req.params;

    const chatMessage = await chatMessageModel.find({
      chatID,
    });

    return res.status(200).json({
      message: "read chat message",
      data: chatMessage,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
