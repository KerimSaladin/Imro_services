import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  assetsInclude: ['**/*.ttf'],
  preview: {
    host: '0.0.0.0',
    port: 10000,
    allowedHosts: ['imro-services.onrender.com'],
  },
})
