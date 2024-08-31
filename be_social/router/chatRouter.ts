import { Router } from "express";
import {
  createChat,
  findChat,
  findOneChat,
} from "../controller/chatController";

const router: Router = Router();

router.route("/create-chat/:authID/:friendID").post(createChat);
router.route("/find-chat/:authID/").get(findChat);
router.route("/find-one-chat/:authID/:friendID").get(findOneChat);

export default router;
