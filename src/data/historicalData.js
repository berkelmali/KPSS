// Geçmiş Yıl Merkezi Atama Taban Puanları
// Memurlar.net KPSS Robotları ve ÖSYM Yerleştirme Sonuçlarından Derlenen Karşılaştırma Verisi
export const HISTORICAL_BASE_SCORES = {
  'ADALET': {
    name: 'Adalet Bakanlığı - Zabıt Katibi',
    data: [
      { year: 2023, period: '2023/2', scoreType: 'P3', baseScore: 82.45, topScore: 94.12, quota: 1200, placed: 1198, applicants: 42500 },
      { year: 2024, period: '2024/1', scoreType: 'P3', baseScore: 80.21, topScore: 93.88, quota: 1450, placed: 1447, applicants: 51200 },
      { year: 2024, period: '2024/2', scoreType: 'P3', baseScore: 78.55, topScore: 92.75, quota: 1600, placed: 1594, applicants: 48700 },
      { year: 2025, period: '2025/1', scoreType: 'P3', baseScore: 76.33, topScore: 91.42, quota: 1750, placed: 1742, applicants: 55100 },
      { year: 2025, period: '2025/2', scoreType: 'P3', baseScore: 74.88, topScore: 90.65, quota: 1800, placed: 1793, applicants: 52800 },
    ]
  },
  'SAGLIK': {
    name: 'Sağlık Bakanlığı - Hemşire/Ebe',
    data: [
      { year: 2023, period: '2023/2', scoreType: 'P3', baseScore: 68.90, topScore: 88.25, quota: 3000, placed: 2985, applicants: 38400 },
      { year: 2024, period: '2024/1', scoreType: 'P3', baseScore: 66.42, topScore: 87.10, quota: 3500, placed: 3488, applicants: 41200 },
      { year: 2024, period: '2024/2', scoreType: 'P3', baseScore: 64.78, topScore: 86.55, quota: 3800, placed: 3791, applicants: 39800 },
      { year: 2025, period: '2025/1', scoreType: 'P3', baseScore: 63.15, topScore: 85.90, quota: 4000, placed: 3992, applicants: 43500 },
      { year: 2025, period: '2025/2', scoreType: 'P3', baseScore: 61.22, topScore: 84.73, quota: 4100, placed: 4088, applicants: 45100 },
    ]
  },
  'GIB': {
    name: 'Gelir İdaresi - Gelir Uzman Yardımcısı (GUY)',
    data: [
      { year: 2023, period: '2023', scoreType: 'P48', baseScore: 78.85, topScore: 92.40, quota: 600, placed: 598, applicants: 28500 },
      { year: 2024, period: '2024', scoreType: 'P48', baseScore: 76.50, topScore: 91.25, quota: 700, placed: 697, applicants: 32100 },
      { year: 2025, period: '2025', scoreType: 'P48', baseScore: 74.12, topScore: 90.15, quota: 800, placed: 795, applicants: 35400 },
    ]
  },
  'DSI': {
    name: 'DSİ - Mühendis',
    data: [
      { year: 2023, period: '2023/2', scoreType: 'P3', baseScore: 75.60, topScore: 89.30, quota: 100, placed: 98, applicants: 8200 },
      { year: 2024, period: '2024/1', scoreType: 'P3', baseScore: 73.45, topScore: 88.15, quota: 120, placed: 118, applicants: 9400 },
      { year: 2025, period: '2025/1', scoreType: 'P3', baseScore: 71.80, topScore: 87.50, quota: 140, placed: 138, applicants: 10100 },
    ]
  },
  'EGM': {
    name: 'EGM - POMEM Polis Memuru',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 65.50, topScore: 90.80, quota: 5000, placed: 4980, applicants: 120000 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 63.12, topScore: 89.90, quota: 6000, placed: 5985, applicants: 135000 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 61.75, topScore: 88.45, quota: 7000, placed: 6988, applicants: 142000 },
    ]
  },
  'SGK': {
    name: 'SGK - Denetmen Yardımcısı',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 80.15, topScore: 93.50, quota: 200, placed: 198, applicants: 18500 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 78.90, topScore: 92.80, quota: 250, placed: 248, applicants: 21300 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 77.45, topScore: 91.90, quota: 300, placed: 298, applicants: 24000 },
    ]
  },
  'SSB': {
    name: 'SSB - Savunma Sanayii Uzman Yardımcısı',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 85.20, topScore: 96.10, quota: 30, placed: 29, applicants: 12000 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 83.75, topScore: 95.40, quota: 40, placed: 39, applicants: 14500 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 82.10, topScore: 94.85, quota: 45, placed: 44, applicants: 16200 },
    ]
  },
  'TUBITAK': {
    name: 'TÜBİTAK - Sözleşmeli Bilişim Personeli',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 76.40, topScore: 91.80, quota: 30, placed: 28, applicants: 5800 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 74.55, topScore: 90.25, quota: 35, placed: 33, applicants: 6900 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 72.80, topScore: 89.40, quota: 40, placed: 39, applicants: 7500 },
    ]
  },
  'IBB': {
    name: 'İBB - Zabıta Memuru',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 82.80, topScore: 94.65, quota: 80, placed: 79, applicants: 22000 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 81.10, topScore: 93.40, quota: 100, placed: 98, applicants: 25400 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 79.55, topScore: 92.15, quota: 110, placed: 108, applicants: 28000 },
    ]
  },
  'MEB': {
    name: 'MEB - Destek Personeli / İşçi',
    data: [
      { year: 2023, period: '2023', scoreType: 'P94', baseScore: 72.30, topScore: 92.10, quota: 800, placed: 795, applicants: 65000 },
      { year: 2024, period: '2024', scoreType: 'P94', baseScore: 70.85, topScore: 91.40, quota: 1000, placed: 994, applicants: 72000 },
      { year: 2025, period: '2025', scoreType: 'P94', baseScore: 69.10, topScore: 90.75, quota: 1100, placed: 1092, applicants: 78000 },
    ]
  },
  'DIYANET': {
    name: 'Diyanet İşleri - İmam Hatip / Kursu Öğr.',
    data: [
      { year: 2023, period: '2023', scoreType: 'P122', baseScore: 58.50, topScore: 85.20, quota: 1000, placed: 988, applicants: 45000 },
      { year: 2024, period: '2024', scoreType: 'P122', baseScore: 56.80, topScore: 84.10, quota: 1200, placed: 1190, applicants: 48500 },
      { year: 2025, period: '2025', scoreType: 'P122', baseScore: 55.15, topScore: 83.25, quota: 1350, placed: 1340, applicants: 52000 },
    ]
  },
  'CEVRE': {
    name: 'Çevre Bak. - Mimar/Plancı/Mühendis',
    data: [
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 74.90, topScore: 89.75, quota: 80, placed: 78, applicants: 7200 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 73.20, topScore: 88.50, quota: 100, placed: 97, applicants: 8800 },
    ]
  },
  'GOC': {
    name: 'Göç İdaresi - Uzman Yardımcısı',
    data: [
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 76.80, topScore: 91.30, quota: 150, placed: 148, applicants: 16500 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 75.15, topScore: 90.45, quota: 180, placed: 177, applicants: 19200 },
    ]
  },
  'GSB': {
    name: 'GSB - Yurt Yönetim Personeli',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 73.20, topScore: 88.90, quota: 400, placed: 397, applicants: 28000 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 71.55, topScore: 87.60, quota: 500, placed: 496, applicants: 31500 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 69.80, topScore: 86.30, quota: 600, placed: 595, applicants: 35000 },
    ]
  },
  'KGM': {
    name: 'Karayolları - Tekniker/Şoför',
    data: [
      { year: 2023, period: '2023', scoreType: 'P93', baseScore: 70.50, topScore: 87.40, quota: 60, placed: 59, applicants: 9800 },
      { year: 2024, period: '2024', scoreType: 'P93', baseScore: 68.80, topScore: 86.25, quota: 75, placed: 73, applicants: 11200 },
      { year: 2025, period: '2025', scoreType: 'P93', baseScore: 67.15, topScore: 85.10, quota: 85, placed: 83, applicants: 12800 },
    ]
  },
  'ANKARA-UNI': {
    name: 'Ankara Üniversitesi - Büro/Destek Pers.',
    data: [
      { year: 2023, period: '2023', scoreType: 'P3', baseScore: 77.40, topScore: 90.50, quota: 50, placed: 49, applicants: 14000 },
      { year: 2024, period: '2024', scoreType: 'P3', baseScore: 75.90, topScore: 89.20, quota: 60, placed: 59, applicants: 16500 },
      { year: 2025, period: '2025', scoreType: 'P3', baseScore: 74.25, topScore: 88.10, quota: 70, placed: 68, applicants: 18200 },
    ]
  }
};

