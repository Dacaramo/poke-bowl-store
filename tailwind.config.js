/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      dropShadow: {
        above: '0 -1px 3px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
