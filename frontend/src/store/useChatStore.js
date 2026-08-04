import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allcontacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled:!get().isSoundEnabled})
    },
    
    setActiveTab:(tab)=>{set({activeTab:tab})},
    
    setSelectedUser:(selectedUser)=>{set({selectedUser})},
    
    getAllContacts:async()=>{
        try{
            set({isUserLoading:true})
            const res = await axiosInstance.get("/messages/contacts");
            set({allcontacts:res.data.data})
        }catch(error){
            toast.error(error.response?.data?.messages || "Something went Wrong")
        }finally{
            set({isUserLoading:false})
        }
    },
    
    getMyChats: async () => {
        try {
            set({ isUserLoading: true });
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data.data });
        } catch (error) {
            toast.error(error.response?.data?.messages || "Something went Wrong");
        } finally {
            set({ isUserLoading: false });
        }
    },
}));