// Branş Sıralaması Verileri (ÖSYM son yayımlanan verilerden)
export const BRANCH_RANKINGS = {
  'Bilgisayar Mühendisliği': { totalCandidates: 18500, avgScore: 74.2, medianScore: 72.8 },
  'Hukuk': { totalCandidates: 32000, avgScore: 76.5, medianScore: 74.1 },
  'İktisat': { totalCandidates: 45000, avgScore: 72.8, medianScore: 70.3 },
  'İşletme': { totalCandidates: 52000, avgScore: 71.5, medianScore: 69.2 },
  'Maliye': { totalCandidates: 12000, avgScore: 75.8, medianScore: 73.5 },
  'Hemşirelik': { totalCandidates: 28000, avgScore: 67.2, medianScore: 65.1 },
  'Tıbbi Dokümantasyon ve Sekreterlik': { totalCandidates: 15000, avgScore: 69.5, medianScore: 67.8 },
  'İnşaat Mühendisliği': { totalCandidates: 22000, avgScore: 73.1, medianScore: 71.0 },
  'Elektrik-Elektronik Mühendisliği': { totalCandidates: 14000, avgScore: 73.8, medianScore: 71.5 },
  'Büro Yönetimi ve Yönetici Asistanlığı': { totalCandidates: 19000, avgScore: 70.2, medianScore: 68.5 },
  'Adalet': { totalCandidates: 21000, avgScore: 72.0, medianScore: 70.0 },
  'İlahiyat': { totalCandidates: 35000, avgScore: 64.8, medianScore: 62.5 },
  'Tümü': { totalCandidates: 850000, avgScore: 68.5, medianScore: 65.2 },
};

