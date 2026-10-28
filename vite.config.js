import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// Despliegue estático: base relativa para que funcione en cualquier ruta de Azure.
export default defineConfig({
  base: './',
  plugins: [svelte()],
})
