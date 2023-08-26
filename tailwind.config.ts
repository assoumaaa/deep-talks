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
        primary: "#005c97",
        secondary: "#363795",
        thirdly: "#4BC0C8",
      },
      minHeight: {
        screenWithNav: "calc(100vh - 4rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
