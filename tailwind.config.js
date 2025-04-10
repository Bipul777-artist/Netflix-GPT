/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'default': '0 2px 4px rgba(0,0,0,0.1)',
        'lg': '0 8px 16px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 8px 16px rgba(0,0,0,0.3)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

