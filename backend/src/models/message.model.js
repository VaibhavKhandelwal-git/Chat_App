import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
    {
        conversationId: {
            type: Schema.Types.ObjectId,
            ref: "Conversation",
            required: true,
        },

        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        text: {
            type: String,
            trim: true,
            default: "",
            maxlength: 2000,
        },

        image: {
            type: String,
            default: "",
        },

        isSeen: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;