// ÖSYM 7 Haneli Kadro Kodları (Tercih robotlarından alınan örnek)
export const OSYM_POSITION_CODES = [
  { osmyCode: '3110101', institution: 'Adalet Bakanlığı', title: 'Zabıt Katibi', city: 'Ankara Adliyesi', quota: 45, scoreType: 'P3', nitelikCodes: ['2001', '6225'] },
  { osmyCode: '3110102', institution: 'Adalet Bakanlığı', title: 'Zabıt Katibi', city: 'İstanbul Anadolu Adliyesi', quota: 65, scoreType: 'P3', nitelikCodes: ['2001', '6225'] },
  { osmyCode: '3110103', institution: 'Adalet Bakanlığı', title: 'İcra Katibi', city: 'İzmir Adliyesi', quota: 30, scoreType: 'P3', nitelikCodes: ['3007', '6225'] },
  { osmyCode: '3110104', institution: 'Adalet Bakanlığı', title: 'Zabıt Katibi', city: 'Antalya Adliyesi', quota: 25, scoreType: 'P3', nitelikCodes: ['2001', '6225'] },
  { osmyCode: '3210201', institution: 'Sağlık Bakanlığı', title: 'Hemşire', city: 'İstanbul (Tüm Hastaneler)', quota: 320, scoreType: 'P3', nitelikCodes: ['4605'] },
  { osmyCode: '3210202', institution: 'Sağlık Bakanlığı', title: 'Ebe', city: 'Ankara (Tüm Hastaneler)', quota: 180, scoreType: 'P3', nitelikCodes: ['4605'] },
  { osmyCode: '3210203', institution: 'Sağlık Bakanlığı', title: 'Tıbbi Sekreter', city: 'Gaziantep', quota: 45, scoreType: 'P93', nitelikCodes: ['3005'] },
  { osmyCode: '4110301', institution: 'Gelir İdaresi Başkanlığı', title: 'Gelir Uzman Yrd.', city: 'Ankara', quota: 120, scoreType: 'P48', nitelikCodes: ['4429', '4431', '4459'] },
  { osmyCode: '4110302', institution: 'Gelir İdaresi Başkanlığı', title: 'Gelir Uzman Yrd.', city: 'İstanbul', quota: 85, scoreType: 'P48', nitelikCodes: ['4429', '4431', '4459'] },
  { osmyCode: '4110303', institution: 'Gelir İdaresi Başkanlığı', title: 'Gelir Uzman Yrd.', city: 'İzmir', quota: 55, scoreType: 'P48', nitelikCodes: ['4429', '4431', '4459'] },
  { osmyCode: '5110401', institution: 'DSİ Genel Müdürlüğü', title: 'İnşaat Mühendisi', city: 'Ankara', quota: 25, scoreType: 'P3', nitelikCodes: ['4639'] },
  { osmyCode: '5110402', institution: 'DSİ Genel Müdürlüğü', title: 'Bilgisayar Mühendisi', city: 'Ankara', quota: 10, scoreType: 'P3', nitelikCodes: ['4531'] },
  { osmyCode: '6110501', institution: 'EGM / POMEM', title: 'Polis Memuru Adayı', city: 'Tüm Türkiye (POMEM)', quota: 6000, scoreType: 'P3', nitelikCodes: ['4001'] },
  { osmyCode: '6110502', institution: 'EGM / POMEM', title: 'Polis Memuru Adayı (Ön Lisans)', city: 'Tüm Türkiye (POMEM)', quota: 1500, scoreType: 'P93', nitelikCodes: ['3001'] },
  { osmyCode: '7110601', institution: 'SGK', title: 'Sosyal Güvenlik Denetmen Yrd.', city: 'İstanbul', quota: 50, scoreType: 'P3', nitelikCodes: ['4421', '4429', '4431'] },
  { osmyCode: '7110602', institution: 'SGK', title: 'Sosyal Güvenlik Denetmen Yrd.', city: 'Ankara', quota: 40, scoreType: 'P3', nitelikCodes: ['4421', '4429', '4431'] },
  { osmyCode: '8110701', institution: 'TÜBİTAK BİLGEM', title: 'Yazılım Uzmanı', city: 'Kocaeli (Gebze)', quota: 15, scoreType: 'P3', nitelikCodes: ['4531', '7101'] },
  { osmyCode: '8110702', institution: 'TÜBİTAK BİLGEM', title: 'Siber Güvenlik Uzmanı', city: 'Ankara', quota: 10, scoreType: 'P3', nitelikCodes: ['4531', '7101'] },
  { osmyCode: '9110801', institution: 'SSB', title: 'Savunma San. Uzman Yrd.', city: 'Ankara', quota: 20, scoreType: 'P3', nitelikCodes: ['4531', '4611', '7101'] },
  { osmyCode: '9110802', institution: 'SSB', title: 'Savunma San. Uzman Yrd.', city: 'Ankara', quota: 15, scoreType: 'P3', nitelikCodes: ['4639', '7101'] },
  { osmyCode: '1010901', institution: 'İBB', title: 'Zabıta Memuru', city: 'İstanbul', quota: 120, scoreType: 'P3', nitelikCodes: ['4001', '6506'] },
  { osmyCode: '1011001', institution: 'Ankara Üniversitesi', title: 'Büro Personeli', city: 'Ankara', quota: 40, scoreType: 'P3', nitelikCodes: ['4001', '6225'] },
  { osmyCode: '1011002', institution: 'Ankara Üniversitesi', title: 'Koruma/Güvenlik', city: 'Ankara', quota: 20, scoreType: 'P94', nitelikCodes: ['2001'] },
  { osmyCode: '1111101', institution: 'GSB / KYK', title: 'Yurt Yönetim Pers.', city: 'Ankara', quota: 80, scoreType: 'P3', nitelikCodes: ['4001', '6225'] },
  { osmyCode: '1111102', institution: 'GSB / KYK', title: 'Yurt Yönetim Pers.', city: 'İstanbul', quota: 95, scoreType: 'P3', nitelikCodes: ['4001', '6225'] },
  { osmyCode: '1111103', institution: 'GSB / KYK', title: 'Yurt Yönetim Pers.', city: 'İzmir', quota: 50, scoreType: 'P3', nitelikCodes: ['4001', '6225'] },
  { osmyCode: '1211201', institution: 'Çevre Bakanlığı', title: 'Şehir Plancısı', city: 'Hatay', quota: 15, scoreType: 'P3', nitelikCodes: ['4639'] },
  { osmyCode: '1211202', institution: 'Çevre Bakanlığı', title: 'İnşaat Mühendisi', city: 'Kahramanmaraş', quota: 20, scoreType: 'P3', nitelikCodes: ['4639'] },
  { osmyCode: '1311301', institution: 'Göç İdaresi', title: 'İl Göç Uzman Yrd.', city: 'İstanbul', quota: 35, scoreType: 'P3', nitelikCodes: ['4421', '4429', '7101'] },
  { osmyCode: '1311302', institution: 'Göç İdaresi', title: 'İl Göç Uzman Yrd.', city: 'Gaziantep', quota: 30, scoreType: 'P3', nitelikCodes: ['4421', '4429'] },
  { osmyCode: '1411401', institution: 'Diyanet İşleri', title: 'İmam-Hatip', city: 'Konya', quota: 120, scoreType: 'P122', nitelikCodes: ['7111'] },
  { osmyCode: '1411402', institution: 'Diyanet İşleri', title: 'Kuran Kursu Öğreticisi', city: 'Erzurum', quota: 80, scoreType: 'P122', nitelikCodes: ['7111'] },
  { osmyCode: '1511501', institution: 'MEB', title: 'Aşçı', city: 'İstanbul', quota: 150, scoreType: 'P94', nitelikCodes: ['2001'] },
  { osmyCode: '1511502', institution: 'MEB', title: 'Temizlik Görevlisi', city: 'Ankara', quota: 100, scoreType: 'P94', nitelikCodes: ['2001'] },
  { osmyCode: '1611601', institution: 'KGM', title: 'İnşaat Teknikeri', city: 'Ankara', quota: 15, scoreType: 'P93', nitelikCodes: ['3173'] },
  { osmyCode: '1611602', institution: 'KGM', title: 'Ağır Vasıta Şoförü', city: 'Konya', quota: 10, scoreType: 'P94', nitelikCodes: ['2001', '6511'] },
];

