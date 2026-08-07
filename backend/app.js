import "./src/config/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { app, server } from "./src/utils/socket.js";
import connectDB from "./src/db/db.js";
import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "dist")));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
