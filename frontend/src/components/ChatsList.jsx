import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";

import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";

function ChatsList() {
  const getMyChats = useChatStore((state) => state.getMyChats);
  const chats = useChatStore((state) => state.chats);
  const isUserLoading = useChatStore((state) => state.isUserLoading);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const onlineUsers = useChatStore((state) => state.onlineUsers);

  useEffect(() => {
    getMyChats();
  }, [getMyChats]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

  if (chats.length === 0) {
    return <NoChatsFound />;
  }

  return (
    <div className="space-y-2">

      {chats.map((chat) => (
        <button
          key={chat._id}
          onClick={() => setSelectedUser(chat)}
          className="w-full rounded-xl border border-[#2d1b1e] bg-[#120b0d] p-3 text-left transition-all duration-200 hover:border-[#B38A2F]/40 hover:bg-[#221316]"
        >

          <div className="flex items-center gap-3">

            {/* Profile Picture */}
            <div className="relative">

              <img
                src={chat.profilePic || "/avatar.png"}
                alt={chat.fullName}
                className="size-12 rounded-full object-cover border border-[#2d1b1e]"
              />

              {/* Online Indicator */}
              <span
                className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#120b0d] ${
                  onlineUsers.includes(chat._id)
                    ? "bg-emerald-500"
                    : "bg-zinc-600"
                }`}
              />

            </div>

            {/* User Details */}
            <div className="flex-1 min-w-0">

              <h3 className="truncate text-sm font-semibold text-[#F5F5F5]">
                {chat.fullName}
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                {onlineUsers.includes(chat._id) ? "Online" : "Offline"}
              </p>

            </div>

          </div>

        </button>
      ))}

    </div>
  );
}

export default ChatsList;