import Link from "next/link";

export default function Categories() {
  return (
    <div className="flex h-screenWithNav items-center justify-center p-4">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 text-center text-sm md:h-96 md:text-lg">
        <Link
          href="/questions"
          className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white "
        >
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              General <span className="text-2xl">🌎</span>
            </span>
          </div>
        </Link>

        <li className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white ">
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              Relationship Intimacy <span className="text-2xl">👩‍❤️‍👨</span>
            </span>
          </div>
        </li>
        <li className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white ">
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              Unknown Future <span className="text-2xl">🔮</span>
            </span>
          </div>
        </li>
        <li className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white ">
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              Dive in the Past <span className="text-2xl"> 🏎️</span>
            </span>
          </div>
        </li>
        <li className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white ">
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              Friends Council <span className="text-2xl"> 😎</span>
            </span>
          </div>
        </li>
        <li className="cursor-pointer rounded-lg bg-gradient-to-br from-primary to-secondary p-4 text-white hover:bg-white ">
          <div className="relative flex h-full w-full items-center justify-center  bg-gradient-to-br from-primary to-secondary transition-all duration-75 ease-in">
            <span className="flex flex-col items-center justify-center">
              Friends Council <span className="text-2xl"> 😎</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
