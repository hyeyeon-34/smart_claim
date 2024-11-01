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
      fontSize: {
        'xs': '.75rem',          // 작은 글자
        'sm': '.875rem',
        'base': '1rem',          // 기본 글자
        'lg': '1.125rem',
        'xl': '1.25rem',         // 서브 타이틀
        '2xl': '1.5rem',         // 타이틀
      },
    },
  },
  plugins: [],
}

