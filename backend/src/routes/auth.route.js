import express from "express";
import { signup, login, logout, checkAuth } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(arcjetMiddleware);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.put("/update-profilePic", authMiddleware, upload.single("profilePic"), updateProfilePic);

router.get("/check", authMiddleware, checkAuth);

export default router;
