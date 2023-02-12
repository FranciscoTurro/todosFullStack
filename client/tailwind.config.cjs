/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mdl: '970px', //medium large
      },
      spacing: {
        'header-height': '8%',
        'content-height': '92%',
      },
    },
  },
  plugins: [],
};
