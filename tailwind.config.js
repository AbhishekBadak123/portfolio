/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'space': ['"Space Grotesk"', 'sans-serif'],
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
        'glow-pulse': 'glow-pulse 2.8s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
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
        'glow-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '45%': { opacity: '0.92', filter: 'brightness(1.08)' },
          '50%': { opacity: '0.85', filter: 'brightness(0.96)' },
          '55%': { opacity: '0.95', filter: 'brightness(1.04)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-orange': '0 0 12px rgba(251, 146, 60, 0.45)',
        'glow-amber': '0 0 12px rgba(245, 158, 11, 0.45)',
        'glow-warm': '0 0 16px rgba(234, 88, 12, 0.3)',
      },
      dropShadow: {
        glowOrange: '0 0 10px rgba(251, 146, 60, 0.6)',
      },
      colors: {
        offwhite: '#F7F7FB',
        'warm-orange': {
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        'warm-amber': {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        'warm-red': {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        },
        'deep-space': {
          900: '#0a0a1a',
          950: '#050510',
        },
      },
    },
  },
  plugins: [],
};
