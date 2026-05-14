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

  return (
    <div className="mx-auto flex h-screenWithNav w-full max-w-4xl flex-col px-4 py-4 md:px-6 md:py-6">
      <div className="flex items-center justify-between">
        <Link
          href="/players"
          className="rounded-full p-2 text-ink/80 transition hover:bg-white/10 hover:text-ink"
          aria-label="Back"
        >
          <HiArrowNarrowLeft className="text-2xl" />
        </Link>
        <h1 className="font-display text-xl text-ink md:text-2xl">
          Pick a <span className="italic text-primary">category</span>
        </h1>
        <button
          onClick={() => setPopup(true)}
          className="rounded-full p-2 text-ink/80 transition hover:bg-white/10 hover:text-ink"
          aria-label="How it works"
        >
          <AiOutlineQuestionCircle className="text-2xl" />
        </button>
      </div>

      {popup && <Popup setPopup={setPopup} />}

      <ul className="mt-6 grid flex-1 grid-cols-2 content-start gap-3 animate-floatIn md:mt-8 md:grid-cols-3 md:gap-5">
        {categories.map((category) => (
          <li key={category.name}>
            <Link
              href={category.href}
              className="glass group relative flex aspect-square flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-4 text-center transition duration-300 active:scale-95 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Image
                src={category.img}
                width={40}
                height={40}
                priority={true}
                alt=""
                className="opacity-90 transition group-hover:scale-110"
              />
              <span className="font-body text-[13px] font-medium leading-snug tracking-tight text-ink md:text-sm">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
