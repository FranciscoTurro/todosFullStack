/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        'header-height': '8%',
        'content-height': '92%',
      },
    },
  },
  plugins: [],
};
