import { useChatStore } from "../store/useChatStore";

function ActiveTabSwitch() {
    const activeTab = useChatStore((state) => state.activeTab);
    const setActiveTab = useChatStore((state) => state.setActiveTab);

    return (
        <div className="flex gap-1 rounded-lg bg-white/5 p-1">

            {/* Chats Button */}
            <button
                onClick={() => setActiveTab("chats")}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors duration-150 ease-out ${
                    activeTab === "chats"
                        ? "bg-[#2d1b1e] text-white"
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
            >
                Chats
            </button>

            {/* Contacts Button */}
            <button
                onClick={() => setActiveTab("contacts")}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors duration-150 ease-out ${
                    activeTab === "contacts"
                        ? "bg-[#2d1b1e] text-white"
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                }`}
            >
                Contacts
            </button>

        </div>
    );
}

export default ActiveTabSwitch;