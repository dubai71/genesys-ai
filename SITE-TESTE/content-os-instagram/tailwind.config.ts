import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#FF5404', dim: 'rgba(255,84,4,0.13)' },
        milk: { DEFAULT: '#EDDABA', muted: 'rgba(237,218,186,0.45)', faint: 'rgba(237,218,186,0.07)' },
        surface: { DEFAULT: '#000', card: '#0a0a0a', input: '#111', border: 'rgba(255,255,255,0.08)' },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
