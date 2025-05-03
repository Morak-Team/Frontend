export default {
  content: ["./index.html", "./src/**/*.{js,jsx}", "./src/styles/*.css"],
  theme: {
    extend: {
      colors: {
        gray: {
          0: "rgba(255, 255, 255, 1)",
          1: "rgba(253, 253, 253, 1)",
          2: "rgba(250, 250, 249, 1)",
          3: "rgba(245, 244, 244, 1)",
          4: "rgba(235, 234, 233, 1)",
          5: "rgba(214, 213, 210, 1)",
          6: "rgba(194, 191, 188, 1)",
          7: "rgba(173, 170, 165, 1)",
          8: "rgba(153, 149, 143, 1)",
          9: "rgba(130, 127, 122, 1)",
          10: "rgba(107, 104, 100, 1)",
          11: "rgba(77, 75, 72, 1)",
          12: "rgba(46, 45, 43, 1)",
          13: "rgba(15, 15, 14, 1)",
        },
        orange: "#FF6F31",
        blue: "#005C9E"
      },
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
      spacing: {
        21: "84px",
      },
    },
    borderWidth: {
      1.6: "1.6px",
    },
  },
  plugins: [],
};
