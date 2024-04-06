/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  screens: {
    sm: "430px",
    md: "678px",
    lg: "1000px",
    xl: "1280px",
    "2xl": "1536px",
    "custom-sm": "500px",
    "custom-lg": "1200px",
  },
  plugins: [],
};
