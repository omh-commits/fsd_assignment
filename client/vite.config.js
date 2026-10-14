import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// During development the React app runs on port 5173 and the Express server on 5000.
// The proxy sends /api and /images requests to Express, so the login cookie works
// without any CORS setup.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:5000',
      '/images': 'http://localhost:5000'
    }
  }
});
