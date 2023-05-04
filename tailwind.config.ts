import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#049281",
        "primary-light": "#05988b",
        "primary-dark": "#038a80",
      },
    },
  },
  plugins: [],
} satisfies Config;
