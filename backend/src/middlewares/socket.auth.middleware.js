import jwt from "jsonwebtoken";
import User from "../models/User.js";
import apiError from "../utils/apiError.js";
import { ENV } from "../lib/env.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {

        // Extract JWT from HTTP-only cookies
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            return next(
                new apiError(401, "Unauthorized - No Token Provided")
            );
        }

        // Verify JWT
        const decoded = jwt.verify(token, ENV.JWT_SECRET);


        // Find authenticated user
        const user = await User.findById(decoded.userId)
            .select("-password -refreshToken");

        if (!user) {
            return next(
                new apiError(404, "User not found")
            );
        }

        // Attach authenticated user to this socket
        socket.user = user;
        socket.userId = user._id.toString();

        console.log(
            `Socket authenticated for user: ${user.fullName} (${user._id})`
        );

        // Continue socket connection
        next();

    } catch (error) {

        console.log(
            "Error in socket authentication:",
            error.message
        );

        if (error instanceof apiError) {
            return next(error);
        }

        return next(
            new apiError(
                401,
                "Unauthorized - Authentication Failed"
            )
        );
    }
};