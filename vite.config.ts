import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.vrm'],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vrm'],
  },
})
