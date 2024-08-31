import { Document, Schema, model } from "mongoose";

interface iAuth {
  email: string;
  password: string;
  userName: string;
  friend: Array<string>;
}

interface iAuthData extends iAuth, Document {}

const authModel = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    userName: {
      type: String,
    },
    friend: { type: Array<String> },
  },
  { timestamps: true }
);

export default model<iAuthData>("auth", authModel);
