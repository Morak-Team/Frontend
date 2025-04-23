/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./src/styles/*.css"],
  theme: {
    extend: {
      colors: {},
      fontSize: {
        h1: ["1.75rem", { lineHeight: "140%" }],
        h2: ["1.5rem", { lineHeight: "130%" }],
        h3: ["1.25rem", { lineHeight: "130%" }],
        h4: ["1.125rem", { lineHeight: "140%" }],
        b1: ["1rem", { lineHeight: "140%" }],
        b2: ["1rem", { lineHeight: "150%" }],
        b3: ["1rem", { lineHeight: "130%" }],
        b4: ["0.875rem", { lineHeight: "130%" }],
        b5: ["0.875rem", { lineHeight: "130%" }],
        b6: ["0.875rem", { lineHeight: "130%" }],
        caption1: ["0.75rem", { lineHeight: "150%" }],
        caption2: ["0.75rem", { lineHeight: "150%" }],
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
