/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}", "./public/*.html"],
  variants: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  theme: {
    extend: {
      colors: {
        klik: "#e84822",
        kliklight: "#ff5024",
        klikdark: "#c23c1b",
        bgdark: "#240c06",
        klikgreen: "#127512",
      },
    },
    boxShadow: {
      highlight: "inset 0 1px 0 0 hsl(0deg 0% 100% / 10%)",
    },
    fontFamily: {
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
}
