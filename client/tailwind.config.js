/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    //prettier-ignore

    extend: {
      backgroundImage: {
        //prettier-ignore
        'HomeBg': "url('./assets/images/bg-2.svg')",
        'LoggedBg': "url('./assets/images/logged-bg2.svg')",
      },
      fontFamily: {
        'Inter': ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
