/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{svelte,js}'],
  theme: {
    extend: {
      colors: {
        // Rojo oscuro: color principal de la marca
        primary: {
          50: '#fdf2f2',
          100: '#fbe3e4',
          200: '#f6c0c3',
          300: '#ee8d93',
          400: '#e2565e',
          500: '#cc2f39',
          600: '#a82129',
          700: '#8b1a22',
          800: '#6e151b',
          900: '#4b0f13',
          950: '#2b0709',
        },
        // Grises carbón para fondos y superficies
        ink: {
          950: '#0c0c0e',
          900: '#121214',
          850: '#18181b',
          800: '#1f1f23',
          700: '#2a2a30',
          600: '#3a3a42',
        },
      },
      fontFamily: {
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Forum', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
