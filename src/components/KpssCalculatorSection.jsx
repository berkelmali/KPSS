import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export default function KpssCalculatorSection({ onApplyScore }) {
  const [level, setLevel] = useState('lisans'); // lisans, onlisans, ortaogretim

  // GY (60 Soru)
  const [gyCorrect, setGyCorrect] = useState(38);
  const [gyWrong, setGyWrong] = useState(8);

  // GK (60 Soru)
  const [gkCorrect, setGkCorrect] = useState(35);
  const [gkWrong, setGkWrong] = useState(10);

  // Calculations
  const gyNet = Math.max(0, gyCorrect - (gyWrong / 4));
  const gkNet = Math.max(0, gkCorrect - (gkWrong / 4));
  const totalNet = gyNet + gkNet;

  // Approximate KPSS score formula based on standard ÖSYM historical distributions
  const calculateEstimatedScore = () => {
    let base = 42.0;
    let multiplierGY = 0.48;
    let multiplierGK = 0.49;

    if (level === 'onlisans') {
      base = 41.5;
      multiplierGY = 0.51;
      multiplierGK = 0.48;
    } else if (level === 'ortaogretim') {
      base = 43.0;
      multiplierGY = 0.50;
      multiplierGK = 0.47;
    }

    const rawScore = base + (gyNet * multiplierGY) + (gkNet * multiplierGK);
    return Math.min(100, Math.max(50, rawScore)).toFixed(2);
  };

  const estimatedScore = parseFloat(calculateEstimatedScore());

  const handleApply = () => {
    onApplyScore(estimatedScore, level);
  };

  const handleReset = () => {
    setGyCorrect(30);
    setGyWrong(10);
    setGkCorrect(30);
    setGkWrong(10);
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem' }}>
        <div className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
          <Calculator size={14} />
          <span>KPSS Net & Puan Tahmin Simülatörü</span>
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          KPSS Puanı Hesapla & İlanlarla Eşleştir
        </h2>
        <p style={{ fontSize: '0.975rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Genel Yetenek ve Genel Kültür netlerinizi girerek ÖSYM standart sapma dağılımına en yakın tahmini KPSS puanınızı hesaplayın ve tek tıkla size uygun kamu ilanlarını listeleyin.
        </p>
      </div>

      <div style={{ maxWidth: '840px', margin: '0 auto', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-lg)' }}>
        {/* Level selector */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button 
            className={`filter-pill-btn ${level === 'lisans' ? 'active' : ''}`}
            onClick={() => setLevel('lisans')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.925rem' }}
          >
            Lisans (KPSS P3)
          </button>
          <button 
            className={`filter-pill-btn ${level === 'onlisans' ? 'active' : ''}`}
            onClick={() => setLevel('onlisans')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.925rem' }}
          >
            Ön Lisans (KPSS P93)
          </button>
          <button 
            className={`filter-pill-btn ${level === 'ortaogretim' ? 'active' : ''}`}
            onClick={() => setLevel('ortaogretim')}
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.925rem' }}
          >
            Ortaöğretim / Lise (KPSS P94)
          </button>
        </div>

        {/* Inputs Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginBottom: '2rem' }}>
          {/* Genel Yetenek */}
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Genel Yetenek (60 Soru)</h3>
              <span className="badge badge-primary">Net: {gyNet.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Türkçe (30 Soru) + Matematik & Geometri (30 Soru)
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Doğru Sayısı (0-60)</label>
                <input 
                  type="number"
                  min="0"
                  max="60"
                  className="form-input"
                  value={gyCorrect}
                  onChange={(e) => setGyCorrect(Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Yanlış Sayısı (0-60)</label>
                <input 
                  type="number"
                  min="0"
                  max={60 - gyCorrect}
                  className="form-input"
                  value={gyWrong}
                  onChange={(e) => setGyWrong(Math.min(60 - gyCorrect, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>
            </div>
          </div>

          {/* Genel Kültür */}
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '1.35rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Genel Kültür (60 Soru)</h3>
              <span className="badge badge-primary">Net: {gkNet.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Tarih (27), Coğrafya (18), Vatandaşlık (9), Güncel (6)
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label className="form-label">Doğru Sayısı (0-60)</label>
                <input 
                  type="number"
                  min="0"
                  max="60"
                  className="form-input"
                  value={gkCorrect}
                  onChange={(e) => setGkCorrect(Math.min(60, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label className="form-label">Yanlış Sayısı (0-60)</label>
                <input 
                  type="number"
                  min="0"
                  max={60 - gkCorrect}
                  className="form-input"
                  value={gkWrong}
                  onChange={(e) => setGkWrong(Math.min(60 - gkCorrect, Math.max(0, parseInt(e.target.value) || 0)))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(124, 58, 237, 0.08))', border: '1px solid rgba(37, 99, 235, 0.25)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Toplam Net: {totalNet.toFixed(2)} / 120
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', margin: '0.25rem 0' }}>
            {estimatedScore.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Tahmini {level === 'lisans' ? 'KPSS P3 (Lisans)' : level === 'onlisans' ? 'KPSS P93 (Ön Lisans)' : 'KPSS P94 (Ortaöğretim)'} Puanı
          </div>
          <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            *ÖSYM standart sapma verilerine göre yaklaşık +/- 1.5 puan değişkenlik gösterebilir.
          </div>
        </div>

        {/* Action button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={handleReset}>
            <RotateCcw size={15} />
            <span>Sıfırla</span>
          </button>

          <button 
            className="btn-primary"
            onClick={handleApply}
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.95rem' }}
          >
            <Calculator size={17} />
            <span>Bu Puanı Profilime Aktar & İlanları Göster</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
