import React from 'react';
import { ExternalLink, Compass, Shield, Heart } from 'lucide-react';
import { PORTAL_SOURCES } from '../data/portalSources';

export default function Footer({ onOpenTab }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '0.85rem' }}>
              <div className="brand-icon" style={{ width: '36px', height: '36px' }}>
                <Compass size={20} />
              </div>
              <span>KamuAsistan</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '380px', marginBottom: '1rem' }}>
              Kamu personeli alımlarını, sözleşmeli ve kadrolu ilanları tek bir akıllı arama platformunda birleştiren aday destek rehberi.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <Shield size={14} style={{ color: 'var(--success)' }} />
              <span>Resmi platform verileriyle senkronize açık kaynak proje</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>Hızlı Menü</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>
                <button onClick={() => onOpenTab('postings')} style={{ color: 'inherit' }}>
                  Tüm Kamu İlanları
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTab('matcher')} style={{ color: 'inherit' }}>
                  Akıllı Tercih Robotu
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTab('codes')} style={{ color: 'inherit' }}>
                  ÖSYM Nitelik Kodları (4001, 3001)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenTab('calculator')} style={{ color: 'inherit' }}>
                  KPSS Puan Hesaplama
                </button>
              </li>
            </ul>
          </div>

          {/* Official portals */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>Resmi Kaynaklar</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {PORTAL_SOURCES.map(source => (
                <li key={source.id}>
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--primary)' }}
                  >
                    <span>{source.name}</span>
                    <ExternalLink size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 KamuAsistan. Tüm resmi başvuru işlemleri ilgili kurumların resmi sistemleri üzerinden gerçekleştirilir.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Kamu adayları için özenle tasarlandı</span>
            <Heart size={14} style={{ color: 'var(--danger)' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
