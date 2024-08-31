import { Router } from "express";
import { createNotice } from "../controller/notifyController";

const router: Router = Router();

router.route("/notify").post(createNotice);

export default router;
