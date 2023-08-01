import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <div className="flex h-screenWithNav w-screen">
          <div className="flex h-svh w-full flex-col items-center justify-center  space-y-12 p-12">
            <div className="space-y-4 text-5xl leading-tight lg:text-7xl">
              <h2>
                Talk <span className="italic text-primary">Together,</span>
              </h2>
              <h2>
                Bond <span className="italic text-secondary">Together,</span>
              </h2>
              <h2>
                Thrive <span className="italic text-thirdly">Forever.</span>
              </h2>
            </div>
            <span className="text-xl font-light lg:text-2xl">
              Unlock Meaningful Conversations, Bond Together Deeply.
            </span>

            <div className="flex w-full justify-center ">
              <Link
                href="/categories"
                className="group relative flex h-16 w-1/2 overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary p-0.5 text-sm font-medium text-gray-900  focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
              >
                <span className="relative  flex h-full w-full items-center justify-center rounded-md bg-white p-2 text-2xl font-bold text-black transition-all duration-75 ease-in hover:text-white group-hover:bg-opacity-0">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
          <div className="hidden h-full w-screen flex-col items-center justify-center md:flex">
            <Image src={"/hero.png"} alt="hero" width={450} height={650} />
          </div>
        </div>
      </main>
    </>
  );
}
