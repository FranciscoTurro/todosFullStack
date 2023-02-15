/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Tomorrow: ['Tomorrow', 'sans-serif'],
      },
      colors: {
        custom_gray: {
          600: '#323d4d',
          700: '#242c37',
          800: '#151a21',
          900: '#0b0e11',
        },
        synth_pink: '#ff2975',
        synth_blue: '#0161E8',
      },
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
