/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,web}",
  ],
  theme: {
    extend: {},
  },
  // plugins: [],
  plugins: [require('tailwind-scrollbar-hide')],

}


