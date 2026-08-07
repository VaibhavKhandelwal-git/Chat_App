import { useEffect, useRef } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import NoChatHistoryPlaceholder from "./NochatHistoryPlaceholder";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const selectedUser = useChatStore((state) => state.selectedUser);
  const getMessagesByUserId = useChatStore((state) => state.getMessagesByUserId);
  const messages = useChatStore((state) => state.messages);
  const isMessagesLoading = useChatStore((state) => state.isMessagesLoading);
  const subscribeToMessages = useChatStore((state) => state.subscribeToMessages);
  const unsubscribeFromMessages = useChatStore((state) => state.unsubscribeFromMessages);

  const authUser = useAuthStore((state) => state.authUser);

  const messagesContainerRef = useRef(null);

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);

    subscribeToMessages();

    return () => {unsubscribeFromMessages()}
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden">
      <ChatHeader />

      <div ref={messagesContainerRef} className="flex-1 min-h-0 overflow-y-auto px-6 py-6">

        {isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages.length === 0 ? (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        ) : (
          <div className="mx-auto max-w-3xl space-y-5">

            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.sender === authUser._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    message.sender === authUser._id
                      ? "bg-[#B38A2F] text-black"
                      : "border border-[#2d1b1e] bg-[#221316] text-[#F5F5F5]"
                  }`}
                >

                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="mb-3 rounded-xl"
                    />
                  )}

                  {message.text && (
                    <p className="text-sm leading-6">
                      {message.text}
                    </p>
                  )}

                  <p
                    className={`mt-2 text-right text-[11px] ${
                      message.sender === authUser._id
                        ? "text-black/70"
                        : "text-zinc-500"
                    }`}
                  >
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;