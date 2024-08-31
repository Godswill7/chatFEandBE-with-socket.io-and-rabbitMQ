import { Router } from "express";
import {
  ccreateChatMessage,
  readChatMessage,
} from "../controller/chatMessageController";

const router: Router = Router();

router.route("/create-chat-message/:authID/:chatID").post(ccreateChatMessage);
router.route("/read-chat-message/:chatID").get(readChatMessage);

export default router;
