import { Schema, model, Document } from "mongoose";

interface iChat {
  chatID: string;
  authID: string;
  message: string;
}

interface iChatData extends iChat, Document {}

const chatMessageModel = new Schema(
  {
    chatID: {
      type: String,
    },
    authID: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iChatData>("chatMessages", chatMessageModel);
