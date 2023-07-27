import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <main>
        <div className="flex h-svh w-screen">
          <div className="flex h-screen w-screen flex-col justify-center space-y-20 p-12">
            <h1 className="text-5xl leading-tight lg:text-7xl">
              Inspiring{" "}
              <span className="font-bold text-primary">Conversations</span>.
              Transforming{" "}
              <span className="font-bold text-secondary">Connections</span>.
            </h1>
            <span className="text-xl lg:text-2xl">
              Elevate gatherings with deep talk questions, inspiring meaningful
              connections and insightful conversations.
            </span>
            <div className="flex w-full justify-center md:justify-normal">
              <Link
                href="/questions"
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