// KPSS Puan Türleri Detaylı Açıklamaları
export const KPSS_SCORE_TYPES = {
  'P1': { name: 'KPSS P1', level: 'Lisans', tests: 'GY + GK + Hukuk', description: 'Lisans hukuk ağırlıklı puan. Avukatlık, hukuk müşavirliği ve A Grubu hukuk kadrolarında kullanılır.' },
  'P2': { name: 'KPSS P2', level: 'Lisans', tests: 'GY + GK + İktisat', description: 'Lisans iktisat ağırlıklı puan. A Grubu iktisat kökenli uzmanlık kadrolarında tercih edilir.' },
  'P3': { name: 'KPSS P3', level: 'Lisans', tests: 'GY + GK', description: 'Lisans genel puan türü. B Grubu memurluk (VHKİ, büro, zabıt katibi, mühendis vb.) kadrolarında en çok kullanılan türdür.' },
  'P48': { name: 'KPSS P48', level: 'Lisans', tests: 'GY + GK + Muhasebe', description: 'Maliye/İktisat/İşletme ağırlıklı lisans puanı. Gelir uzmanlığı (GUY) ve mali hizmet uzm. giriş sınavlarında kullanılır.' },
  'P93': { name: 'KPSS P93', level: 'Ön Lisans', tests: 'GY + GK', description: 'Ön lisans (2 yıllık) genel puanı. MYO mezunlarının B Grubu memur, tekniker, ebe alımlarında kullanılır.' },
  'P94': { name: 'KPSS P94', level: 'Ortaöğretim', tests: 'GY + GK', description: 'Ortaöğretim (lise) genel puanı. Zabıta, şoför, hizmetli, destek personeli ve işçi alımlarında kullanılır.' },
  'P122': { name: 'KPSS P122', level: 'Lisans / İlahiyat', tests: 'GY + GK + DKAB/DHBT', description: 'Diyanet İşleri din hizmetleri puanı. İmam-Hatip ve Kuran Kursu Öğreticisi atamalarında kullanılır.' },
  'P123': { name: 'KPSS P123', level: 'Ön Lisans / İlahiyat', tests: 'GY + GK + DKAB/DHBT', description: 'Diyanet ön lisans İlahiyat puanı.' },
  'P124': { name: 'KPSS P124', level: 'Ortaöğretim / İHL', tests: 'GY + GK + DKAB/DHBT', description: 'İmam Hatip Lisesi mezunları için Diyanet puanı.' },
};

// Salary / Maaş Bilgileri (2026 tahmini)
export const SALARY_ESTIMATES = {
  'Kariyer / Uzman Yrd.': { gross: '42.000 - 58.000 ₺', net: '32.000 - 42.000 ₺', benefits: 'Ek gösterge, yabancı dil tazminatı, yemek, servis' },
  '4/A Kadrolu': { gross: '35.000 - 48.000 ₺', net: '27.000 - 36.000 ₺', benefits: 'İş güvencesi, döner sermaye (sağlık), yemek, servis' },
  '4/B Sözleşmeli': { gross: '30.000 - 40.000 ₺', net: '24.000 - 31.000 ₺', benefits: 'Sözleşme primi, yemek, bazı kurumlarda lojman' },
  'Sözleşmeli Bilişim': { gross: '55.000 - 120.000 ₺', net: '42.000 - 88.000 ₺', benefits: 'Tavan ücretin 2-4 katı, esnek çalışma, yemek' },
  'Sürekli İşçi': { gross: '25.000 - 32.000 ₺', net: '20.000 - 26.000 ₺', benefits: 'Toplu iş sözleşmesi (TİS), ikramiye, yemek, servis' },
};
