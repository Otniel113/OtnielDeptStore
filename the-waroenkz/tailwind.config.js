/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBF3D1',
        sidebar: '#EBE5D5',
        foreground: '#0F0F0F',
        muted: '#525252',
        border: '#8C8C8C',
        card: '#FFFFFF',
        paper: '#FFFFFF',
        gold: {
          start: '#D4AF37',
          end: '#F3E5AB',
          dark: '#B4941F',
        },
        danger: '#991B1B',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Source Sans 3"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        'editorial': '0.01em',
        'caps': '0.15em',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevated': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
