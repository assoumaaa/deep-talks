import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useState } from "react";
import { Popup } from "../../components/popup";
import { CategoriesArray } from "~/helpers/categListTitles";

export default function Categories() {
  const [popup, setPopup] = useState<boolean>(false);
  const categories = CategoriesArray();

  const handlePopup = () => {
    setPopup(!popup);
  };

  return (
    <div className="relative flex h-screenWithNav items-center justify-center overflow-hidden p-4">
      <Link
        href="/players"
        className="absolute left-0 top-0 cursor-pointer p-4 text-3xl md:text-5xl"
      >
        <HiArrowNarrowLeft />
      </Link>

      <div className="absolute right-0 top-2 cursor-pointer p-4 text-3xl md:text-5xl">
        <AiOutlineQuestionCircle onClick={handlePopup} />
      </div>

      {popup && <Popup setPopup={setPopup} />}

      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 text-center text-sm md:h-96 md:grid-cols-3 md:text-lg">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="cursor-pointer rounded-lg  bg-gradient-to-br from-primary to-secondary p-4 text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
          >
            <li className="relative flex h-full w-full items-center justify-center">
              <span className="flex flex-col items-center justify-center">
                {category.name}{" "}
              </span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
