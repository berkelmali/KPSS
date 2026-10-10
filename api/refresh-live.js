import { scrapeAllLiveJobs } from './scraperEngine.js';

export default async function handler(req, res) {
  try {
    // Force immediate live scrape from all official portals (SBB, Memurlar.net, Resmi Gazete)
    const data = await scrapeAllLiveJobs(true);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
