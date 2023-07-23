import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <main>
        <div className="flex h-screen w-screen">
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
              <button className="group relative mb-2 mr-2 inline-flex h-16 w-1/2 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary via-red-300 to-secondary p-0.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-100 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 dark:focus:ring-red-400">
                <span className="relative rounded-md px-5 py-2.5 text-xl transition-all duration-75 ease-in group-hover:bg-opacity-0">
                  Get Started
                </span>
              </button>
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
