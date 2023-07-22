import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: "'Nothing You Could Do', cursive",
      },
      colors: {
        primary: "#AD4444",
        secondary: "#00A3FF",
      },
    },
  },
  plugins: [],
} satisfies Config;
