import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Instrument_Serif, Inter } from "next/font/google";
import { api } from "~/utils/api";
import "~/styles/globals.css";

import Head from "next/head";
import { Navbar } from "~/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

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
      <div className={`${display.variable} ${body.variable} font-body text-ink`}>
        <Navbar />
        <div className="h-screenWithNav overflow-x-hidden">
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
