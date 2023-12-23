import type { Dispatch, SetStateAction } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface PopupProps {
  setPopup: Dispatch<SetStateAction<boolean>>;
}

export const Popup = ({ setPopup }: PopupProps) => {
  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex h-screenWithNav w-screen items-center justify-center">
        <div className="relative flex h-5/6 w-5/6 rounded-xl border-r-2 bg-white">
          <button onClick={() => setPopup(false)}>
            <div className="absolute left-0 top-0 cursor-pointer p-4 text-3xl md:text-5xl">
              <AiOutlineClose />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
