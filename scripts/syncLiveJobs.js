import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { scrapeAllLiveJobs } from '../api/scraperEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function sync() {
  console.log('====================================================');
  console.log('🔄 KAMUASİSTAN CANLI RESMİ VERİ AKIŞI SENKRONİZASYONU');
  console.log('====================================================');
  const startTime = Date.now();

  try {
    const liveData = await scrapeAllLiveJobs(true);

    if (!liveData || !liveData.postings || liveData.postings.length === 0) {
      console.error('❌ Hata: İlan verisi boş döndü!');
      process.exit(1);
    }

    console.log(`✅ Canlı Veri Çekildi: Toplam ${liveData.totalCount} Resmi İlan`);
    console.log(`   - Üniversite Kadroları: ${liveData.universityCount}`);
    console.log(`   - Ortaöğretim (Lise) Kadroları: ${liveData.liseCount}`);
    console.log(`   - SBB Kamu İlan: ${liveData.sources.sbb.count} ilan`);
    console.log(`   - Memurlar.net: ${liveData.sources.memurlar.count} ilan`);
    console.log(`   - T.C. Resmi Gazete: ${liveData.sources.resmiGazete.count} ilan`);
    console.log(`   - Kariyer Kapısı: ${liveData.sources.kariyerKapisi.count} ilan`);

    // 1. Write to public/live_jobs_cache.json (used by static CDN edge)
    const publicCachePath = path.join(rootDir, 'public', 'live_jobs_cache.json');
    fs.writeFileSync(publicCachePath, JSON.stringify(liveData, null, 2), 'utf-8');
    console.log(`💾 public/live_jobs_cache.json güncellendi (${(fs.statSync(publicCachePath).size / 1024).toFixed(1)} KB)`);

    // 2. Write to src/data/livePostingsData.js (used as bundled fallback)
    const srcDataPath = path.join(rootDir, 'src', 'data', 'livePostingsData.js');
    const jsContent = `// Otomatik oluşturulan canlı veri deposu (Sync: ${new Date().toISOString()})\nexport const LIVE_POSTINGS_DATA = ${JSON.stringify(liveData, null, 2)};\n`;
    fs.writeFileSync(srcDataPath, jsContent, 'utf-8');
    console.log(`💾 src/data/livePostingsData.js güncellendi (${(fs.statSync(srcDataPath).size / 1024).toFixed(1)} KB)`);

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✨ Senkronizasyon ${elapsed} saniyede başarıyla tamamlandı!`);
  } catch (err) {
    console.error('❌ Senkronizasyon hatası:', err);
    process.exit(1);
  }
}

sync();
