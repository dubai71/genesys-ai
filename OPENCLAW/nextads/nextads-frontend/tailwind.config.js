/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './app/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './pages/**/*.{js,jsx,ts,tsx}',
        './src/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F2E5A',
                    foreground: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#1A6EFF',
                    foreground: '#FFFFFF',
                },
                surface: '#F4F6F9',
                success: '#00C48C',
                danger: '#FF4757',
                gold: '#F4A100',
                muted: {
                    DEFAULT: '#4A5568',
                    foreground: '#718096',
                },
                background: '#F4F6F9',
                foreground: '#1A1A2E',
                card: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#1A1A2E',
                },
                border: '#E2E8F0',
                input: '#E2E8F0',
                ring: '#1A6EFF',
                sidebar: '#0F2E5A',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'monospace'],
            },
            borderRadius: {
                lg: '0.75rem',
                md: '0.5rem',
                sm: '0.375rem',
            },
            boxShadow: {
                card: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                'card-hover': '0 4px 12px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.06)',
                glow: '0 0 20px rgba(26,110,255,0.25)',
            },
            keyframes: {
                'fade-in': { '0%': { opacity: '0', transform: 'translateY(8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
                'slide-in': { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
                pulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'slide-in': 'slide-in 0.3s ease-out',
                pulse: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
