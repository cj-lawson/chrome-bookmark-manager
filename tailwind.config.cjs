module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      fontFamily: {
        spaceMono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
