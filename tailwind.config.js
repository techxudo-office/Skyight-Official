// const colors = require('tailwindcss/colors');
import colors from "tailwindcss/colors"
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'], // Specify your file paths
  theme: {
    extend: {
      colors: {
        // primary: '#3B82F7', // Matches --primary-color
        // primary:'#63C7C5',
        // primary:'#00175f',
        // primary:'#0e7ba5',
        // primary:'#63a6c7',
        // primary:'#637cc7',
        primary: '#008585',
        // secondary: '#1D4ED8', // Matches --secondary-color
        secondary: '#4FA9A8', // Matches --secondary-color
        // primary: '#EF4444', // Matches --primary-color
        // secondary: '#B91C1C', // Matches --secondary-color
        text: '#49454f', // Matches --text-color
        background: '#bfdad9', // Matches --background-color
        lightgray: '#D3D3D3', // Add custom color
        gray: '#6B7280',
        grayBg: '#f1f5f9 ',
        greenColor: '#4caf50',
        yellowColor: '#ff9800',
        redColor: '#ef5350',
        yellowbg: '#ff99000d',
        greenbg: '#4caf4f0d',
        redbg: '#ff99000d',
        bluebg: '#03a8f40d'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      appearance: {
        none: "none",
        textfield: "textfield",
      },
    },
  },
  plugins: [],
};
