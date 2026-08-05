import { MessageCircleIcon } from "lucide-react";

function NoConversationPlaceholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">

      {/* Icon */}
      <div className="mb-6 flex size-20 items-center justify-center rounded-full border border-[#B38A2F]/20 bg-[#221316]">
        <MessageCircleIcon className="size-10 text-[#B38A2F]" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#F5F5F5]">
        No Conversation Selected
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        Select a conversation from the sidebar or start a new chat from your
        contacts to begin messaging.
      </p>

    </div>
  );
}

export default NoConversationPlaceholder;