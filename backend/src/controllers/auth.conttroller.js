import apiResponse from "../utils/api.Response.js";
import apiError from "../utils/api.Error.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import setTokenCookies from "../utils/setTokenCookies.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import bcrypt from "bcryptjs";

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
    try {
        const joinedAt = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL, joinedAt);
    } catch (emailError) {
        console.error("Welcome email failed (non-critical):", emailError.message);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

    const user = await User.findById(newUser._id).select("-password -refreshToken");

    return setTokenCookies(res, accessToken, refreshToken)
        .status(201)
        .json(new apiResponse(201, user, "User Created Successfully"));
});

const login = asyncHandler(async(req,res)=>{

    const { email, password } = req.body

    if(!email?.trim()  || !password?.trim()){
        throw new apiError(400,"All fields are required")
    }

    const user= await User.findOne({email: email.trim()})

    if(!user){
        throw new apiError(400,"Invalid Credentials")
    }

    const isPassValid= await bcrypt.compare(password,user.password)

    if(!isPassValid){
        throw new apiError(400,"Invalid Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const userData = await User.findById(user._id).select("-password -refreshToken");

    return setTokenCookies(res, accessToken, refreshToken)
        .status(200)
        .json(new apiResponse(200, userData, "Login Successful"));
})

const logout = asyncHandler(async(req,res)=>{
    
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new:true
        }
    )

    const options = {
        httpOnly:true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
    new apiResponse(200, {}, "User logged out successfully"))
       
})

const updateProfilePic = asyncHandler(async(req,res)=>{
    
    const profilePic = req.file?.path

    if(!profilePic){
        throw new apiError(400,"Profile picture is required")
    }

    const cloudinaryFile = await uploadToCloudinary(profilePic)

    if(!cloudinaryFile){
        throw new apiError(500,"Failed to upload profile picture")
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                profilePic: cloudinaryFile.secure_url
            }
        },
        { new: true }
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new apiResponse(200, user, "Profile picture updated successfully"));
});

const checkAuth = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new apiResponse(200, req.user, "User is authenticated")
    );
});


export { signup, login, logout, updateProfilePic, checkAuth };
