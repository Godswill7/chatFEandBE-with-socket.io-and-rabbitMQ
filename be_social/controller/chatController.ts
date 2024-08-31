import { Request, Response } from "express";
import chatModel from "../model/chatModel";
import authModel from "../model/authModel";

import amqplib from "amqplib";

export const createChat = async (req: Request, res: Response) => {
  try {
    const { authID, friendID } = req.params;

    const user = await authModel.findById(authID);
    const friend = await authModel.findById(friendID);

    const findUserFriend = user?.friend.some((el: any) => el === friendID);

    const findFriendFriend = friend?.friend.some((el: any) => el === authID);

    if (findFriendFriend && findUserFriend) {
      const chat = await chatModel.create({
        member: [authID, friendID],
      });

      const URL: string = "amqp://localhost:5672";
      const connect = await amqplib.connect(URL);
      const channel = await connect.createChannel();

      await channel.sendToQueue("sendChat", Buffer.from(JSON.stringify(chat)));

      return res.status(201).json({
        message: "chat created",
        data: chat,
      });
    } else {
      return res.status(404).json({
        message: "You are not friends",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const findChat = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;

    const chat = await chatModel.find({
      member: {
        $in: [authID],
      },
    });

    return res.status(201).json({
      message: "chat created",
      data: chat,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const findOneChat = async (req: Request, res: Response) => {
  try {
    const { authID, friendID } = req.params;

    const chat = await chatModel.findOne({
      member: {
        $all: [authID, friendID],
      },
    });

    return res.status(201).json({
      message: "chat created",
      data: chat,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
