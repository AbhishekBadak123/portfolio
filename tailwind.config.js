/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        paytone: ['"Paytone One"', 'cursive'],
        'poppins': ['Poppins', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'fira-code': ['Fira Code', 'monospace'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'fadeInUp': 'fadeInUp 0.6s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: 'blob 8s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 2.8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(18px, -24px, 0) scale(1.05)' },
          '66%': { transform: 'translate3d(-14px, 12px, 0) scale(0.97)' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '45%': { opacity: '0.92', filter: 'brightness(1.08)' },
          '50%': { opacity: '0.82', filter: 'brightness(0.96)' },
          '55%': { opacity: '0.95', filter: 'brightness(1.04)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon-pink': '0 0 12px rgba(255, 72, 185, 0.45)',
        'neon-green': '0 0 12px rgba(18, 206, 106, 0.45)',
        'neon-purple': '0 0 16px rgba(80, 32, 122, 0.35)',
      },
      dropShadow: {
        neonPink: '0 0 10px rgba(255, 72, 185, 0.6)',
      },
      colors: {
        offwhite: '#F7F7FB',
        'candy-pink': '#FF48B9',
        'candy-green': '#12CE6A',
        'electric-purple': {
          400: '#b266ff',
          500: '#8d33ff',
          600: '#7a1fff',
        },
        'cyber-teal': {
          400: '#00f5d4',
          500: '#00d4aa',
          600: '#00b391',
        },
        'glow-orange': {
          400: '#ff8c5a',
          500: '#ff6b35',
          600: '#e55a2b',
        },
        'deep-space': {
          900: '#0a0a2a',
          950: '#050515',
        },
      },
    },
  },
  plugins: [],
};
