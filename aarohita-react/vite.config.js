// aarohita-react/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',          // ✅ use '/' for custom domain / CNAME
  build: { outDir: 'dist' }, // (default, explicit for clarity)
})
