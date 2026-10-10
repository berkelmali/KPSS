import React from 'react';
import { 
  Compass, 
  Briefcase, 
  Target, 
  Bookmark, 
  BookOpen, 
  Calculator, 
  Sun, 
  Moon
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  basketCount, 
  theme, 
  toggleTheme,
  openBasketModal 
}) {
  return (
    <nav className="navbar">
      <div className="container nav-container">
        {/* Brand */}
        <div className="brand-logo" onClick={() => setActiveTab('postings')} style={{ cursor: 'pointer' }} role="button" tabIndex={0}>
          <div className="brand-icon">
            <Compass size={22} strokeWidth={2.2} />
          </div>
          <div className="brand-text-col">
            <div className="brand-title-row">
              <span className="brand-name">KamuAsistan</span>
              <span className="brand-badge">KPSS 2026</span>
            </div>
            <span className="brand-subtitle">T.C. Kamu İlan & Tercih Rehberi</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-links">
          <button 
            className={`nav-btn ${activeTab === 'postings' ? 'active' : ''}`}
            onClick={() => setActiveTab('postings')}
          >
            <Briefcase size={16} />
            <span>İlan Havuzu</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'matcher' ? 'active' : ''}`}
            onClick={() => setActiveTab('matcher')}
          >
            <Target size={16} />
            <span>Tercih Robotu & Analiz</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'codes' ? 'active' : ''}`}
            onClick={() => setActiveTab('codes')}
          >
            <BookOpen size={16} />
            <span>Nitelik Kodları</span>
          </button>

          <button 
            className={`nav-btn ${activeTab === 'calculator' ? 'active' : ''}`}
            onClick={() => setActiveTab('calculator')}
          >
            <Calculator size={16} />
            <span>Puan Hesapla</span>
          </button>
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <button 
            className="basket-nav-btn"
            onClick={openBasketModal}
            title="Tercih Sepetimi Aç"
          >
            <Bookmark size={18} />
            <span>Tercih Sepetim</span>
            {basketCount > 0 && (
              <span className="basket-count-badge">{basketCount}</span>
            )}
          </button>

          <button 
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
