import { MessageCircleIcon } from "lucide-react";

function NoChatHistoryPlaceholder({ name }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-6 text-center">

      {/* Icon */}
      <div className="mb-6 flex size-20 items-center justify-center rounded-full border border-[#B38A2F]/20 bg-[#221316]">
        <MessageCircleIcon className="size-10 text-[#B38A2F]" />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-[#F5F5F5]">
        Start a conversation with {name}
      </h2>

      {/* Description */}
      <p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">
        This is the beginning of your conversation. Send your first message to
        start chatting.
      </p>

      {/* Divider */}
      <div className="my-6 h-px w-40 bg-gradient-to-r from-transparent via-[#B38A2F]/30 to-transparent"></div>

      {/* Suggestions */}
      <div className="flex flex-wrap justify-center gap-3">

        <button className="rounded-full border border-[#2d1b1e] bg-[#221316] px-4 py-2 text-xs font-medium text-[#F4DE9A] transition-all hover:border-[#B38A2F]/40 hover:bg-[#2d1b1e]">
          👋 Say Hello
        </button>

        <button className="rounded-full border border-[#2d1b1e] bg-[#221316] px-4 py-2 text-xs font-medium text-[#F4DE9A] transition-all hover:border-[#B38A2F]/40 hover:bg-[#2d1b1e]">
          😊 How are you?
        </button>

        <button className="rounded-full border border-[#2d1b1e] bg-[#221316] px-4 py-2 text-xs font-medium text-[#F4DE9A] transition-all hover:border-[#B38A2F]/40 hover:bg-[#2d1b1e]">
          📅 Meet up soon?
        </button>

      </div>

    </div>
  );
}

export default NoChatHistoryPlaceholder;