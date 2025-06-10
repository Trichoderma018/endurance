import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    port: 5173,
    host: true, // Permite conexiones externas
    hmr: {
      port: 5173,
      host: 'localhost'
    }
  },
})
