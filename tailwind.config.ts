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
        primary: "#7852A9", // Dark charcoal gray
        secondary: "#a5acaf", // Light gray (for a softer contrast)
        thirdly: "#311432", // A warm brownish color
      },
      minHeight: {
        screenWithNav: "calc(100vh - 4rem)",
      },
    },
  },
  plugins: [],
} satisfies Config;
