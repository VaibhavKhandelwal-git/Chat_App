import express from "express";
import { signup, login, logout, updateProfilePic, checkAuth } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/update-profilePic", authMiddleware, upload.single("profilePic"), updateProfilePic);
router.get("/check", authMiddleware, checkAuth);

export default router;
