import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
import { getAllContacts, getAllChats, getMessagesByUserId, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/contacts", getAllContacts);
router.get("/chats", getAllChats);
router.route("/:id").get(getMessagesByUserId).post(upload.single("image"), sendMessage);

export default router;
