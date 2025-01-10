import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/playground/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          if (["mp3", "wav"].includes(extType)) {
            return "[name].[ext]"; // No hash
          }
          return "[name].[hash].[ext]"; // Default hashed file names
        },
      }
    }
  }
})
