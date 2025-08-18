import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/Ink-Script-Editor/', // 👈 Replace <REPO> with your actual repo name
})
