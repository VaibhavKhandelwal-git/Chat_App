import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/api.Error.js";
import User from "../models/User.model.js";

const authMiddleware = asyncHandler(async (req, _res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new apiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");

    if (!user) {
        throw new apiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
});

export default authMiddleware;
