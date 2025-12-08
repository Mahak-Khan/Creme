import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ensures assets are loaded correctly after deployment
  server: {
    allowedHosts: ['matchlessly-unflinching-caiden.ngrok-free.dev'], // allow all LocalTunnel hosts
  }
})
