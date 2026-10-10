import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle, 
  Bookmark, 
  BookmarkCheck, 
  Calendar, 
  Building2, 
  MapPin, 
  FileText, 
  Award, 
  Share2, 
  Check, 
  Info 
} from 'lucide-react';
import { QUALIFICATION_CODES } from '../data/qualificationCodes';

export default function JobDetailModal({ 
  job, 
  onClose, 
  isInBasket, 
  onToggleBasket 
}) {
  const [copied, setCopied] = useState(false);

  if (!job) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(
      `📌 ${job.title}\n🏛️ ${job.institution}\n👥 Kontenjan: ${job.quota}\n🎯 Taban Puan: ${job.minScore}\n⏳ Son Başvuru: ${job.deadline}\n🔗 Kaynak: ${job.sourceUrl}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Find info about qualification codes
  const codeDetails = job.qualificationCodes.map(c => {
    const found = QUALIFICATION_CODES.find(q => q.code === c);
    return found || { code: c, title: 'Özel nitelik kodu', tips: 'Kılavuzu inceleyiniz.' };
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center' }}>
              {job.logoImage ? (
                <img 
                  src={job.logoImage} 
                  alt={job.institution} 
                  style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '8px' }}
                  onError={(e) => { e.target.style.display = 'none'; }} 
                />
              ) : (
                job.logo
              )}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {job.institution} • {job.contractType}
                </span>
                {job.isLive && (
                  <span className="badge badge-live-pulse" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                    <span className="live-dot-mini"></span>
                    CANLI RESMİ İLAN
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3 }}>
                {job.title}
              </h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            style={{ color: 'var(--text-muted)', padding: '0.4rem', borderRadius: 'var(--radius-sm)' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Toplam Kontenjan</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{job.quota.toLocaleString('tr-TR')} Kişi</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Asgari KPSS</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>
                {job.minScore.toFixed(2)} ({job.kpssScoreTypes.join(', ')})
              </div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Eğitim Düzeyi</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{job.educationLevel}</div>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Son Başvuru Tarihi</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--danger)' }}>{job.deadline}</div>
            </div>
          </div>

          {/* İlan Açıklaması */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileText size={16} style={{ color: 'var(--primary)' }} />
              İlan Hakkında Genel Bilgi
            </h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {job.description}
            </p>
          </div>

          {/* Başvuru Şartları */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle size={16} style={{ color: 'var(--success)' }} />
              Adaylarda Aranan Temel ve Özel Şartlar
            </h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
              {job.specialConditions.map((cond, idx) => (
                <li key={idx} style={{ color: 'var(--text-main)' }}>{cond}</li>
              ))}
            </ul>
          </div>

          {/* İlanda Geçen Nitelik Kodları */}
          <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Award size={16} style={{ color: 'var(--purple)' }} />
              İlanın Belirttiği Nitelik Kodları & Anlamları
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {codeDetails.map(cd => (
                <div key={cd.code} style={{ background: 'var(--bg-surface)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                    <span className="badge badge-primary">#{cd.code}</span>
                    <strong style={{ fontSize: '0.85rem' }}>{cd.title}</strong>
                  </div>
                  {cd.tips && (
                    <div style={{ fontSize: '0.785rem', color: 'var(--text-muted)' }}>
                      💡 İpucu: {cd.tips}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Başvuru Yolu & 4 Portal Bağlantıları */}
          <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Nasıl Başvuru Yapılır?
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              {job.applicationMethod}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a 
                href={job.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ fontSize: '0.85rem' }}
              >
                <span>{job.sourceName} Üzerinden Başvur</span>
                <ExternalLink size={14} />
              </a>

              {job.alternateUrl && (
                <a 
                  href={job.alternateUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  <span>Kılavuzu Memurlar.net'te İncele</span>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleShare}>
            {copied ? <Check size={15} style={{ color: 'var(--success)' }} /> : <Share2 size={15} />}
            <span>{copied ? 'Kopyalandı!' : 'İlanı Paylaş'}</span>
          </button>

          <button 
            className={isInBasket ? 'btn-danger-outline' : 'btn-primary'}
            onClick={() => onToggleBasket(job)}
          >
            {isInBasket ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            <span>{isInBasket ? 'Tercihlerimden Kaldır' : 'Tercih Listeme Ekle'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
