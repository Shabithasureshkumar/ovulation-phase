/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        manrope: ['Manrope', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          pink: '#EF4486',
          magenta: '#D7068E',
          rose: '#F5489C',
          deep: '#26214E',
          purple: '#A855F7',
          softPurple: '#C084FC',
          lightBg: '#FDF8FA',
          muted: '#716D8D',
          border: '#F3F4F6',
        }
      },
      boxShadow: {
        'soft-card': '0px 2px 12px -2px rgba(183, 110, 199, 0.08), 0px 10px 30px -10px rgba(183, 110, 199, 0.12)',
        'glow-pink': '0px 0px 30px rgba(215, 6, 142, 0.25)',
        'glow-sm': '0px 2px 10px rgba(248, 75, 159, 0.15)',
        'device-card': '0px 1px 4px rgba(0, 0, 0, 0.04), 0px 2px 16px rgba(139, 92, 246, 0.05)',
      },
      borderRadius: {
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '41px',
      }
    },
  },
  plugins: [],
}
