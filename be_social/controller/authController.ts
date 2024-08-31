import { Request, Response } from "express";
import authModel from "../model/authModel";

export const createAuth = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const auth = await authModel.create({ userName, email, password });

    return res.status(201).json({
      message: "create auth",
      data: auth,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const findAuth = async (req: Request, res: Response) => {
  try {
    const auth = await authModel.find();

    return res.status(200).json({
      message: "find auth",
      data: auth,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const findOneAuth = async (req: Request, res: Response) => {
  try {
    const { authID } = req.params;
    const auth = await authModel.findById(authID);
    return res.status(200).json({
      message: "find one auth",
      data: auth,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const makeFriends = async (req: Request, res: Response) => {
  try {
    const { authID, friendID } = req.params;
    const auth: any = await authModel.findById(authID);
    const friend: any = await authModel.findById(friendID);

    if (auth && friend) {
      if (auth.friend.some((el: string) => el === friendID)) {
        return res.status(404).json({
          message: "You are already friends",
        });
      } else {
        let authPush = [...auth.friend, friendID];

        let friendPush = [...friend.friend, authID];

        const makeFri = await authModel.findByIdAndUpdate(
          authID,
          {
            friend: authPush,
          },
          { new: true }
        );

        const newAuth = await authModel.findByIdAndUpdate(
          friendID,
          {
            friend: friendPush,
          },
          { new: true }
        );

        return res.status(200).json({
          message: "You are now friends",
          data: { makeFri, newAuth },
        });
      }
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const unFriends = async (req: Request, res: Response) => {
  try {
    const { authID, friendID } = req.params;
    const auth: any = await authModel.findById(authID);
    const friend: any = await authModel.findById(friendID);

    if (auth && friend) {
      const makeFri = await authModel.findByIdAndUpdate(
        authID,
        {
          friend: auth.friend.filter((el: any) => el !== friendID),
        },
        { new: true }
      );

      const newAuth = await authModel.findByIdAndUpdate(
        friendID,
        {
          friend: friend.friend.filter((el: any) => el !== authID),
        },
        { new: true }
      );

      return res.status(200).json({
        message: "You are now friends",
        data: { makeFri, newAuth },
      });
    } else {
      return res.status(404).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
