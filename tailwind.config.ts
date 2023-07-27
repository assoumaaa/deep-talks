import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: "'Nothing You Could Do', cursive",
      },
      height: {
        svh: "calc(100svh - 4rem)",
        screenWithNav: "calc(100svh - 4rem)",
      },
      colors: {
        primary: "#7C9D96",
        secondary: "#BA704F",
        thirdly: "#DFA878",
      },
    },
  },
  plugins: [],
} satisfies Config;
