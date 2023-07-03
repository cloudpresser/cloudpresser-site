let defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#CBFEF5',
          100: '#CAFCFD',
          200: '#00DAFC',
          300: '#009BDA',
          400: '#00AAD8',
          500: '#005A9C',
          600: '#005B92',
          700: '#00407E',
          800: '#004278',
          900: '#002E68',
        },
        success: '#00A51D'
      },
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'primary': '0px 0px 4px rgba(0, 155, 218, 0.1), 0px 8px 40px rgba(0, 155, 218, 0.2)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
    // ...
  ],
}

