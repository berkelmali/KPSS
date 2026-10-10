import React from 'react';
import { 
  Search, 
  X, 
  Building2, 
  Users, 
  Calendar, 
  Award,
  GraduationCap,
  BookOpen,
  Globe,
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function HeroSection({ 
  searchQuery, 
  setSearchQuery, 
  totalPostings, 
  totalQuota,
  onOpenAutoModal,
  educationTier,
  setEducationTier,
  universityCount,
  liseCount
}) {
  const quickTags = [
    'Zabıt Katibi',
    'Hemşire & Sağlık',
    'Gelir Uzmanlığı (GUY)',
    'Bilgisayar Mühendisliği',
    '4001 Kadroları',
    'Büro Personeli',
    'POMEM Polis',
    'Ankara'
  ];

  return (
    <section className="hero-section">
      <div className="container hero-content">
        {/* Top Badges / Official Sync Status */}
        <div className="hero-top-bar">
          <div className="hero-status-pill">
            <span className="live-status-dot"></span>
            <span>T.C. SBB • Kariyer Kapısı • Memurlar.net • Resmi Gazete Doğrulamalı</span>
          </div>

          <button 
            className="btn-hero-doc"
            onClick={onOpenAutoModal}
            title="ÖSYM Sonuç Belgesi veya e-Devlet ile bilgilerinizi anında doldurun"
          >
            <FileText size={15} />
            <span>ÖSYM Sonuç Belgesiyle Hızlı Doldur</span>
          </button>
        </div>

        {/* Human, Authoritative Editorial Title */}
        <h1 className="hero-title">
          Kamu Personel Alımları & <span className="hero-title-accent">KPSS Tercih Rehberi</span>
        </h1>

        <p className="hero-subtitle">
          Tüm resmi kamu kadrolarını tek çatı altında toplayan, KPSS puan türünüze (P3, P93, P94) ve nitelik kodlarınıza göre en uygun alımları anında tespit eden bağımsız tercih asistanı.
        </p>

        {/* PROMINENT EDUCATION TIER SEPARATION: Üniversite KPSS vs Lise KPSS */}
        <div className="education-tier-container">
          <div className="education-tier-grid">
            <button
              className={`tier-card-btn ${educationTier === 'university' ? 'active university-active' : ''}`}
              onClick={() => setEducationTier(educationTier === 'university' ? 'all' : 'university')}
              title="Sadece Lisans ve Ön Lisans KPSS alımlarını göster"
            >
              <div className="tier-icon-wrapper uni-icon">
                <GraduationCap size={22} strokeWidth={2.2} />
              </div>
              <div className="tier-content">
                <div className="tier-title-row">
                  <span className="tier-main-title">Üniversite KPSS</span>
                  <span className="tier-count-badge uni-badge">{universityCount || 84} İlan</span>
                </div>
                <p className="tier-desc">Lisans (P3) & Ön Lisans (P93) Kadroları</p>
              </div>
            </button>

            <button
              className={`tier-card-btn ${educationTier === 'lise' ? 'active lise-active' : ''}`}
              onClick={() => setEducationTier(educationTier === 'lise' ? 'all' : 'lise')}
              title="Sadece Lise / Ortaöğretim mezunlarına açık alımları göster"
            >
              <div className="tier-icon-wrapper lise-icon">
                <BookOpen size={22} strokeWidth={2.2} />
              </div>
              <div className="tier-content">
                <div className="tier-title-row">
                  <span className="tier-main-title">Lise KPSS</span>
                  <span className="tier-count-badge lise-badge">{liseCount || 28} İlan</span>
                </div>
                <p className="tier-desc">Ortaöğretim (P94) Düz Lise, Meslek & İHL</p>
              </div>
            </button>

            <button
              className={`tier-card-btn ${educationTier === 'all' ? 'active all-active' : ''}`}
              onClick={() => setEducationTier('all')}
              title="Tüm mezuniyet düzeylerini birleşik göster"
            >
              <div className="tier-icon-wrapper all-icon">
                <Globe size={22} strokeWidth={2.2} />
              </div>
              <div className="tier-content">
                <div className="tier-title-row">
                  <span className="tier-main-title">Tüm KPSS Alımları</span>
                  <span className="tier-count-badge all-badge">{totalPostings} İlan</span>
                </div>
                <p className="tier-desc">Genel Havuz (Üniversite + Lise)</p>
              </div>
            </button>
          </div>
        </div>

        {/* Big Search Bar */}
        <div className="main-search-box">
          <Search size={20} className="search-icon" />
          <input 
            type="text"
            className="main-search-input"
            placeholder="Pozisyon, kurum, unvan, il veya nitelik kodu ara (Örn: Zabıt Katibi, Adalet, 4001, Hemşire)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button 
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              title="Aramayı Temizle"
            >
              <X size={16} />
            </button>
          )}
          <button className="search-submit-btn">
            <span>İlan Ara</span>
          </button>
        </div>

        {/* Quick Tag Recommendations */}
        <div className="popular-tags-wrapper">
          <span className="popular-tags-label">Popüler Aramalar:</span>
          <div className="popular-tags-list">
            {quickTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`quick-tag-btn ${searchQuery === tag ? 'active' : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Live Counters */}
        <div className="hero-stats-grid">
          <div className="hero-stat-card">
            <div className="hero-stat-icon-tile stat-icon-blue">
              <Building2 size={20} />
            </div>
            <div className="hero-stat-text">
              <div className="hero-stat-number">{totalPostings} Aktif</div>
              <div className="hero-stat-label">Kamu İlanı</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon-tile stat-icon-green">
              <Users size={20} />
            </div>
            <div className="hero-stat-text">
              <div className="hero-stat-number">{totalQuota.toLocaleString('tr-TR')}</div>
              <div className="hero-stat-label">Kadro Kontenjanı</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon-tile stat-icon-purple">
              <Award size={20} />
            </div>
            <div className="hero-stat-text">
              <div className="hero-stat-number">4 Portal</div>
              <div className="hero-stat-label">Resmi Havuz</div>
            </div>
          </div>

          <div className="hero-stat-card">
            <div className="hero-stat-icon-tile stat-icon-amber">
              <Calendar size={20} />
            </div>
            <div className="hero-stat-text">
              <div className="hero-stat-number">Geri Sayım</div>
              <div className="hero-stat-label">Son Başvuru Takibi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
