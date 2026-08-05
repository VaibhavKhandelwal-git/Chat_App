import { MessageCircleIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

function NoChatsFound() {
  const setActiveTab = useChatStore((state) => state.setActiveTab);

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">

      {/* Icon */}
      <div className="mb-5 flex size-16 items-center justify-center rounded-full border border-[#B38A2F]/20 bg-[#221316]">
        <MessageCircleIcon className="size-8 text-[#B38A2F]" />
      </div>

      {/* Heading */}
      <h3 className="text-lg font-semibold text-[#F5F5F5]">
        No Conversations Yet
      </h3>

      {/* Description */}
      <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
        Start your first conversation by selecting a contact from the contacts
        tab.
      </p>

      {/* Button */}
      <button
        onClick={() => setActiveTab("contacts")}
        className="mt-6 rounded-lg border border-[#B38A2F]/30 bg-[#221316] px-5 py-2 text-sm font-medium text-[#F4DE9A] transition-all duration-200 hover:border-[#B38A2F]/60 hover:bg-[#2d1b1e]"
      >
        Find Contacts
      </button>

    </div>
  );
}

export default NoChatsFound;