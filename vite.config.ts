import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    basicSsl() // This forces Vite to generate an SSL certificate on the fly
  ],
  server: {
    host: true,
    allowedHosts: ['passgen.moaz.com']
  }
})
