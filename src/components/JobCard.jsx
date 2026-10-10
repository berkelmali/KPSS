import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Bookmark, 
  BookmarkCheck, 
  ArrowRight,
  ExternalLink,
  Award
} from 'lucide-react';

export default function JobCard({ 
  job, 
  userProfile, 
  onViewDetails, 
  onToggleBasket, 
  isInBasket,
  onSelectCode 
}) {
  // Calculate match logic
  const calculateMatch = () => {
    let score = 100;
    const reasons = [];

    // 1. KPSS Score check
    const diff = userProfile.score - job.minScore;
    if (diff < 0) {
      score -= 35;
      reasons.push(`KPSS puanınız (${userProfile.score.toFixed(2)}) taban puanın (${job.minScore.toFixed(2)}) altında.`);
    } else {
      reasons.push(`KPSS puanınız taban puanı karşılıyor (+${diff.toFixed(2)} puan üstünde).`);
    }

    // 2. Education level check
    if (userProfile.educationLevel !== 'all') {
      const matchLisans = job.educationLevel.toLowerCase().includes('lisans');
      const matchOnlisans = job.educationLevel.toLowerCase().includes('ön lisans');
      const matchLise = job.educationLevel.toLowerCase().includes('ortaöğretim') || job.educationLevel.toLowerCase().includes('lise');

      if (userProfile.educationLevel === 'lisans' && !matchLisans) {
        score -= 40;
        reasons.push('İlan lisans mezuniyeti şartı içermiyor.');
      } else if (userProfile.educationLevel === 'onlisans' && !matchOnlisans) {
        score -= 40;
        reasons.push('İlan ön lisans mezuniyeti şartı içermiyor.');
      } else if (userProfile.educationLevel === 'lise' && !matchLise) {
        score -= 40;
        reasons.push('İlan ortaöğretim (lise) mezuniyeti şartı içermiyor.');
      }
    }

    // 3. Special conditions check
    if (job.qualificationCodes.includes('6225') && !userProfile.hasComputerCert) {
      score -= 15;
      reasons.push('MEB onaylı 6225 Bilgisayar Sertifikası aranıyor.');
    }
    if (job.qualificationCodes.includes('6506') && !userProfile.hasDrivingLicenseB) {
      score -= 15;
      reasons.push('6506 B Sınıfı Ehliyet aranıyor.');
    }
    if (job.qualificationCodes.includes('6511') && !userProfile.hasDrivingLicenseC) {
      score -= 20;
      reasons.push('6511 C Sınıfı Kamyon/Ağır Vasıta Ehliyeti aranıyor.');
    }
    if (job.qualificationCodes.includes('7101') && !userProfile.hasLanguageYDS) {
      score -= 20;
      reasons.push('7101 YDS İngilizce (En az C) puanı aranıyor.');
    }

    score = Math.max(0, Math.min(100, score));
    return { score, reasons, isEligible: diff >= 0 };
  };

  const { score: matchScore, reasons, isEligible } = calculateMatch();

  // Days left calculation (relative to 2026-10-09)
  const today = new Date('2026-10-09');
  const deadlineDate = new Date(job.deadline);
  const diffTime = deadlineDate - today;
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine portal color badge
  const getSourceBadgeClass = (sourceId) => {
    switch (sourceId) {
      case 'kariyer-kapisi': return 'source-badge-kariyer';
      case 'memurlar-net': return 'source-badge-memurlar';
      case 'kamuilan-sbb': return 'source-badge-sbb';
      case 'ilan-gov-tr': return 'source-badge-resmi';
      default: return 'source-badge-default';
    }
  };

  return (
    <article className={`job-card ${matchScore >= 80 ? 'match-high' : matchScore >= 60 ? 'match-mid' : 'match-low'}`}>
      {/* Top Header Row */}
      <div className="job-card-top">
        <div className="job-institution-row">
          <div className="job-logo" aria-hidden="true">
            {job.logoImage ? (
              <img 
                src={job.logoImage} 
                alt={job.institution} 
                className="job-logo-img"
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            ) : (
              <span className="job-logo-fallback">
                <Building2 size={20} strokeWidth={1.8} />
              </span>
            )}
          </div>
          <div className="job-title-col">
            <div className="job-institution-name">
              <span>{job.institution}</span>
            </div>
            <h3 className="job-title" onClick={() => onViewDetails(job)} role="button" tabIndex={0}>
              {job.title}
            </h3>
          </div>
        </div>

        <div className="job-meta-badges">
          {job.tier === 'university' && (
            <span className="badge badge-tier-uni">Üniversite (P3/P93)</span>
          )}
          {job.tier === 'lise' && (
            <span className="badge badge-tier-lise">Ortaöğretim (P94)</span>
          )}
          {job.isLive && (
            <span className="badge badge-live-official">
              <span className="live-dot-mini"></span>
              Resmi Canlı
            </span>
          )}
          <span className={`source-tag ${getSourceBadgeClass(job.sourceId)}`}>
            {job.sourceName}
          </span>
          <span className="badge badge-subtle">{job.contractType}</span>
        </div>
      </div>

      {/* 4-Item Details Grid */}
      <div className="job-details-row">
        <div className="job-detail-item">
          <div className="detail-icon-box">
            <Users size={16} />
          </div>
          <div>
            <div className="job-detail-label">Kontenjan</div>
            <strong className="job-detail-val">{job.quota.toLocaleString('tr-TR')} Kişi</strong>
          </div>
        </div>

        <div className="job-detail-item">
          <div className="detail-icon-box">
            <Award size={16} />
          </div>
          <div>
            <div className="job-detail-label">Taban Puan ({job.kpssScoreTypes[0]})</div>
            <strong className="job-detail-val">Min. {job.minScore.toFixed(2)}</strong>
          </div>
        </div>

        <div className="job-detail-item">
          <div className="detail-icon-box">
            <MapPin size={16} />
          </div>
          <div>
            <div className="job-detail-label">Görev Yeri</div>
            <strong className="job-detail-val" title={job.cities.join(', ')}>
              {job.cities.length > 2 ? `${job.cities[0]} (+${job.cities.length - 1} İl)` : job.cities.join(', ')}
            </strong>
          </div>
        </div>

        <div className="job-detail-item">
          <div className="detail-icon-box">
            <Clock size={16} />
          </div>
          <div>
            <div className="job-detail-label">Son Başvuru Tarihi</div>
            <strong className={`job-detail-val ${daysLeft <= 5 ? 'text-urgent' : ''}`}>
              {job.deadline} {daysLeft > 0 ? `(${daysLeft} gün kaldı)` : '(Son Gün)'}
            </strong>
          </div>
        </div>
      </div>

      {/* Candidate Eligibility / Uygunluk Bar */}
      <div className="job-match-banner">
        <div className="match-status-wrap">
          {matchScore >= 80 ? (
            <span className="badge badge-success">
              <CheckCircle2 size={13} />
              %{matchScore} Puan & Şart Uyumlu
            </span>
          ) : matchScore >= 60 ? (
            <span className="badge badge-primary">
              <CheckCircle2 size={13} />
              %{matchScore} Kısmi Uyum
            </span>
          ) : (
            <span className="badge badge-danger">
              <AlertCircle size={13} />
              %{matchScore} Şartlar Eksik
            </span>
          )}
          <span className="match-reason-text">
            {reasons[0]}
          </span>
        </div>

        {daysLeft <= 5 && (
          <span className="badge badge-danger badge-deadline-warning">
            <Clock size={12} />
            Son {daysLeft > 0 ? `${daysLeft} Gün` : 'Saatler'}
          </span>
        )}
      </div>

      {/* Qualification codes row */}
      <div className="qualification-tags-row">
        <span className="qual-label">Nitelik Kodları:</span>
        <div className="qual-chips-list">
          {job.qualificationCodes.map(code => (
            <button 
              key={code} 
              className="qual-chip"
              onClick={() => onSelectCode && onSelectCode(code)}
              title="Kodu Sözlükte İncele"
            >
              #{code}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="job-card-actions">
        <button 
          className="btn-secondary"
          onClick={() => onViewDetails(job)}
        >
          <span>İlan & Kılavuz Detayları</span>
          <ArrowRight size={14} />
        </button>

        <div className="job-action-right">
          <a 
            href={job.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary btn-portal-link"
            title={`${job.sourceName} resmi sayfasını yeni sekmede aç`}
          >
            <span>{job.sourceName}</span>
            <ExternalLink size={13} />
          </a>

          <button 
            className={isInBasket ? 'btn-danger-outline' : 'btn-primary'}
            onClick={() => onToggleBasket(job)}
          >
            {isInBasket ? (
              <>
                <BookmarkCheck size={16} />
                <span>Sepetten Çıkar</span>
              </>
            ) : (
              <>
                <Bookmark size={16} />
                <span>Tercih Sepetime Ekle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
