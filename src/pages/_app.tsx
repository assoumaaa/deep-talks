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
      <div className="absolute right-0 top-20 -z-10 h-4/6 w-4/6  rounded-full bg-[#99ffee] opacity-40 blur-2xl filter"></div>
      <div className="absolute top-20 -z-10 h-4/6 w-3/6 rounded-full bg-[#83cfff] opacity-40 blur-2xl filter "></div>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
