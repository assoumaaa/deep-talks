import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        title: "'Nothing You Could Do', cursive",
      },
      height: {
        screenWithNav: "calc(100svh - 4rem)",
      },
      minHeight: {
        screenWithNav: "calc(100vh - 4rem)",
      },
      colors: {
        bg: "#0F0B1A",
        surface: "#1A1325",
        surfaceHigh: "#241A33",
        primary: "#C8A4FF",
        secondary: "#F7B5D1",
        thirdly: "#1A1325",
        ink: "#F5EDFF",
        muted: "#9990AA",
        line: "rgba(245, 237, 255, 0.08)",
      },
      backgroundImage: {
        ambient:
          "radial-gradient(ellipse 80% 60% at 18% 12%, rgba(200,164,255,0.22), transparent 55%), radial-gradient(ellipse 70% 55% at 82% 88%, rgba(247,181,209,0.16), transparent 55%), radial-gradient(ellipse 90% 70% at 50% 50%, rgba(75,40,120,0.18), transparent 65%)",
        glass:
          "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(200,164,255,0.45)",
        glowSoft: "0 0 60px -20px rgba(247,181,209,0.35)",
        card: "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.08)",
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        floatIn: "floatIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
