import Link from "next/link";

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
    <div className="flex h-screenWithNav items-center justify-center p-4">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 text-center text-sm md:h-96 md:grid-cols-3 md:text-lg">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white "
          >
            <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
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
