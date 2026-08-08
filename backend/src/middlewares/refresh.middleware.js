import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/api.Error.js";
import User from "../models/User.model.js";

const refreshMiddleware = asyncHandler(async (req, _res, next) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new apiError(401, "Refresh token missing");
    }

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new apiError(401, "Invalid refresh token");
    }

    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
        throw new apiError(401, "Invalid refresh token");
    }

    req.user = user;
    next();
});

export default refreshMiddleware;
