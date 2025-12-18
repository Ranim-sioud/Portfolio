/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
      },
      boxShadow: {
        lg: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
  variants: {},
  plugins: [],
}