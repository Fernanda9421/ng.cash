/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#212027',
        'secondary': '#F22F08',
        'hover': '#e23d1c'
      }
    },
  },
  plugins: [],
}
