import apiResponse from "../utils/api.Response.js";
import apiError from "../utils/api.Error.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import setTokenCookies from "../utils/setTokenCookies.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new apiError(500, "Something went wrong while generating tokens");
    }
};

const signup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
        throw new apiError(400, "All fields are required");
    }

    if (password.length < 6) {
        throw new apiError(400, "Password must be at least 6 characters long");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new apiError(400, "Invalid email format");
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { username }],
    });

    if (existingUser) {
        throw new apiError(400, "User Already Exists");
    }

    const newUser = await User.create({
        fullName: username,
        email,
        password,
    });

    if (!newUser) {
        throw new apiError(400, "User not Created");
    }

    //send user a joining email
    await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

    const user = await User.findById(newUser._id).select("-password -refreshToken");

    return setTokenCookies(res, accessToken, refreshToken)
        .status(201)
        .json(new apiResponse(201, user, "User Created Successfully"));
});

export { signup };
