import { scrapeAllLiveJobs } from './scraperEngine.js';

export default async function handler(req, res) {
  try {
    // Get latest jobs (uses fast memory cache if recent, or scrapes in background)
    const data = await scrapeAllLiveJobs(false);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
