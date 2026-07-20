import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
    {
        participants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],

        isGroup: {
            type: Boolean,
            default: false,
        },

        groupName: {
            type: String,
            trim: true,
            default: "",
        },

        groupImage: {
            type: String,
            default: "",
        },

        groupAdmin: {
            type: Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        lastMessage: {
            type: Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;