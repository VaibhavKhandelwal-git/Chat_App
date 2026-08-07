import { useRef, useState } from "react";

import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";

function MessageInput() {

  const { playRandomKeyStrokeSound } = useKeyboardSound();

  const sendMessage = useChatStore((state) => state.sendMessage);
  const isSoundEnabled = useChatStore((state) => state.isSoundEnabled);

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleSendMessage = (event) => {

    event.preventDefault();

    if (!text.trim() && !selectedFile) return;

    if (isSoundEnabled) {
      playRandomKeyStrokeSound();
    }

    const formData = new FormData();
    formData.append("text", text.trim());
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    sendMessage(formData);

    setText("");
    setImagePreview(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageChange = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {

    setImagePreview(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex-shrink-0 border-t border-[#2d1b1e] bg-[#120b0d] px-6 py-4">

      {imagePreview && (

        <div className="mx-auto mb-4 max-w-3xl">

          <div className="relative inline-block">

            <img
              src={imagePreview}
              alt="Preview"
              className="size-24 rounded-xl border border-[#2d1b1e] object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute -right-2 -top-2 rounded-full border border-[#2d1b1e] bg-[#221316] p-1 text-zinc-300 transition hover:bg-[#2d1b1e]"
            >
              <XIcon className="size-4" />
            </button>

          </div>

        </div>

      )}

      <form
        onSubmit={handleSendMessage}
        className="mx-auto flex max-w-3xl items-center gap-3"
      >

        <input
          type="text"
          value={text}
          placeholder="Type a message..."
          onChange={(event) => {

            setText(event.target.value);

            if (isSoundEnabled) {
              playRandomKeyStrokeSound();
            }

          }}
          className="flex-1 rounded-xl border border-[#2d1b1e] bg-[#221316] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition placeholder:text-zinc-500 focus:border-[#B38A2F]"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`rounded-xl border border-[#2d1b1e] p-3 transition ${
            imagePreview
              ? "bg-[#B38A2F] text-black"
              : "bg-[#221316] text-zinc-400 hover:text-[#F5F5F5]"
          }`}
        >
          <ImageIcon className="size-5" />
        </button>

        <button
          type="submit"
          disabled={!text.trim() && !imagePreview}
          className="rounded-xl bg-[#B38A2F] px-4 py-3 text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <SendIcon className="size-5" />
        </button>

      </form>

    </div>
  );
}

export default MessageInput;