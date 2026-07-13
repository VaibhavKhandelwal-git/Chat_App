import express from "express";
import { signup } from "../controllers/auth.conttroller.js";

const router = express.Router();

router.post("/signup", signup);

// login and logout controllers to be added later
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
