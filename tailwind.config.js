/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          green: '#20764b',
          greenDark: '#155b39',
          mint: '#e9f3e8',
          mint2: '#f2f7ef',
          ink: '#202a23',
          muted: '#7c877e',
          line: '#edf0eb',
          bg: '#f5f7f3',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
    },
  },
  plugins: [],
}
