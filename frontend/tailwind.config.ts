import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom colors
      colors: {
        white: "#fff",
        black: "#313131",
        yellow: "#fdd201",
      },
      // Background images
      backgroundImage: {
        pageBg: "url('/images/bg.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;
