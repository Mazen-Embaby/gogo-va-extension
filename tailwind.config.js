module.exports = {
  mode: "jit",
  content: ['./src/**/*.{html,ts,js}'],
  theme: {
    fontFamily: {
      sans: ["Heebo", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),

  ],
};
