/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: "#D6B3FF",
          DEFAULT: "#A855F7",
          dark: "#69247C",
        },
        pink: {
          light: "#FFC2E0",
          DEFAULT: "#EC4899",
          dark: "#DA498D",
        },
        beige: {
          light: "#F5E7D0",
          DEFAULT: "#EED9B7",
          dark: "#FAC67A",
        },
        light: {
          DEFAULT: "#F8F9FA",
          dark: "#F9E6CF",
        },
       },
  },
},
  plugins: [],
}

