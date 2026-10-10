import React from 'react';
import { ExternalLink, CheckCircle2, Filter, Building2, ShieldCheck } from 'lucide-react';
import { PORTAL_SOURCES } from '../data/portalSources';

export default function PortalShowcase({ 
  selectedSource, 
  setSelectedSource, 
  jobPostings 
}) {
  return (
    <div className="portals-banner-wrapper" style={{ marginTop: '1.75rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', letterSpacing: '-0.02em' }}>
            <Building2 size={18} style={{ color: 'var(--primary)' }} />
            <span>Resmi Kamu İlan Kaynakları</span>
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
            Kamu personel alımları 4 resmi otoriteden anlık derlenir. Kaynağa göre filtreleyebilir veya doğrudan resmi portallara geçebilirsiniz.
          </p>
        </div>

        {selectedSource && (
          <button 
            className="btn-secondary"
            onClick={() => setSelectedSource(null)}
            style={{ fontSize: '0.785rem', padding: '0.35rem 0.75rem' }}
          >
            Filtreyi Temizle (Tüm Kaynaklar)
          </button>
        )}
      </div>

      <div className="portals-banner-grid">
        {PORTAL_SOURCES.map((portal) => {
          const isSelected = selectedSource === portal.id;
          const count = jobPostings.filter(job => job.sourceId === portal.id).length;

          return (
            <div 
              key={portal.id} 
              className={`portal-card ${isSelected ? 'active-portal-filter' : ''}`}
            >
              <div>
                <div className="portal-header">
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="portal-name">{portal.shortName}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      {portal.authority}
                    </span>
                  </div>
                  <span className={`badge badge-${portal.tagColor}`}>
                    {portal.badge}
                  </span>
                </div>

                <p className="portal-desc">{portal.description}</p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                  <span className="live-dot-mini"></span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {count} Aktif İlan
                  </span>
                </div>
              </div>

              <div className="portal-actions">
                <button
                  className={`portal-filter-toggle ${isSelected ? 'badge-navy' : ''}`}
                  onClick={() => setSelectedSource(isSelected ? null : portal.id)}
                  title="Sadece bu portaldan gelen ilanları göster"
                >
                  <Filter size={13} style={{ display: 'inline', marginRight: '4px' }} />
                  {isSelected ? 'Seçildi' : 'Filtrele'}
                </button>

                <a 
                  href={portal.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="portal-link"
                  title={`${portal.name} resmi sayfasına git`}
                >
                  <span>Resmi Site</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
