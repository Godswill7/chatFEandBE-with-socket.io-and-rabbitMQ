import { Schema, model, Document } from "mongoose";

interface iChat {
  notice: {};
}

interface iChatData extends iChat, Document {}

const notifyModel = new Schema(
  {
    notice: {
      type: {},
    },
  },
  { timestamps: true }
);

export default model<iChatData>("notifys", notifyModel);
