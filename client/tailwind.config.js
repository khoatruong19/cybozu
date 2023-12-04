/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-background": "url('/src/assets/login-background.jpg')",
      },
      colors: {
        primary: "#BFD5E3",
        secondary: "#376380",
        tertiary: "#13242E",
        danger: "#E85D4C",
        room: "#B99470",
      },
      fontFamily: {
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
