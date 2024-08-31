import { HTTP } from "../Error/mainError";
import authModel from "../model/authModel";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../utils/email";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const value = crypto.randomBytes(10).toString("hex");

    const user = await authModel.create({
      email,
      password: hashed,
      token: value,
    });

    const token = jwt.sign({ id: user._id }, "token");

    sendMail(user, token).then(() => {
      console.log("Mail sent...!");
    });

    return res.status(HTTP.CREATE).json({
      message: "Registered user",
      data: user,
      token,
    });
  } catch (error: any) {
    return res.status(HTTP.CREATE).json({
      message: "error registering user",
      data: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { token } = req.params;

    const getUserID: any = jwt.verify(
      token,
      "token",
      (err: any, payload: any) => {
        if (err) {
          return err;
        } else {
          return payload;
        }
      }
    );

    const user = await authModel.findByIdAndUpdate(
      getUserID.id,
      {
        token: "",
        verified: true,
      },
      { new: true }
    );

    return res.status(HTTP.OK).json({
      message: "verified user",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error verifying user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword) {
        if (user.verified && user.token === "") {
          const token = jwt.sign(
            { id: user?._id, email: user?.email },
            "token"
          );

          return res.status(HTTP.CREATE).json({
            message: Welcome Back,
            data: token,
          });
        } else {
          return res.status(HTTP.BAD).json({
            message: "user haven't been verified",
          });
        }
      } else {
        return res.status(HTTP.BAD).json({
          message: "Password is incorrect",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "User is not found",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error signing in user",
      data: error.message,
    });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    await authModel.findByIdAndDelete(userID);

    return res.status(HTTP.CREATE).json({
      message: "Deleted",
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error deleting user",
      data: error.message,
    });
  }
};

export const viewAllUser = async (req: Request, res: Response) => {
  try {
    const user = await authModel.find();

    return res.status(HTTP.OK).json({
      message: "viewing all user",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing all users",
      data: error.message,
    });
  }
};

export const viewOneUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const user = await authModel.findById(userID);

    return res.status(HTTP.OK).json({
      message: "viewing one user",
      data: user,
    });
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error viewing one user",
      data: error.message,
    });
  }
};
