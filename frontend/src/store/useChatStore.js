import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const notificationSound = new Audio("/sounds/notification.mp3");

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    lastChatRefreshUserId: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",
    onlineUsers: [],

    toggleSound: () => {
        const next = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", next);
        set({ isSoundEnabled: next });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    setSelectedUser: (selectedUser) => set({ selectedUser }),

    getAllContacts: async () => {
        try {
            set({ isUserLoading: true });
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMyChats: async () => {
        try {
            set({ isUserLoading: true });
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages, lastChatRefreshUserId } = get();

        try {
            const res = await axiosInstance.post(`/messages/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data.data] });

            if (selectedUser._id !== lastChatRefreshUserId) {
                get().getMyChats();
                set({ lastChatRefreshUserId: selectedUser._id });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, isSoundEnabled } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on("receiveMessage", (message) => {
            if (message.sender !== selectedUser._id) return;

            set((state) => ({
                messages: [...state.messages, message],
            }));

            if (isSoundEnabled) {
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Sound error", e));
            }
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket?.off("receiveMessage");
    },
}));
