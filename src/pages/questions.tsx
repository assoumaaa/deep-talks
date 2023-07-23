import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";

export default function Questions() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <main>
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <Image
            src={"/hero.png"}
            alt="hero"
            width={200}
            height={300}
            className="flex md:hidden"
          />
          <div className="flex h-screen w-screen items-center justify-center rounded-tl-3xl rounded-tr-3xl bg-primary md:h-screen  md:w-4/6 md:rounded-3xl md:bg-white">
            <div className="flex h-2/6 w-4/6 items-center justify-center rounded-3xl bg-primary"></div>
            <Image
              src={"/hero.png"}
              alt="hero"
              width={200}
              height={300}
              className="hidden md:flex"
            />
          </div>
        </div>
      </main>
    </>
  );
}
