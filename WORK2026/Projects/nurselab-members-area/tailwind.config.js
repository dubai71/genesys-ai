/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          red: '#D91F27',
        },
        white: {
          DEFAULT: '#FFFFFF',
        },
        gray: {
          soft: '#9C9D9D',
        },
        black: {
          950: '#08090B',
          900: '#0B0C0F',
          850: '#0F1014',
          800: '#111315',
          700: '#17191E',
        }
      },
      fontFamily: {
        muller: ['Muller', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 18px 50px rgba(0,0,0,0.45)',
        'hero': '0 30px 90px rgba(0,0,0,0.62)',
        'glass': '0 20px 60px rgba(0,0,0,0.38)',
        'netflix-hover': '0 40px 80px rgba(0,0,0,0.58)',
      },
      borderRadius: {
        'sm': '10px',
        'md': '14px',
        'lg': '20px',
        'xl': '28px',
        'full': '999px',
      },
      backdropBlur: {
        'glass-sm': '16px',
        'glass-md': '24px',
        'glass-lg': '28px',
      }
    },
  },
  plugins: [],
}
