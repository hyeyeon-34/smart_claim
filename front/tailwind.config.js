/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        d_main: '#1E1E1E',      // font-main_black
        d_second: '#757575',    // font-gray
      },
    },
  },
  plugins: [],
}

