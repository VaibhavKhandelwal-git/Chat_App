import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data.data });
        } catch (error) {
            console.log("Error in authCheck", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data.data });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data.data });
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (file) => {
        try {
            const formData = new FormData();
            formData.append("profilePic", file);

            const res = await axiosInstance.put("/auth/update-profilePic", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            set({ authUser: res.data.data });
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to update profile picture");
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
}));