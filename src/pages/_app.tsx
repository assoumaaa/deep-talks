import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Navbar } from "../components/Navbar";
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
        <meta
          name="google-site-verification"
          content="tg5E7U5Z9lk2K3COxFh4Lr-4hG153oz5eJldTw2RcD4"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="min-h-screenWithNav overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
