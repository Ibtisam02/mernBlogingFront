/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#1E293B',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'xsm': '480px',  
        'xxsm':'280px'
      },
    },
  },
  /*plugins: [
    require('tailwind-scrollbar'),
  ],*/
}

