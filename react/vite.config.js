import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ✅ Vite config for Render deployment
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Use root path so assets load correctly on all devices
  server: {
    port: 5173, // optional, default dev port
    strictPort: true, 
  },
  build: {
    outDir: 'dist', // default build output
  },
})
