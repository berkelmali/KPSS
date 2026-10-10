import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  FileCheck, 
  Zap, 
  HelpCircle,
  Copy,
  ArrowRight
} from 'lucide-react';

export const SAMPLE_DOCUMENTS = {
  lisans_muhendis: `T.C. ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI
2026-KPSS LİSANS SINAV SONUÇ BELGESİ
T.C. Kimlik Numarası: 38********4
Adı ve Soyadı: ALİ KAYA
Öğrenim Durumu: Bir lisans programını bitirdi
Mezun Olunan Alan/Program: Bilgisayar Mühendisliği

TESTLER VE NETLER
Genel Yetenek: 44 Doğru, 7 Yanlış (Net: 42.25)
Genel Kültür: 38 Doğru, 10 Yanlış (Net: 35.50)

KPSS PUANLARI
KPSS P3: 82.47612 (Başarı Sırası: 4.120)
KPSS P1: 80.12500
KPSS P2: 81.33000
Sonuç Belgesi Doğrulama Kodu: 2026-KPSS-A9B8C7D6`,

  onlisans_saglik: `T.C. ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI
2026-KPSS ÖN LİSANS SINAV SONUÇ BELGESİ
T.C. Kimlik Numarası: 24********8
Adı ve Soyadı: AYŞE YILMAZ
Öğrenim Durumu: Bir ön lisans programını bitirdi
Mezun Olunan Alan/Program: Tıbbi Dokümantasyon ve Sekreterlik

TESTLER VE NETLER
Genel Yetenek: 36 Doğru, 12 Yanlış (Net: 33.00)
Genel Kültür: 35 Doğru, 11 Yanlış (Net: 32.25)

KPSS PUANLARI
KPSS P93: 76.85240 (Başarı Sırası: 9.450)
Sonuç Belgesi Doğrulama Kodu: 2026-KPSS-X1Y2Z3W4`,

  lisans_iibf: `T.C. ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI
2026-KPSS LİSANS SINAV SONUÇ BELGESİ
T.C. Kimlik Numarası: 19********2
Adı ve Soyadı: MEHMET DEMİR
Öğrenim Durumu: Bir lisans programını bitirdi
Mezun Olunan Alan/Program: İktisat

TESTLER VE NETLER
Genel Yetenek: 41 Doğru, 9 Yanlış (Net: 38.75)
Genel Kültür: 43 Doğru, 8 Yanlış (Net: 41.00)

KPSS PUANLARI
KPSS P3: 84.62100 (Başarı Sırası: 2.890)
KPSS P48: 83.15000 (Gelir Uzmanlığı)
Sonuç Belgesi Doğrulama Kodu: 2026-KPSS-M4N5O6P7`,

  ortaogretim_lise: `T.C. ÖLÇME, SEÇME VE YERLEŞTİRME MERKEZİ BAŞKANLIĞI
2026-KPSS ORTAÖĞRETİM SINAV SONUÇ BELGESİ
T.C. Kimlik Numarası: 45********6
Adı ve Soyadı: EMRE ÖZTÜRK
Öğrenim Durumu: Ortaöğretim (Lise) mezunu
Mezun Olunan Alan/Program: Genel Lise / Tüm Alanlar

TESTLER VE NETLER
Genel Yetenek: 46 Doğru, 8 Yanlış (Net: 44.00)
Genel Kültür: 42 Doğru, 9 Yanlış (Net: 39.75)

KPSS PUANLARI
KPSS P94: 86.25000 (Başarı Sırası: 1.750)
Sonuç Belgesi Doğrulama Kodu: 2026-KPSS-K8L9M0N1`
};

