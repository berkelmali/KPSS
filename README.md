# 🏛️ KPSS Kamu & Canlı İlan Portalı

Türkiye geneli tüm kamu kurum ve kuruluşlarının (SBB Kamu İlan, Memurlar.net, T.C. Resmi Gazete, CBİKO Kariyer Kapısı) aktif personel alım ilanlarını gerçek zamanlı olarak toplayan, filtreleyen ve KPSS tercih simülasyonu sunan yeni nesil kamu kariyer platformu.

---

## 🚀 Temel Özellikler

- **🔴 Gerçek Zamanlı Çoklu Portal Taraması:**
  - **T.C. SBB Kamu İlan Portalı:** Resmi kadro ve alım duyuruları.
  - **Memurlar.net (12 Kategori & Çoklu Sayfa):** 4/B Sözleşmeli, KPSS-B, KPSS-A, Askeri/Emniyet, Mahalli İdareler, SYDV, Engelli ve İşçi alımları.
  - **T.C. Resmi Gazete:** Son 4 günün resmi mükerrer ve olağan sayıları.
  - **Kariyer Kapısı (CBİKO):** Doğrudan e-Devlet ve Kariyer Kapısı yönlendirmeleri.
- **🎓 Eğitim Düzeyi Ayrıştırması:**
  - Üniversite KPSS (Lisans / Önlisans)
  - Lise KPSS (Ortaöğretim)
  - Tüm KPSS ilanları
- **🎯 Akıllı Nitelik & Kadro Eşleştirme:**
  - Nitelik kodu analizi (örn: 3001, 4001, 6225).
  - P3, P93, P94 puan türlerine göre uygunluk skoru.
- **💼 Tercih Sepeti & Başvuru Takibi:** İlanları sepete ekleme, son başvuru tarihi geri sayımı ve doğrudan resmi ilana gitme.
- **⚡ Serverless & Yüksek Dayanıklılık:** 4 saniyelik timeout koruması, 5 dakikalık akıllı bellek önbelleği ve statik fallback mimarisi.

---

## 🛠️ Teknoloji Yığını

- **Frontend:** React 19, Vite, Lucide Icons, Canvas Confetti
- **Stil / Tasarım:** Modern Kurumsal Tasarım Sistemi (Plus Jakarta Sans, CSS Değişkenleri, Dark/Light Mode)
- **API & Dağıtım:** Vercel Serverless Functions (`/api/live-postings`, `/api/refresh-live`)

---

## 📦 Kurulum ve Yerel Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Canlı verileri yerel önbelleğe senkronize etmek için (isteğe bağlı)
node scripts/fetchLiveJobs.cjs

# Prodüksiyon derlemesi alın
npm run build
```

---

## 🌐 Vercel Dağıtımı

Proje Vercel için yapılandırılmıştır (`vercel.json`).

1. Bu depoyu GitHub hesabınıza aktarın (`main` dalı).
2. [Vercel](https://vercel.com) panelinden reponuzu seçip **Deploy** butonuna basın.
3. `/api/live-postings` ve `/api/refresh-live` API uç noktaları Vercel üzerinde sunucusuz (serverless) olarak otomatik çalışacaktır.
