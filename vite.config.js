import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'live-kpss-api',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url === '/api/live-postings') {
            try {
              const { scrapeAllLiveJobs } = await import('./api/scraperEngine.js');
              const data = await scrapeAllLiveJobs(false);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            } catch (e) {
              // Fallback to static cache file
              if (fs.existsSync('public/live_jobs_cache.json')) {
                const data = fs.readFileSync('public/live_jobs_cache.json', 'utf8');
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
                return;
              }
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: e.message }));
              return;
            }
          }

          if (req.url === '/api/refresh-live' && req.method === 'POST') {
            try {
              console.log('[API] Real-time scraping live job feeds from official portals...');
              const { scrapeAllLiveJobs } = await import('./api/scraperEngine.js');
              const data = await scrapeAllLiveJobs(true);

              // Update local cache file as well
              fs.writeFileSync('public/live_jobs_cache.json', JSON.stringify(data, null, 2));

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
              return;
            } catch (e) {
              console.error('[API] Error in refresh:', e);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: e.message }));
              return;
            }
          }

          next();
        });
      }
    }
  ],
});
