import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  base: '/github-friendly-blog/', // 👈 ADD THIS LINE (your repo name)
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
