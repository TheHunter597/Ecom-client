import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        "text-4r": {
          css: {
            fontSize: "14px", // 20px
            fontFamily: "Roboto, sans-serif", // Add your custom font family
            lineHeight: "1.5",
            fontWeight: "400",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
