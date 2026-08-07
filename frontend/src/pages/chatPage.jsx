import { useChatStore } from "../store/useChatStore";

import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-3">
      <div className="w-full max-w-6xl h-195 min-h-0 overflow-hidden">
        <BorderAnimatedContainer>

          {/* Sidebar */}
          <div className="w-80 flex min-h-0 flex-col overflow-hidden bg-[#120b0d]/80 border-r border-white/5">
            <ProfileHeader />

            <div className="px-3 pt-2">
              <ActiveTabSwitch />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto px-3 py-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden bg-[#0d090a]/80">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>

        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default ChatPage;