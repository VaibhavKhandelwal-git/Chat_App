import { isValidObjectId } from "mongoose";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/User.model.js";
import apiResponse from "../utils/api.Response.js";
import apiError from "../utils/api.Error.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import { io, getReceiverSocketId } from "../utils/socket.js";

const getAllContacts = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const filteredContacts = await User.find({ _id: { $ne: userId } })
        .select("-password -refreshToken -createdAt -updatedAt -__v");

    if (!filteredContacts) {
        throw new apiError(404, "No contacts found");
    }

    res.status(200).json(new apiResponse(200, filteredContacts, "Contacts retrieved successfully"));
});

const getAllChats = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const conversations = await Conversation.find({
        participants: { $in: [userId] },
        isGroup: false,
    })
        .populate("participants", "-password -refreshToken")
        .populate("lastMessage")
        .sort({ updatedAt: -1 });

    // Return the other participant's user object for each conversation
    const chats = conversations
        .map((conv) => {
            const otherParticipant = conv.participants.find(
                (p) => p && p._id.toString() !== userId.toString()
            );

            if (!otherParticipant) return null;

            return {
                ...otherParticipant.toObject(),
                conversationId: conv._id,
                lastMessage: conv.lastMessage,
            };
        })
        .filter(Boolean);

    res.status(200).json(new apiResponse(200, chats, "Chats retrieved successfully"));
});

const getMessagesByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new apiError(400, "Invalid user id");
    }

    const conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, id] },
        isGroup: false,
    });

    if (!conversation) {
        return res.status(200).json(new apiResponse(200, [], "No messages found"));
    }

    const messages = await Message.find({ conversationId: conversation._id })
        .sort({ createdAt: 1 });

    res.status(200).json(new apiResponse(200, messages, "Messages retrieved successfully"));
});

const sendMessage = asyncHandler(async (req, res) => {
    const { text } = req.body;
    let imageUrl = "";

    if (req.file) {
        const cloudinaryFile = await uploadToCloudinary(req.file.path);
        if (!cloudinaryFile) {
            throw new apiError(500, "Failed to upload image");
        }
        imageUrl = cloudinaryFile.secure_url;
    }

    if (!imageUrl?.trim() && !text?.trim()) {
        throw new apiError(400, "Message cannot be empty");
    }

    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new apiError(400, "Invalid user id");
    }

    let conversation = await Conversation.findOne({
        participants: { $all: [req.user._id, id] },
        isGroup: false,
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [req.user._id, id],
        });
    }

    const msg = await Message.create({
        conversationId: conversation._id,
        sender: req.user._id,
        text: text?.trim() || "",
        image: imageUrl || "",
    });

    if (!msg) {
        throw new apiError(500, "Failed to send message");
    }

    conversation.lastMessage = msg._id
    await conversation.save()

    const receiverSocketId = getReceiverSocketId(id)
    if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", msg);
    }

    res.status(201).json(new apiResponse(201, msg, "Message sent successfully"));
});

export { getAllContacts, getAllChats, getMessagesByUserId, sendMessage };
