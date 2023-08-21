import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useState } from "react";
import { Popup } from "../../components/popup";
import { motion, AnimatePresence } from "framer-motion";

export default function Categories() {
  const categories = [
    { name: "General", href: "categories/general", emoji: "🌎" },
    {
      name: "Relationship intimacy",
      href: "categories/relationship_intimacy",
      emoji: "👩‍❤️‍👨",
    },
    { name: "Unknown Future", href: "categories/unknown_future", emoji: "🔮" },
    {
      name: "Dive in the Past",
      href: "categories/dive_in_the_past",
      emoji: "🏎️",
    },
    {
      name: "Friends Council",
      href: "categories/friends_council",
      emoji: "😎",
    },
    {
      name: "Friends Council 18+",
      href: "categories/friends_council_18plus",
      emoji: "🤤",
    },
  ];

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [popup, setPopup] = useState<boolean>(false);

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
      <AnimatePresence>
        {popup && <Popup setPopup={setPopup} isOpen={popup} />}
      </AnimatePresence>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={container}
        className="grid grid-cols-2 gap-x-6 gap-y-8 text-center text-sm md:h-96 md:grid-cols-3 md:text-lg"
      >
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="cursor-pointer rounded-lg  bg-gradient-to-br from-primary to-secondary p-4 text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
          >
            <motion.li
              variants={item}
              className="relative flex h-full w-full items-center justify-center"
            >
              <span className="flex flex-col items-center justify-center">
                {category.name}{" "}
                <span className="text-2xl">{category.emoji}</span>
              </span>
            </motion.li>
          </Link>
        ))}
      </motion.ul>
    </div>
  );
}
