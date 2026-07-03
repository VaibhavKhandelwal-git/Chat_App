import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 3000;


//Make ready for Deployment
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend", "dist")));

    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
