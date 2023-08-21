import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Navbar } from "../components/navbar";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Deep Talks</title>
        <meta
          name="description"
          content="Unlock Meaningful Conversations, Bond Together Deeply."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute right-[11rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] rounded-full bg-[#87c0fd] blur-[10rem]  sm:w-[68.75rem]"></div>
      <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] rounded-full bg-[#c0b8fc] blur-[10rem]  sm:w-[68.75rem] "></div>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
