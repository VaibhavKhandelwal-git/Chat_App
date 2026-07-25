import { isValidObjectId } from "mongoose";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import User from "../models/User.model.js";
import apiResponse from "../utils/api.Response.js";
import apiError from "../utils/api.Error.js";
import asyncHandler from "../utils/asyncHandler.js";

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

    res.status(200).json(new apiResponse(200, conversations, "Chats retrieved successfully"));
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
    const { image, text } = req.body;

    if (!image?.trim() && !text?.trim()) {
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
        image: image?.trim() || "",
    });

    if (!msg) {
        throw new apiError(500, "Failed to send message");
    }

    conversation.lastMessage = msg._id;
    await conversation.save();

    res.status(201).json(new apiResponse(201, msg, "Message sent successfully"));
});

export { getAllContacts, getAllChats, getMessagesByUserId, sendMessage };
