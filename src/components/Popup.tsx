import type { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface PopupProps {
  setPopup: Dispatch<SetStateAction<boolean>>;
}

export const Popup = ({ setPopup }: PopupProps) => {
  return (
    <div
      onClick={() => setPopup(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong relative w-full max-w-md rounded-3xl p-8 shadow-card animate-floatIn"
      >
        <button
          onClick={() => setPopup(false)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted transition hover:bg-white/10 hover:text-ink"
          aria-label="Close"
        >
          <AiOutlineClose className="text-2xl" />
        </button>
        <div className="space-y-3 pt-6">
          <h3 className="font-display text-2xl text-ink">How it works</h3>
          <p className="text-sm leading-relaxed text-muted">
            Pick a category, hit Next, and let the questions guide the conversation.
            Some prompts pick a player from your group — keep it honest, keep it kind.
          </p>
        </div>
      </div>
    </div>
  );
};
