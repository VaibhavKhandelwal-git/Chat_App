import { useEffect } from "react";
import { XIcon } from "lucide-react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

function ChatHeader() {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex-shrink-0 flex items-center justify-between border-b border-[#2d1b1e] bg-[#120b0d] px-6 py-4">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Profile Picture */}
        <div className="relative">

          <img
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            className="size-12 rounded-full border border-[#2d1b1e] object-cover"
          />

          {/* Online Indicator */}
          <span
            className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#120b0d] ${isOnline ? "bg-emerald-500" : "bg-zinc-600"}`}/>

        </div>

        {/* User Details */}
        <div>

          <h2 className="text-sm font-semibold text-[#F5F5F5]">
            {selectedUser.fullName}
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            {isOnline ? "Online" : "Offline"}
          </p>

        </div>

      </div>

      {/* Close Chat */}
      <button
        onClick={() => setSelectedUser(null)}
        className="rounded-lg p-2 text-zinc-500 transition-all hover:bg-[#221316] hover:text-[#F4DE9A]"
      >
        <XIcon className="size-5" />
      </button>

    </div>
  );
}

export default ChatHeader;