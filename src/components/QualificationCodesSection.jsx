import React, { useState } from 'react';
import { Search, BookOpen, ExternalLink, Lightbulb, CheckCircle2 } from 'lucide-react';
import { QUALIFICATION_CODES } from '../data/qualificationCodes';

export default function QualificationCodesSection({ onFilterByCode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');

  const filteredCodes = QUALIFICATION_CODES.filter(item => {
    const matchesSearch = 
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDegree = degreeFilter === 'all' || item.degree.toLowerCase().includes(degreeFilter.toLowerCase());

    return matchesSearch && matchesDegree;
  });

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Title & Info Banner */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2.5rem' }}>
        <div className="badge badge-purple" style={{ marginBottom: '0.85rem' }}>
          <BookOpen size={14} />
          <span>KPSS & Kamu İlan Rehberi</span>
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          ÖSYM Nitelik Kodları Sözlüğü
        </h2>
        <p style={{ fontSize: '0.975rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Kamu ilanlarında aranan mezuniyet şartları ve özel belgeler (sertifika, ehliyet, yabancı dil) 4 haneli nitelik kodlarıyla ifade edilir. Yanlış kod tercihi yerleşseniz dahi atamanızın iptaline yol açabilir.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1, minWidth: '260px' }}>
          <Search size={18} style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text"
            className="form-input"
            placeholder="Nitelik kodu veya kelime ara (Örn: 4001, 3001, bilgisayar, ehliyet, hukuk)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            className={`filter-pill-btn ${degreeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setDegreeFilter('all')}
          >
            Tüm Kodlar
          </button>
          <button 
            className={`filter-pill-btn ${degreeFilter === 'lisans' ? 'active' : ''}`}
            onClick={() => setDegreeFilter('lisans')}
          >
            Lisans (4 Yıllık)
          </button>
          <button 
            className={`filter-pill-btn ${degreeFilter === 'ön lisans' ? 'active' : ''}`}
            onClick={() => setDegreeFilter('ön lisans')}
          >
            Ön Lisans (2 Yıllık)
          </button>
          <button 
            className={`filter-pill-btn ${degreeFilter === 'ortaöğretim' ? 'active' : ''}`}
            onClick={() => setDegreeFilter('ortaöğretim')}
          >
            Ortaöğretim (Lise)
          </button>
          <button 
            className={`filter-pill-btn ${degreeFilter === 'özel şart' ? 'active' : ''}`}
            onClick={() => setDegreeFilter('özel şart')}
          >
            Sertifika & Ehliyet
          </button>
        </div>
      </div>

      {/* Grid of Codes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filteredCodes.map(item => (
          <div 
            key={item.code} 
            className="glass-panel"
            style={{ padding: '1.35rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.02em' }}>
                  #{item.code}
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span className="badge badge-subtle">{item.degree}</span>
                  <span className="badge badge-primary">{item.category}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                {item.description}
              </p>

              {item.tips && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'var(--bg-surface-subtle)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                  <Lightbulb size={16} style={{ color: 'var(--warning)', marginTop: '2px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
                    {item.tips}
                  </span>
                </div>
              )}
            </div>

            <button 
              className="btn-outline-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              onClick={() => onFilterByCode(item.code)}
            >
              <span>Bu Koda Sahip İlanları Göster</span>
              <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
