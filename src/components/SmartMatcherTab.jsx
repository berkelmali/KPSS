import React, { useMemo, useState } from 'react';
import { 
  Target, TrendingDown, TrendingUp, CheckCircle2, AlertTriangle,
  ArrowRight, Bookmark, BookmarkCheck, Info, ChevronRight, Star, Zap,
  Layers, Shield, ExternalLink, ChevronDown
} from 'lucide-react';
import { HISTORICAL_BASE_SCORES, SALARY_ESTIMATES } from '../data/historicalData';

export default function SmartMatcherTab({ 
  userProfile, 
  allPostings, 
  basket, 
  onToggleBasket, 
  onViewDetails 
}) {
  const [showOnlyMatching, setShowOnlyMatching] = useState(true);

  // Deep analysis for each posting  
  const matchedResults = useMemo(() => {
    return allPostings.map(job => {
      let matchScore = 100;
      const pros = [];
      const cons = [];
      let probability = 50;
      let salaryInfo = SALARY_ESTIMATES[job.contractType] || null;

      // History-based probability
      const history = HISTORICAL_BASE_SCORES[job.institutionCode];
      let lastBase = job.minScore;
      let trend = 'stable';
      let competitionRatio = 0;

      if (history && history.data.length > 0) {
        const sorted = [...history.data].sort((a, b) => b.year - a.year);
        lastBase = sorted[0].baseScore;
        competitionRatio = Math.round(sorted[0].applicants / sorted[0].quota);

        if (sorted.length >= 2) {
          const diff = sorted[0].baseScore - sorted[1].baseScore;
          if (diff < -1) trend = 'falling';
          else if (diff > 1) trend = 'rising';
        }
      }

      // 1. Score check
      const scoreDiff = userProfile.score - lastBase;
      if (scoreDiff >= 5) {
        probability = 92;
        pros.push(`Puanınız son taban puandan ${scoreDiff.toFixed(2)} puan yüksek — çok güçlü aday`);
      } else if (scoreDiff >= 2) {
        probability = 78;
        pros.push(`Son taban puanı (${lastBase.toFixed(2)}) rahatlıkla karşılıyorsunuz`);
      } else if (scoreDiff >= 0) {
        probability = 55;
        pros.push(`Taban puanın hemen üzerindesiniz; riskli ama mümkün`);
      } else if (scoreDiff >= -3) {
        probability = 30;
        cons.push(`Puanınız son taban puandan ${Math.abs(scoreDiff).toFixed(2)} puan düşük`);
      } else {
        probability = 10;
        cons.push(`Puanınız son taban puandan ${Math.abs(scoreDiff).toFixed(2)} puan düşük — çok zor`);
        matchScore -= 30;
      }

      // 2. Education
      const edu = userProfile.educationLevel;
      if (edu !== 'all') {
        const hasLisans = job.educationLevel.toLowerCase().includes('lisans');
        const hasOnlisans = job.educationLevel.toLowerCase().includes('ön lisans');
        const hasLise = job.educationLevel.toLowerCase().includes('ortaöğretim') || job.educationLevel.toLowerCase().includes('lise');
        
        if (edu === 'lisans' && hasLisans) pros.push('Lisans mezuniyeti eşleşiyor');
        else if (edu === 'onlisans' && hasOnlisans) pros.push('Ön lisans mezuniyeti eşleşiyor');
        else if (edu === 'lise' && hasLise) pros.push('Ortaöğretim mezuniyeti eşleşiyor');
        else {
          cons.push('Öğrenim düzeyiniz bu kadro ile uyuşmuyor');
          matchScore -= 35;
        }
      }

      // 3. Department
      if (userProfile.department !== 'Tümü') {
        const deptMatch = job.requiredDepartments.some(d => 
          d.toLowerCase().includes(userProfile.department.toLowerCase()) || 
          d.toLowerCase().includes('tüm lisans') || 
          d.toLowerCase().includes('tüm ön lisans')
        );
        if (deptMatch) pros.push(`${userProfile.department} bölümünüz bu kadro için geçerli`);
        else {
          cons.push(`Bu kadro "${userProfile.department}" bölümünü aramıyor olabilir`);
          matchScore -= 15;
        }
      }

      // 4. Special conditions
      if (job.qualificationCodes.includes('6225') && userProfile.hasComputerCert) {
        pros.push('6225 Bilgisayar Sertifikanız var ✓');
      } else if (job.qualificationCodes.includes('6225') && !userProfile.hasComputerCert) {
        cons.push('6225 MEB Bilgisayar Sertifikası gerekiyor');
        matchScore -= 10;
      }

      if (job.qualificationCodes.includes('6506') && userProfile.hasDrivingLicenseB) {
        pros.push('B sınıfı ehliyet şartını karşılıyorsunuz ✓');
      } else if (job.qualificationCodes.includes('6506') && !userProfile.hasDrivingLicenseB) {
        cons.push('B sınıfı ehliyet (6506) aranıyor');
        matchScore -= 10;
      }

      if (job.qualificationCodes.includes('7101') && userProfile.hasLanguageYDS) {
        pros.push('YDS İngilizce puanınız yeterli ✓');
      } else if (job.qualificationCodes.includes('7101') && !userProfile.hasLanguageYDS) {
        cons.push('YDS İngilizce (7101) en az C düzeyi gerekiyor');
        matchScore -= 15;
      }

      // 5. Competition
      if (competitionRatio > 100) cons.push(`Yoğun rekabet — Başvuru/Kadro oranı: 1/${competitionRatio}`);
      else if (competitionRatio > 0 && competitionRatio <= 30) pros.push(`Düşük rekabet — 1/${competitionRatio} oranı`);

      // 6. Trend bonus
      if (trend === 'falling') {
        pros.push('Taban puanlar son yıllarda düşüş eğiliminde ↓');
        probability = Math.min(95, probability + 5);
      }
      if (trend === 'rising') {
        cons.push('Taban puanlar son yıllarda yükseliş trendinde ↑');
        probability = Math.max(5, probability - 5);
      }

      // Salary info
      if (salaryInfo) {
        pros.push(`Tahmini net maaş: ${salaryInfo.net}`);
      }

      matchScore = Math.max(0, Math.min(100, matchScore));

      // Days left
      const today = new Date('2026-10-09');
      const deadline = new Date(job.deadline);
      const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      return {
        ...job,
        matchScore,
        probability,
        pros,
        cons,
        trend,
        lastBase,
        competitionRatio,
        daysLeft,
        salaryInfo
      };
    }).sort((a, b) => b.probability - a.probability);
  }, [userProfile, allPostings]);

  const displayed = showOnlyMatching 
    ? matchedResults.filter(r => r.probability >= 30) 
    : matchedResults;

  const getProbColor = (p) => {
    if (p >= 75) return 'var(--success)';
    if (p >= 50) return 'var(--primary)';
    if (p >= 30) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="container" style={{ padding: '2rem 1.25rem 4rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto 2rem' }}>
        <div className="badge badge-primary" style={{ marginBottom: '0.85rem' }}>
          <Target size={14} />
          <span>ÖSYM Taban Puan & Yerleşme İhtimali Analitiği</span>
        </div>
        <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>
          KPSS Tercih Robotu & Taban Puan Analizi
        </h2>
        <p style={{ fontSize: '0.975rem', color: 'var(--text-muted)' }}>
          Profilinizdeki KPSS puanınız, mezuniyet düzeyiniz ve nitelik kodlarınız ile 
          geçmiş yıl resmi ÖSYM yerleştirme verilerini (2022-2025) karşılaştırarak kadro bazında 
          <strong> atanma ihtimali</strong> ve tercih stratejisi sunar.
        </p>
      </div>

      {/* Profile summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem', background: 'var(--bg-surface)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
        <div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>KPSS Puanı</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary)' }}>{userProfile.score.toFixed(2)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Öğrenim</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'capitalize' }}>
            {userProfile.educationLevel === 'lisans' ? 'Lisans' : userProfile.educationLevel === 'onlisans' ? 'Ön Lisans' : userProfile.educationLevel === 'lise' ? 'Lise' : 'Tümü'}
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bölüm</div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{userProfile.department}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600 }}>Uygun İlan</div>
          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--success)' }}>{displayed.length}</div>
        </div>
      </div>

      {/* Filter toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Toplam {matchedResults.length} ilan analiz edildi • {displayed.length} tanesi gösteriliyor
        </span>
        <label className="custom-checkbox" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
          <input 
            type="checkbox" 
            checked={showOnlyMatching}
            onChange={() => setShowOnlyMatching(!showOnlyMatching)}
          />
          <span>Sadece %30+ olasılıklı ilanları göster</span>
        </label>
      </div>

      {/* Results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {displayed.map((item, idx) => {
          const isInBasket = basket.some(b => b.id === item.id);
          return (
            <div key={item.id} className="glass-panel" style={{ padding: '1.35rem', borderLeft: `4px solid ${getProbColor(item.probability)}` }}>
              {/* Header row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
                  <span style={{ fontSize: '1.5rem' }}>{item.logo}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.institution} • {item.contractType}</div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }} onClick={() => onViewDetails(item)}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '90px' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: getProbColor(item.probability), lineHeight: 1 }}>
                    %{item.probability}
                  </div>
                  <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {item.probability >= 75 ? 'Yüksek İhtimal' : item.probability >= 50 ? 'Orta İhtimal' : item.probability >= 30 ? 'Düşük İhtimal' : 'Çok Zor'}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center', marginTop: '0.2rem' }}>
                    {item.trend === 'falling' ? (
                      <><TrendingDown size={12} style={{ color: 'var(--success)' }} /><span style={{ fontSize: '0.65rem', color: 'var(--success)' }}>Puan Düşüyor</span></>
                    ) : item.trend === 'rising' ? (
                      <><TrendingUp size={12} style={{ color: 'var(--danger)' }} /><span style={{ fontSize: '0.65rem', color: 'var(--danger)' }}>Puan Artıyor</span></>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Quick metrics */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.775rem' }}>
                <span className="badge badge-subtle">Kontenjan: {item.quota.toLocaleString('tr-TR')}</span>
                <span className="badge badge-subtle">Son Taban: {item.lastBase.toFixed(2)}</span>
                <span className="badge badge-subtle">Rakip: 1/{item.competitionRatio}</span>
                <span className={`badge ${item.daysLeft <= 5 ? 'badge-danger' : 'badge-warning'}`}>
                  {item.daysLeft > 0 ? `${item.daysLeft} gün kaldı` : 'Bugün son gün'}
                </span>
                {item.salaryInfo && (
                  <span className="badge badge-success">Net Maaş: {item.salaryInfo.net}</span>
                )}
              </div>

              {/* Pros & Cons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div style={{ background: 'var(--success-light)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--success)', marginBottom: '0.35rem' }}>✅ Artılar</div>
                  {item.pros.length > 0 ? (
                    <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.775rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      {item.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  ) : (
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>—</span>
                  )}
                </div>
                <div style={{ background: 'var(--danger-light)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--danger)', marginBottom: '0.35rem' }}>⚠️ Eksiler / Riskler</div>
                  {item.cons.length > 0 ? (
                    <ul style={{ paddingLeft: '1rem', margin: 0, fontSize: '0.775rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      {item.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  ) : (
                    <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Risk tespit edilmedi</span>
                  )}
                </div>
              </div>

              {/* Probability bar */}
              <div style={{ background: 'var(--bg-main)', borderRadius: '6px', height: '8px', overflow: 'hidden', marginBottom: '0.65rem' }}>
                <div style={{ width: `${item.probability}%`, height: '100%', background: `linear-gradient(90deg, ${getProbColor(item.probability)}, ${getProbColor(item.probability)}88)`, borderRadius: '6px', transition: 'width 0.6s ease' }} />
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <button className="btn-secondary" onClick={() => onViewDetails(item)} style={{ fontSize: '0.825rem' }}>
                  <span>Detaylı İncele</span>
                  <ChevronRight size={14} />
                </button>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '0.8rem' }}>
                    <ExternalLink size={13} />
                    <span>Resmi Kaynak</span>
                  </a>
                  <button 
                    className={isInBasket ? 'btn-danger-outline' : 'btn-primary'}
                    onClick={() => onToggleBasket(item)}
                    style={{ fontSize: '0.825rem' }}
                  >
                    {isInBasket ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                    <span>{isInBasket ? 'Çıkar' : 'Tercih Listeme Ekle'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
