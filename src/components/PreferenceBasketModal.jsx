import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Printer, 
  Copy, 
  Check, 
  Bookmark, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';

export default function PreferenceBasketModal({ 
  basket, 
  setBasket, 
  onClose, 
  userScore 
}) {
  const [copied, setCopied] = useState(false);

  const moveUp = (index) => {
    if (index === 0) return;
    const newBasket = [...basket];
    const temp = newBasket[index];
    newBasket[index] = newBasket[index - 1];
    newBasket[index - 1] = temp;
    setBasket(newBasket);
  };

  const moveDown = (index) => {
    if (index === basket.length - 1) return;
    const newBasket = [...basket];
    const temp = newBasket[index];
    newBasket[index] = newBasket[index + 1];
    newBasket[index + 1] = temp;
    setBasket(newBasket);
  };

  const removeItem = (id) => {
    setBasket(basket.filter(item => item.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('Tüm tercih listenizi temizlemek istediğinize emin misiniz?')) {
      setBasket([]);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    if (basket.length === 0) return;
    
    // Confetti celebration!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const lines = basket.map((item, idx) => 
      `${idx + 1}. [${item.institution}] ${item.title} (Taban: ${item.minScore} | Kontenjan: ${item.quota})`
    ).join('\n');

    const summary = `📋 KPSS 2026 TERCİH LİSTEM:\nKPSS Puanım: ${userScore.toFixed(2)}\nToplam Kadro: ${totalQuota}\n\n${lines}\n\nKamuAsistan Tercih Robotu ile hazırlandı.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Calculations
  const totalQuota = basket.reduce((acc, curr) => acc + curr.quota, 0);
  const avgMinScore = basket.length > 0 
    ? (basket.reduce((acc, curr) => acc + curr.minScore, 0) / basket.length).toFixed(2)
    : 0;

  // Analysis
  const getStrategyAdvice = () => {
    if (basket.length === 0) return null;
    const higherThanScore = basket.filter(i => i.minScore > userScore).length;
    const lowerThanScore = basket.filter(i => i.minScore <= userScore).length;

    if (higherThanScore === 0) {
      return {
        type: 'safe',
        icon: <CheckCircle2 size={16} />,
        title: 'Yüksek İhtimal & Güvenli Tercihler',
        desc: 'Listedeki tüm kadroların taban puanı mevcut KPSS puanınızın altında yer alıyor. Atanma şansınız yüksek!'
      };
    } else if (lowerThanScore === 0) {
      return {
        type: 'risk',
        icon: <AlertTriangle size={16} />,
        title: 'Yüksek Riskli Tercih Listesi',
        desc: 'Listedeki tüm kadroların taban puanı mevcut puanınızdan yüksek. Listenize taban puanı daha düşük garanti kurumlar eklemenizi öneririz.'
      };
    } else {
      return {
        type: 'balanced',
        icon: <CheckCircle2 size={16} />,
        title: 'Dengeli & İdeal Tercih Dağılımı',
        desc: `Listenizde ${higherThanScore} adet hayal/hedef tercih ve ${lowerThanScore} adet puanınızın yettiği tercih bulunuyor. Başarılı bir strateji!`
      };
    }
  };

  const advice = getStrategyAdvice();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '880px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
              <Bookmark size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>KPSS Tercih Listem & Sıralama Robotu</h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Listenizdeki kadroları öncelik sıranıza göre yukarı/aşağı taşıyabilirsiniz.
              </div>
            </div>
          </div>

          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {basket.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3 className="empty-title">Tercih Listeniz Henüz Boş</h3>
              <p className="empty-desc">
                İlan havuzundaki kadroları inceleyip "Tercih Sepetime Ekle" butonuna basarak kendi listenizi oluşturabilirsiniz.
              </p>
              <button className="btn-primary" onClick={onClose}>
                İlanları İncele
              </button>
            </div>
          ) : (
            <>
              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toplam Tercih</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{basket.length} Kadro</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hedef Kontenjan</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--success)' }}>
                    {totalQuota.toLocaleString('tr-TR')} Kişi
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Ortalama Taban Puan</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {avgMinScore}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sizin Puanınız</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                    {userScore.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Strategy Advice Banner */}
              {advice && (
                <div style={{ 
                  background: advice.type === 'risk' ? 'var(--danger-light)' : advice.type === 'safe' ? 'var(--success-light)' : 'var(--primary-light)',
                  border: `1px solid ${advice.type === 'risk' ? 'var(--danger)' : advice.type === 'safe' ? 'var(--success)' : 'var(--primary)'}`,
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.65rem'
                }}>
                  <div style={{ color: advice.type === 'risk' ? 'var(--danger)' : advice.type === 'safe' ? 'var(--success)' : 'var(--primary)', marginTop: '2px' }}>
                    {advice.icon}
                  </div>
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>{advice.title}</strong>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      {advice.desc}
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {basket.map((item, index) => (
                  <div key={item.id} className="basket-item">
                    <div className="basket-rank-badge">
                      {index + 1}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {item.institution} • {item.contractType}
                      </div>
                      <h4 style={{ fontSize: '0.975rem', fontWeight: 700, color: 'var(--text-main)' }}>
                        {item.title}
                      </h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem', fontSize: '0.775rem' }}>
                        <span className="badge badge-subtle">Kontenjan: {item.quota}</span>
                        <span className="badge badge-subtle">Taban Puan: {item.minScore}</span>
                        <span className="badge badge-subtle">Son Gün: {item.deadline}</span>
                      </div>
                    </div>

                    {/* Up / Down Controls */}
                    <div className="basket-reorder-actions">
                      <button 
                        className="reorder-btn"
                        onClick={() => moveUp(index)}
                        disabled={index === 0}
                        title="Yukarı Taşı"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button 
                        className="reorder-btn"
                        onClick={() => moveDown(index)}
                        disabled={index === basket.length - 1}
                        title="Aşağı Taşı"
                      >
                        <ArrowDown size={16} />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      style={{ color: 'var(--danger)', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                      title="Listeden Kaldır"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {basket.length > 0 && (
          <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
            <button className="btn-secondary" onClick={clearAll} style={{ color: 'var(--danger)' }}>
              <Trash2 size={15} />
              <span>Tümünü Temizle</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <button className="btn-secondary" onClick={handlePrint}>
                <Printer size={15} />
                <span>Yazdır / PDF</span>
              </button>

              <button className="btn-primary" onClick={handleCopySummary}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? 'Kopyalandı!' : 'WhatsApp / Metin Olarak Kopyala'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
