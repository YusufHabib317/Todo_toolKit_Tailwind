/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        transparentBlack: "rgba(0,0,0,0.75)",
        blue_one: "#207fbf",
        blue_two: "#223d47",
        light_: "#e0e0e0",
        green_: "40da79",
        blue_: "#8691bd",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      lg: "1060px",
    },
  },
  plugins: [],
};
