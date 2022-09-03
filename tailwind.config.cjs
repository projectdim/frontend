/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#243c5a',
        'safety-green' : '#098507',
        'dangerous-red' : '#C02C0B',
        'base-blue' : '#2E60B3',
        'base-grey' : '#64748c'
      },
      boxShadow: {
        '1cs': '1px 0px 0px rgba(181, 181, 181, 0.25), 2px 0px 20px rgba(207, 205, 205, 0.25);',
        '2cs': '0px 1px 0px rgba(197, 208, 227, 0.4);'
      }
    },
  },
  plugins: [],
}
