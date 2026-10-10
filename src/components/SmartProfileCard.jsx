import React from 'react';
import { UserCheck, Sliders, FileText, RefreshCw, CheckCircle, ShieldAlert } from 'lucide-react';
import { EDUCATION_LEVELS, POPULAR_DEPARTMENTS, POPULAR_CITIES } from '../data/jobPostings';

export default function SmartProfileCard({ 
  userProfile, 
  setUserProfile, 
  matchingCount, 
  totalCount,
  onReset,
  onOpenAutoModal
}) {
  const handleCheckboxChange = (field) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <div className="profile-matcher-card">
      <div className="profile-card-header">
        <div className="profile-card-title">
          <Sliders size={18} className="profile-title-icon" />
          <span>KPSS Aday Profilim</span>
        </div>
        <span className="badge badge-primary">Filtreleme</span>
      </div>

      <button
        className="btn-profile-auto"
        onClick={onOpenAutoModal}
        title="ÖSYM Sonuç Belgesi veya e-Devlet ile bilgilerinizi otomatik yükleyin"
      >
        <FileText size={16} />
        <span>ÖSYM Belgesiyle Otomatik Doldur</span>
      </button>

      <p className="profile-helper-text">
        Puanınızı ve şartlarınızı girerek kadrolara olan uygunluk analizinizi anında görün:
      </p>

      {/* Eğitim Düzeyi */}
      <div className="form-group">
        <label className="form-label">Öğrenim Durumu (Mezuniyet)</label>
        <select 
          className="form-select"
          value={userProfile.educationLevel}
          onChange={(e) => setUserProfile({ ...userProfile, educationLevel: e.target.value })}
        >
          {EDUCATION_LEVELS.map(level => (
            <option key={level.id} value={level.id}>{level.label}</option>
          ))}
        </select>
      </div>

      {/* Bölüm / Alan */}
      <div className="form-group">
        <label className="form-label">Mezun Olunan Bölüm / Alan</label>
        <select 
          className="form-select"
          value={userProfile.department}
          onChange={(e) => setUserProfile({ ...userProfile, department: e.target.value })}
        >
          {POPULAR_DEPARTMENTS.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* KPSS Puanı */}
      <div className="form-group">
        <div className="score-display-row">
          <label className="form-label" style={{ marginBottom: 0 }}>KPSS Puanınız</label>
          <div className="score-badge-large">{Number(userProfile.score).toFixed(2)}</div>
        </div>
        <input 
          type="range"
          min="50"
          max="100"
          step="0.25"
          value={userProfile.score}
          onChange={(e) => setUserProfile({ ...userProfile, score: parseFloat(e.target.value) })}
          style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '0.5rem', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <span>50.00</span>
          <span>75.00</span>
          <span>100.00</span>
        </div>
      </div>

      {/* Şehir Tercihi */}
      <div className="form-group">
        <label className="form-label">Çalışmak İstediğiniz İl</label>
        <select 
          className="form-select"
          value={userProfile.city}
          onChange={(e) => setUserProfile({ ...userProfile, city: e.target.value })}
        >
          {POPULAR_CITIES.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Sertifikalar & Özel Durumlar */}
      <div className="form-group">
        <label className="form-label">Özel Şartlar & Nitelik Belgeleri</label>
        <div className="checkbox-group">
          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.hasComputerCert}
              onChange={() => handleCheckboxChange('hasComputerCert')}
            />
            <span>💻 6225 Bilgisayar Sertifikası / Transkript</span>
          </label>

          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.hasDrivingLicenseB}
              onChange={() => handleCheckboxChange('hasDrivingLicenseB')}
            />
            <span>🚗 6506 B Sınıfı Ehliyet</span>
          </label>

          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.hasDrivingLicenseC}
              onChange={() => handleCheckboxChange('hasDrivingLicenseC')}
            />
            <span>🚚 6511 C / Ağır Vasıta Ehliyeti</span>
          </label>

          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.hasLanguageYDS}
              onChange={() => handleCheckboxChange('hasLanguageYDS')}
            />
            <span>🌐 7101 YDS İngilizce (En Az 70 / C)</span>
          </label>

          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.isUnder35}
              onChange={() => handleCheckboxChange('isUnder35')}
            />
            <span>🎂 7322 Yaş Şartı (35 Yaşını Doldurmadım)</span>
          </label>

          <label className="custom-checkbox">
            <input 
              type="checkbox" 
              checked={userProfile.canShiftWork}
              onChange={() => handleCheckboxChange('canShiftWork')}
            />
            <span>⏱️ 7300 Vardiyalı / Nöbetli Çalışabilirim</span>
          </label>
        </div>
      </div>

      {/* Sadece Uygun İlanlar Anahtarı */}
      <div style={{ background: 'var(--bg-surface-subtle)', padding: '0.75rem', borderRadius: 'var(--radius-md)', margin: '1rem 0' }}>
        <label className="custom-checkbox" style={{ fontWeight: 600 }}>
          <input 
            type="checkbox" 
            checked={userProfile.onlyEligible}
            onChange={() => handleCheckboxChange('onlyEligible')}
          />
          <span style={{ color: userProfile.onlyEligible ? 'var(--primary)' : 'inherit' }}>
            Yalnızca Puanımın Yettiği İlanları Göster
          </span>
        </label>
      </div>

      {/* Eşleşme İstatistiği */}
      <div style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)' }}>
        <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>Profilinize Uyan İlan Sayısı</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
          {matchingCount} / {totalCount} İlan
        </div>
      </div>

      <button className="profile-reset-btn" onClick={onReset}>
        <RefreshCw size={13} style={{ display: 'inline', marginRight: '5px' }} />
        Filtreleri Sıfırla
      </button>
    </div>
  );
}
