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
        'base-grey' : '#64748c',
        'light-blue' : '#F2F7FF',
        'gray-light-100' :'#F7F9FC',
        'gray-light-200' : '#F0F4FA',
        'gray-light-300' :'#C5D0E3',
        'gray-light-400' :'#91A2BD',
        'gray-light-500' :'#64748C',
        'gray-light-600' :'#495466',
        'yellow-custom-400' : '#E4CA00'
      },
      boxShadow: {
        '1cs': '1px 0px 0px rgba(181, 181, 181, 0.25), 2px 0px 20px rgba(207, 205, 205, 0.25);',
        '2cs': '0px 1px 0px rgba(197, 208, 227, 0.4);'
      },
      height: {
        '1/12': '8.333334%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333334%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333334%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333334%',
        '11/12': '91.666667%',
      },
      fontSize: {
        'overview-item': ['16px', '26px'],
        'overview-item-mobile': ['14px', '22px'],
        'sidebar-title': ['20px', '32px'],
        'sidebar-title-mobile': ['18px', '32px'],
        'sidebar-address-mobile': ['24px', '38px'],
        'sidebar-address': ['32px', '51px'],
      }
    },
    screens : {
      'screen-1600' : {
        'min': '1600px',
      },
      'screen-1440' : {
        'min': '1440px',
      },
      'screen-1200' : {
        'min': '1200px',
      },
      'screen-950' : {
        'min': '950px',
      },
      'screen-949' : {
        'min': '480px',
        'max' : '949px'
      },
      'screen-475' : { 'max' : '480px'},
     }
  },
  plugins: [],
}
