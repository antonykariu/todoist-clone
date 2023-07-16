/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1360px",
        "3xl": "1440px",
      },
      spacing: {
        sm: "10px",
        "sm-2": "12px",
        "sm-3": "6px",
        "sm-4": "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "800px",
        modal: "250px",
      },
      fontSize: {
        xs: "12px",
        sm: "14px",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
      colors: {
        content: {
          100: "#eee",
          200: "#ffffff66",
        },
        primary: {
          100: "#1f1f1f",
          200: "#282828",
          300: "#292929",
        },
        disabled: {
          100: "#dc4c3e",
        },
        divider: {
          100: "#3d3d3d",
          200: "#999",
        },
        secondary: {
          100: "#ff7066",
          200: "#ff7066",
          300: "#dc4c3e",
          400: "#dc4c3e",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
