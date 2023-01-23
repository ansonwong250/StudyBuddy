const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: {
        50: 'white',
        100: '#e6f1ff',
        200: '#e6f1ff',
        300: '#ccd6f6',
        400: '#a8b2d1',
        500: '#8892b0',
        600: '#233554',
        700: '#112240',
        800: '#0a192f',
        900: '#020c1b',
      },
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      indigo: colors.indigo,
      blue: colors.blue,
      red: colors.red
    },
  },
  plugins: [],
}