export default function AutoProfileModal({ 
  isOpen, 
  onClose, 
  onApplyParsedProfile 
}) {
  const [activeSubTab, setActiveSubTab] = useState('doc_parser'); // 'doc_parser' | 'quick_templates' | 'edevlet_info'
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState(null);
  const [parseStatus, setParseStatus] = useState(null); // 'success' | 'error' | null

  if (!isOpen) return null;

  // Akıllı Regex & Metin Ayrıştırma Motoru
  const parseResultText = (text) => {
    if (!text || text.trim().length < 15) {
      setParseStatus('error');
      setParsedData(null);
      return;
    }

    let detectedLevel = 'lisans';
    let detectedScore = 75.0;
    let detectedScoreType = 'KPSS P3';
    let detectedDepartment = 'Tümü';
    let detectedName = '';

    // 1. İsim Tespiti
    const nameMatch = text.match(/Adı\s*(?:ve\s*)?Soyadı\s*:\s*([^\n\r]+)/i);
    if (nameMatch) {
      detectedName = nameMatch[1].trim();
    }

    // 2. KPSS Puan Tespiti
    // Öncelik: P3, P93, P94, P1, P2
    const p3Match = text.match(/KPSS\s*P3\s*:\s*([0-9]{2,3}(?:[.,][0-9]+)?)/i);
    const p93Match = text.match(/KPSS\s*P93\s*:\s*([0-9]{2,3}(?:[.,][0-9]+)?)/i);
    const p94Match = text.match(/KPSS\s*P94\s*:\s*([0-9]{2,3}(?:[.,][0-9]+)?)/i);
    const genericScoreMatch = text.match(/Puanı?\s*:\s*([0-9]{2,3}(?:[.,][0-9]+)?)/i);

    if (p93Match) {
      detectedScore = parseFloat(p93Match[1].replace(',', '.'));
      detectedScoreType = 'KPSS P93';
      detectedLevel = 'onlisans';
    } else if (p94Match) {
      detectedScore = parseFloat(p94Match[1].replace(',', '.'));
      detectedScoreType = 'KPSS P94';
      detectedLevel = 'lise';
    } else if (p3Match) {
      detectedScore = parseFloat(p3Match[1].replace(',', '.'));
      detectedScoreType = 'KPSS P3';
      detectedLevel = 'lisans';
    } else if (genericScoreMatch) {
      detectedScore = parseFloat(genericScoreMatch[1].replace(',', '.'));
    }

    // 3. Öğrenim Durumu Tespiti
    if (text.match(/ön\s*lisans/i)) {
      detectedLevel = 'onlisans';
    } else if (text.match(/ortaöğretim|lise/i)) {
      detectedLevel = 'lise';
    } else if (text.match(/lisans/i)) {
      detectedLevel = 'lisans';
    }

    // 4. Bölüm / Program Tespiti
    if (text.match(/bilgisayar\s*mühendisliği|yazılım/i)) {
      detectedDepartment = 'Bilgisayar Mühendisliği';
    } else if (text.match(/hukuk/i)) {
      detectedDepartment = 'Hukuk';
    } else if (text.match(/iktisat|ekonomi/i)) {
      detectedDepartment = 'İktisat';
    } else if (text.match(/işletme/i)) {
      detectedDepartment = 'İşletme';
    } else if (text.match(/maliye/i)) {
      detectedDepartment = 'Maliye';
    } else if (text.match(/hemşirelik/i)) {
      detectedDepartment = 'Hemşirelik';
    } else if (text.match(/tıbbi\s*dokümantasyon|tıbbi\s*sekreter/i)) {
      detectedDepartment = 'Tıbbi Dokümantasyon ve Sekreterlik';
    } else if (text.match(/büro\s*yönetimi/i)) {
      detectedDepartment = 'Büro Yönetimi ve Yönetici Asistanlığı';
    } else if (text.match(/inşaat\s*mühendisliği/i)) {
      detectedDepartment = 'İnşaat Mühendisliği';
    } else if (text.match(/elektrik/i)) {
      detectedDepartment = 'Elektrik-Elektronik Mühendisliği';
    } else if (text.match(/adalet/i)) {
      detectedDepartment = 'Adalet';
    } else if (text.match(/ilahiyat/i)) {
      detectedDepartment = 'İlahiyat';
    }

    const result = {
      name: detectedName || 'Değerli Aday',
      score: detectedScore,
      scoreType: detectedScoreType,
      educationLevel: detectedLevel,
      department: detectedDepartment,
      rawText: text
    };

    setParsedData(result);
    setParseStatus('success');
  };

  const handleLoadSample = (sampleKey) => {
    const text = SAMPLE_DOCUMENTS[sampleKey];
    setInputText(text);
    parseResultText(text);
  };

  const handleApply = () => {
    if (!parsedData) return;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 }
    });

    onApplyParsedProfile({
      score: parsedData.score,
      educationLevel: parsedData.educationLevel,
      department: parsedData.department
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '850px' }}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="brand-icon" style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #059669, #2563eb)' }}>
              <Zap size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Otomatik Bilgi Getir & Profil Eşle</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ÖSYM Sonuç Belgenizi veya e-Devlet bilgilerinizi saniyeler içinde otomatik ayrıştırın.
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Sub-tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface-subtle)', padding: '0.5rem 1.5rem', gap: '0.75rem' }}>
          <button 
            className={`nav-btn ${activeSubTab === 'doc_parser' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('doc_parser')}
            style={{ fontSize: '0.85rem' }}
          >
            <FileText size={15} />
            <span>ÖSYM Belge / Metin Ayrıştırıcı</span>
          </button>

          <button 
            className={`nav-btn ${activeSubTab === 'quick_templates' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('quick_templates')}
            style={{ fontSize: '0.85rem' }}
          >
            <FileCheck size={15} />
            <span>Örnek Aday Profilleri</span>
          </button>

          <button 
            className={`nav-btn ${activeSubTab === 'edevlet_info' ? 'active' : ''}`}
            onClick={() => setActiveSubTab('edevlet_info')}
            style={{ fontSize: '0.85rem' }}
          >
            <ShieldCheck size={15} />
            <span>e-Devlet Entegrasyonu Nasıl Çalışır?</span>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {activeSubTab === 'doc_parser' && (
            <div>
              {/* Info alert */}
              <div style={{ background: 'var(--primary-light)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                <HelpCircle size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.835rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  <strong>Nasıl Çalışır?</strong> ÖSYM AİS (Sonuç Belgesi) sayfanızdaki metni kopyalayıp aşağıdaki kutucuğa yapıştırın (veya hazır örneklerden birini seçin). Sistem puanınızı (P3, P93, P94) ve mezuniyet alanınızı <strong>otomatik tespit eder</strong>.
                </div>
              </div>

              {/* Sample quick buttons */}
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.785rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                  Hemen Denemek İçin Örnek Belge Seçin:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.4rem' }}>
                  <button 
                    className="filter-pill-btn" 
                    onClick={() => handleLoadSample('lisans_muhendis')}
                  >
                    💻 Bilgisayar Müh. (P3: 82.47)
                  </button>
                  <button 
                    className="filter-pill-btn" 
                    onClick={() => handleLoadSample('onlisans_saglik')}
                  >
                    🏥 Tıbbi Sekreterlik (P93: 76.85)
                  </button>
                  <button 
                    className="filter-pill-btn" 
                    onClick={() => handleLoadSample('lisans_iibf')}
                  >
                    📊 İktisat / İİBF (P3: 84.62)
                  </button>
                  <button 
                    className="filter-pill-btn" 
                    onClick={() => handleLoadSample('ortaogretim_lise')}
                  >
                    🎓 Ortaöğretim / Lise (P94: 86.25)
                  </button>
                </div>
              </div>

              {/* Textarea */}
              <div className="form-group">
                <label className="form-label">ÖSYM KPSS Sonuç Belgesi Metni</label>
                <textarea
                  rows="6"
                  className="form-input"
                  style={{ fontFamily: 'monospace', fontSize: '0.825rem', resize: 'vertical' }}
                  placeholder="ÖSYM AİS sonuç sayfasındaki metni buraya yapıştırın..."
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    parseResultText(e.target.value);
                  }}
                />
              </div>

              {/* Parsed Result Display */}
              {parsedData && (
                <div style={{ background: 'var(--bg-surface-subtle)', border: '2px solid var(--success)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', marginTop: '1rem', animation: 'fadeIn 0.25s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
                      <strong style={{ fontSize: '1rem', color: 'var(--success)' }}>
                        Bilgileriniz Başarıyla Otomatik Ayrıştırıldı!
                      </strong>
                    </div>
                    <span className="badge badge-success">Otomatik Eşleşme Hazır</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.85rem' }}>
                    <div style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Aday Adı:</span>
                      <div style={{ fontWeight: 700 }}>{parsedData.name}</div>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>KPSS Puanı & Türü:</span>
                      <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.1rem' }}>
                        {parsedData.score.toFixed(2)} ({parsedData.scoreType})
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Öğrenim Düzeyi:</span>
                      <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>
                        {parsedData.educationLevel === 'lisans' ? 'Lisans (4 Yıllık)' : parsedData.educationLevel === 'onlisans' ? 'Ön Lisans (2 Yıllık)' : 'Ortaöğretim (Lise)'}
                      </div>
                    </div>

                    <div style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Tespit Edilen Bölüm:</span>
                      <div style={{ fontWeight: 700 }}>{parsedData.department}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeSubTab === 'quick_templates' && (
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Kendinize en yakın profili seçerek tek tıkla tüm profil ayarlarınızı (puan, mezuniyet, alan) sisteme yükleyebilirsiniz:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                {[
                  { title: 'Hukuk Mezunu', level: 'lisans', score: 83.40, dept: 'Hukuk', icon: '⚖️', desc: 'Avukatlık, adalet uzmanlığı ve kariyer meslekleri için' },
                  { title: 'Bilgisayar Mühendisi', level: 'lisans', score: 79.50, dept: 'Bilgisayar Mühendisliği', icon: '💻', desc: 'Sözleşmeli bilişim ve teknik kadrolar için' },
                  { title: 'İİBF / İktisat / İşletme', level: 'lisans', score: 81.25, dept: 'İktisat', icon: '📊', desc: 'Gelir uzmanlığı (GUY), SGK ve memurluk kadroları için' },
                  { title: 'Hemşire / Sağlık Lisans', level: 'lisans', score: 69.80, dept: 'Hemşirelik', icon: '🏥', desc: 'Sağlık Bakanlığı hastane ve merkez alımları için' },
                  { title: 'Tıbbi Sekreter Ön Lisans', level: 'onlisans', score: 74.50, dept: 'Tıbbi Dokümantasyon ve Sekreterlik', icon: '📋', desc: 'Sağlık tesisleri sekreterlik kadroları için' },
                  { title: 'Büro Yönetimi Ön Lisans', level: 'onlisans', score: 72.80, dept: 'Büro Yönetimi ve Yönetici Asistanlığı', icon: '🗂️', desc: 'Üniversite ve bakanlık büro personeli için' },
                  { title: 'Ortaöğretim / Lise Adayı', level: 'lise', score: 85.50, dept: 'Tümü', icon: '🎓', desc: 'Zabıt katipliği, şoför ve destek personeli alımları için' }
                ].map((tmpl, idx) => (
                  <div 
                    key={idx}
                    style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.1rem', cursor: 'pointer', transition: 'var(--transition)' }}
                    onClick={() => {
                      onApplyParsedProfile({
                        score: tmpl.score,
                        educationLevel: tmpl.level,
                        department: tmpl.dept
                      });
                      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
                      onClose();
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{tmpl.icon}</span>
                      <div>
                        <strong style={{ fontSize: '0.95rem' }}>{tmpl.title}</strong>
                        <div style={{ fontSize: '0.775rem', color: 'var(--primary)', fontWeight: 700 }}>
                          KPSS: {tmpl.score.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.785rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {tmpl.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'edevlet_info' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'var(--bg-surface-subtle)', padding: '1.1rem', borderRadius: 'var(--radius-md)' }}>
                <ShieldCheck size={28} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.35rem' }}>
                    Resmi e-Devlet ve KVKK Güvenlik Standartları
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Türkiye Cumhuriyeti <strong>e-Devlet Kapısı</strong> ve <strong>Kariyer Kapısı (CBİKO)</strong> sistemleri, vatandaşların kimlik ve mezuniyet bilgilerini yalnızca resmi devlet kurumlarıyla paylaşır. Yasal olarak üçüncü taraf bağımsız hiçbir web sitesinin vatandaşın e-Devlet şifresini veya doğrudan API verisini yetkisiz çekmesine izin verilmez (ve verilmemelidir).
                  </p>
                </div>
              </div>

              <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.1rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileCheck size={18} style={{ color: 'var(--primary)' }} />
                  KamuAsistan Bu Süreci Nasıl Kolaylaştırıyor?
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>
                    <strong>Belge Metni Okuyucu:</strong> ÖSYM sonuç ekranınızdaki metni doğrudan yapıştırdığınızda sistem, puanınızı ve bölümünüzü 1 saniyede otomatik okur.
                  </li>
                  <li>
                    <strong>Gizlilik Garantisi:</strong> Yüklediğiniz veya yapıştırdığınız hiçbir veri uzak bir sunucuya gönderilmez. Tüm ayrıştırma işlemleri yalnızca kendi tarayıcınızda (istemci tarafında) çalışır.
                  </li>
                  <li>
                    <strong>Kalıcı Tarayıcı Hafızası:</strong> Bilgileriniz bir kez tespit edildikten sonra bilgisayarınızın yerel belleğinde saklanır. Sayfayı ne zaman açarsanız açın sizi hatırlar.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            İptal
          </button>

          {activeSubTab === 'doc_parser' && parsedData && (
            <button className="btn-primary" onClick={handleApply}>
              <CheckCircle2 size={16} />
              <span>Ayrıştırılan Bilgileri Profilime Yükle</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
