import { useEffect } from "react";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import UsersLoadingSkeleton from "./UsersLoadingSkeleton";

function ContactList() {
  const getAllContacts = useChatStore((state) => state.getAllContacts);
  const allContacts = useChatStore((state) => state.allContacts);
  const setSelectedUser = useChatStore((state) => state.setSelectedUser);
  const isUserLoading = useChatStore((state) => state.isUserLoading);

  const onlineUsers = useAuthStore((state) => state.onlineUsers);

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUserLoading) {
    return <UsersLoadingSkeleton />;
  }

  return (
    <div className="space-y-2">

      {allContacts.map((contact) => (
        <button
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className="w-full rounded-xl border border-[#2d1b1e] bg-[#120b0d] p-3 text-left transition-all duration-200 hover:border-[#B38A2F]/40 hover:bg-[#221316]"
        >

          <div className="flex items-center gap-3">

            {/* Profile Picture */}
            <div className="relative">

              <img
                src={contact.profilePic || "/avatar.png"}
                alt={contact.fullName}
                className="size-12 rounded-full object-cover border border-[#2d1b1e]"
              />

              {/* Online Indicator */}
              <span
                className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-[#120b0d] ${
                  onlineUsers.includes(contact._id)
                    ? "bg-emerald-500"
                    : "bg-zinc-600"
                }`}
              />

            </div>

            {/* Contact Details */}
            <div className="flex-1 min-w-0">

              <h3 className="truncate text-sm font-semibold text-[#F5F5F5]">
                {contact.fullName}
              </h3>

              <p className="mt-1 text-xs text-zinc-500">
                {onlineUsers.includes(contact._id)
                  ? "Online"
                  : "Offline"}
              </p>

            </div>

          </div>

        </button>
      ))}

    </div>
  );
}

export default ContactList;