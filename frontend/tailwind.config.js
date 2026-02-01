/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./index.html", "./src/**/*.{ts,tsx}" ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#3C50E0',
        stroke: '#E2E8F0',
        gray: {
          2: '#F7F9FC',
        },
        meta: {
          4: '#313D4A',
        },
        success: '#219653',
        danger: '#D34053',
        warning: '#FFA70B',
        whiten: '#F1F5F9',
        body: '#64748B',
        strokedark: '#2E3A47',
        boxdark: '#24303F',
        'form-strokedark': '#3d4d60',
        'form-input': '#1d2a39',
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

