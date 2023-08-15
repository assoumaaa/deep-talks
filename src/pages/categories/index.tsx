import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function Categories() {
  const categories = [
    { name: "General", href: "categories/general", emoji: "🌎" },
    {
      name: "Relationship intimacy",
      href: "categories/relationship-intimacy",
      emoji: "👩‍❤️‍👨",
    },
    { name: "Unknown Future", href: "categories/unknown-future", emoji: "🔮" },
    {
      name: "Dive in the Past",
      href: "categories/dive-in-the-past",
      emoji: "🏎️",
    },
    {
      name: "Friends Council",
      href: "categories/friends-council",
      emoji: "😎",
    },
    {
      name: "Friends Council 18+",
      href: "categories/friends-council-18+",
      emoji: "🤤",
    },
  ];

  return (
    <div className="relative flex h-screenWithNav items-center justify-center p-4">
      <Link
        href="/players"
        className="absolute left-0 top-0 cursor-default p-4 text-3xl md:text-5xl"
      >
        <HiArrowNarrowLeft className="cursor-pointer" />
      </Link>
      <ul className="grid  grid-cols-2 gap-x-6 gap-y-8 text-center text-sm md:h-96 md:grid-cols-3 md:text-lg">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="cursor-pointer rounded-lg  bg-gradient-to-br from-primary to-secondary p-4 text-white shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
          >
            <div className="relative flex h-full w-full items-center justify-center transition-all duration-75 ease-in">
              <span className="flex flex-col items-center justify-center">
                {category.name}{" "}
                <span className="text-2xl">{category.emoji}</span>
              </span>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
