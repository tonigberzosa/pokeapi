const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: '',
  content: [
      './src/**/*.{html,ts}',
    ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
