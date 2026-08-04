import { useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

function ProfileHeader() {
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.authUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);

  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);
  const toggleSound = useChatStore((state) => state.toggleSound);

  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    await updateProfile(file);
  };

  return (
    // ================= PROFILE HEADER =================
    <div className="border-b border-[#2d1b1e] bg-[#120b0d] px-4 py-4">

      <div className="flex items-center justify-between">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex items-center gap-3">

          {/* Profile Picture (Click to Upload) */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="relative w-14 h-14 rounded-full overflow-hidden group/avatar flex-shrink-0"
          >

            {/* User Avatar */}
            <img
              src={authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover border-2 border-[#B38A2F]/70 rounded-full transition-all group-hover/avatar:border-[#F4DE9A]"
            />

            {/* Avatar Hover Overlay — hidden by default, shown only on avatar hover */}
            <div className="absolute inset-0 rounded-full bg-black/55 flex items-center justify-center
                            invisible group-hover/avatar:visible">
              <span className="text-[10px] font-medium text-[#F4DE9A]">
                Change
              </span>
            </div>

          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* User Details */}
          <div>

            {/* Username */}
            <h2 className="text-[15px] font-semibold text-[#F5F5F5] max-w-[170px] truncate">
              {authUser.fullName}
            </h2>

            {/* Online Status */}
            <div className="flex items-center gap-2 mt-1">

              {/* Green Status Dot */}
              <div className="size-2 rounded-full bg-emerald-500"></div>

              <span className="text-xs text-zinc-400">
                Online
              </span>

            </div>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-2">

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound.play().catch(() => {});
              toggleSound();
            }}
            className="p-2 rounded-lg text-zinc-400 hover:text-[#F4DE9A] hover:bg-[#221316] transition-all"
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-[#221316] transition-all"
          >
            <LogOutIcon className="size-5" />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;