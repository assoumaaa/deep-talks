import { AiOutlineQuestionCircle } from "react-icons/ai";
import { CategoriesArray } from "~/helpers/CategoryListTitles";
import { HiArrowNarrowLeft } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { Popup } from "../../components/Popup";
import { useState } from "react";

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
        className="absolute left-0 top-0 cursor-pointer p-4 text-2xl md:text-3xl"
      >
        <HiArrowNarrowLeft />
      </Link>

      <div className="absolute right-0 top-2 cursor-pointer p-4 text-2xl md:text-3xl">
        <AiOutlineQuestionCircle onClick={handlePopup} />
      </div>

      {popup && <Popup setPopup={setPopup} />}

      <ul className="flex max-w-screen-sm grid-cols-2  flex-wrap justify-center gap-x-6 gap-y-8 text-center   md:max-w-screen-md md:grid-cols-3 md:text-lg ">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="h-24 w-2/5 cursor-pointer rounded-lg border border-black bg-thirdly p-4 text-white"
          >
            <li className="relative flex h-full w-full flex-col items-center justify-center gap-2">
              <span className="flex flex-col items-center justify-center text-xs">
                {category.name}
              </span>
              <Image
                src={category.img}
                width={22}
                height={20}
                priority={true}
                alt="icon"
              />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
