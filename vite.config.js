import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import { handleApi } from './server/api.js';

try { process.loadEnvFile('.env'); } catch { /* SMTP credentials are optional until configured. */ }

function quoteApi() {
  const middleware = (req, res, next) => {
    if (!req.url?.startsWith('/api/')) return next();
    handleApi(req, res).catch(error => { console.error('Quote API error:', error); if (!res.headersSent) { res.writeHead(500, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' })); } });
  };
  return { name: 'paradise-quote-api', configureServer(server) { server.middlewares.use(middleware); }, configurePreviewServer(server) { server.middlewares.use(middleware); } };
}

export default defineConfig({
  plugins: [react(), quoteApi()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        ecommerce: fileURLToPath(new URL('./ecommerce/index.html', import.meta.url)),
      },
    },
  },
});
