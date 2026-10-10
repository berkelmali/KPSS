import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, TrendingUp, BarChart3, Target, Users, Award, 
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, Info,
  DollarSign, Banknote, Building2, MapPin, Hash, ExternalLink, Search,
  Layers, Eye, ArrowRight
} from 'lucide-react';
import { HISTORICAL_BASE_SCORES, BRANCH_RANKINGS, OSYM_POSITION_CODES, KPSS_SCORE_TYPES, SALARY_ESTIMATES } from '../data/historicalData';

export default function AdvancedAnalyticsPanel({ userProfile, filteredPostings, allPostings }) {
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState('probability');
  const [expandedInst, setExpandedInst] = useState(null);
  const [positionSearch, setPositionSearch] = useState('');

  // 1. Atanma Olasılık Hesaplaması (kpssrobotu.com benzeri)
  const probabilityAnalysis = useMemo(() => {
    return allPostings.map(job => {
      const history = HISTORICAL_BASE_SCORES[job.institutionCode];
      let probability = 50;
      let trend = 'stable';
      let lastBaseScore = job.minScore;
      let avgBaseScore = job.minScore;
      let competitionRatio = 0;

      if (history && history.data.length > 0) {
        const sorted = [...history.data].sort((a, b) => b.year - a.year || b.period.localeCompare(a.period));
        lastBaseScore = sorted[0].baseScore;
        avgBaseScore = sorted.reduce((sum, d) => sum + d.baseScore, 0) / sorted.length;
        competitionRatio = sorted[0].applicants / sorted[0].quota;

        // Trend
        if (sorted.length >= 2) {
          const diff = sorted[0].baseScore - sorted[1].baseScore;
          if (diff < -1.5) trend = 'falling';
          else if (diff > 1.5) trend = 'rising';
        }

        // Probability calculation
        const scoreDiff = userProfile.score - lastBaseScore;
        if (scoreDiff >= 5) probability = 92;
        else if (scoreDiff >= 3) probability = 82;
        else if (scoreDiff >= 1) probability = 68;
        else if (scoreDiff >= 0) probability = 52;
        else if (scoreDiff >= -2) probability = 35;
        else if (scoreDiff >= -5) probability = 18;
        else probability = 5;

        // Adjust for competition
        if (competitionRatio > 50) probability = Math.max(5, probability - 10);
        if (competitionRatio < 20) probability = Math.min(95, probability + 5);
      }

      return {
        ...job,
        probability,
        trend,
        lastBaseScore,
        avgBaseScore: avgBaseScore.toFixed(2),
        competitionRatio: competitionRatio.toFixed(0),
        historyData: history?.data || []
      };
    }).sort((a, b) => b.probability - a.probability);
  }, [userProfile.score, allPostings]);

  // 2. Branş sıralaması
  const branchInfo = BRANCH_RANKINGS[userProfile.department] || BRANCH_RANKINGS['Tümü'];
  const estimatedRank = useMemo(() => {
    if (!branchInfo) return null;
    const percentile = ((100 - userProfile.score) / 100);
    const rank = Math.max(1, Math.round(branchInfo.totalCandidates * percentile * 0.6));
    return rank;
  }, [userProfile.score, branchInfo]);

  // 3. ÖSYM Kadro Kodları (Filtered)
  const filteredPositions = useMemo(() => {
    if (!positionSearch.trim()) return OSYM_POSITION_CODES.slice(0, 20);
    const q = positionSearch.toLowerCase();
    return OSYM_POSITION_CODES.filter(p => 
      p.osmyCode.includes(q) || 
      p.institution.toLowerCase().includes(q) || 
      p.title.toLowerCase().includes(q) || 
      p.city.toLowerCase().includes(q)
    );
  }, [positionSearch]);

  const getProbColor = (p) => {
    if (p >= 75) return 'var(--success)';
    if (p >= 50) return 'var(--primary)';
    if (p >= 30) return 'var(--warning)';
    return 'var(--danger)';
  };

  const getProbLabel = (p) => {
    if (p >= 75) return 'Yüksek İhtimal';
    if (p >= 50) return 'Orta İhtimal';
    if (p >= 30) return 'Düşük İhtimal';
    return 'Çok Zor';
  };

  return (
    <div style={{ marginTop: '1.5rem' }}>
      {/* Analytics tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
        {[
          { id: 'probability', icon: <Target size={15} />, label: 'Atanma Olasılığı & Simülasyon' },
          { id: 'history', icon: <BarChart3 size={15} />, label: 'Geçmiş Yıl Taban Puanları' },
          { id: 'osym_codes', icon: <Hash size={15} />, label: 'ÖSYM Kadro Kodları (7 Hane)' },
          { id: 'salary', icon: <Banknote size={15} />, label: 'Tahmini Maaş & Özlük' },
          { id: 'branch', icon: <Users size={15} />, label: 'Branş Sıralaması' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`filter-pill-btn ${activeAnalyticsTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveAnalyticsTab(tab.id)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', padding: '0.5rem 0.85rem' }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB: Atanma Olasılığı & Simülasyon */}
      {activeAnalyticsTab === 'probability' && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={20} style={{ color: 'var(--primary)' }} />
              Atanma Olasılık Simülatörü
            </h3>
            <span className="badge badge-primary">Puanınız: {userProfile.score.toFixed(2)}</span>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Geçmiş yıl ÖSYM yerleştirme sonuçları, kontenjan değişimleri ve rekabet oranlarına dayanarak her kadro için kişiselleştirilmiş atanma olasılığınız hesaplanmıştır.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {probabilityAnalysis.slice(0, 10).map((item, idx) => (
              <div
                key={item.id}
                style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1rem', transition: 'var(--transition)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.logo}</span>
                    <div>
                      <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', fontWeight: 600 }}>{item.institution}</div>
                      <div style={{ fontSize: '0.925rem', fontWeight: 700 }}>{item.title}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Trend indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      {item.trend === 'falling' ? (
                        <><TrendingDown size={14} style={{ color: 'var(--success)' }} /><span style={{ color: 'var(--success)' }}>Düşüyor</span></>
                      ) : item.trend === 'rising' ? (
                        <><TrendingUp size={14} style={{ color: 'var(--danger)' }} /><span style={{ color: 'var(--danger)' }}>Yükseliyor</span></>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Sabit</span>
                      )}
                    </div>

                    {/* Probability badge */}
                    <div style={{ textAlign: 'center', minWidth: '70px' }}>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: getProbColor(item.probability) }}>
                        %{item.probability}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {getProbLabel(item.probability)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ background: 'var(--bg-main)', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.probability}%`, height: '100%', background: getProbColor(item.probability), borderRadius: '4px', transition: 'width 0.5s ease' }} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem', fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                  <span>Son Taban: <strong style={{ color: 'var(--text-main)' }}>{item.lastBaseScore.toFixed(2)}</strong></span>
                  <span>Ort. Taban: <strong style={{ color: 'var(--text-main)' }}>{item.avgBaseScore}</strong></span>
                  <span>Rakip Oranı: <strong style={{ color: 'var(--text-main)' }}>1/{item.competitionRatio}</strong></span>
                  <span>Kontenjan: <strong style={{ color: 'var(--text-main)' }}>{item.quota.toLocaleString('tr-TR')}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Geçmiş Yıl Taban Puanları */}
      {activeAnalyticsTab === 'history' && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={20} style={{ color: 'var(--purple)' }} />
              Geçmiş Yıl Taban Puanları (Memurlar.net KPSS Robotundan)
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            ÖSYM'nin önceki merkezi yerleştirme sonuçlarından derlenen taban ve tavan puanlar. Kendi puanınızla karşılaştırarak hangi kuruma ne ölçüde şansınız olduğunu görebilirsiniz.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(HISTORICAL_BASE_SCORES).map(([code, info]) => {
              const isExpanded = expandedInst === code;
              const lastEntry = info.data[info.data.length - 1];
              const scoreDiff = userProfile.score - lastEntry.baseScore;

              return (
                <div key={code} style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <button
                    onClick={() => setExpandedInst(isExpanded ? null : code)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', background: 'var(--bg-surface-subtle)', color: 'var(--text-main)', textAlign: 'left' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <Building2 size={16} style={{ color: 'var(--primary)' }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.925rem' }}>{info.name}</div>
                        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                          Son Taban: {lastEntry.baseScore.toFixed(2)} • Sizin Puanınız: {userProfile.score.toFixed(2)} • 
                          <span style={{ color: scoreDiff >= 0 ? 'var(--success)' : 'var(--danger)', fontWeight: 700 }}>
                            {scoreDiff >= 0 ? ` +${scoreDiff.toFixed(2)} ✓` : ` ${scoreDiff.toFixed(2)} ✗`}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {isExpanded && (
                    <div style={{ padding: '1rem' }}>
                      {/* "Your score line" visual */}
                      <div style={{ background: 'var(--primary-light)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--primary-border)' }}>
                        <Award size={14} />
                        Sizin KPSS Puanınız: {userProfile.score.toFixed(2)}
                      </div>

                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ borderBottom: '2px solid var(--border-subtle)' }}>
                            <th style={{ textAlign: 'left', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Dönem</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Puan Türü</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Taban Puan</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tavan Puan</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kadro</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Yerleşen</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Başvuru</th>
                            <th style={{ textAlign: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontWeight: 600 }}>Durum</th>
                          </tr>
                        </thead>
                        <tbody>
                          {info.data.map((d, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                              <td style={{ padding: '0.5rem', fontWeight: 600 }}>{d.period}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>{d.scoreType}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 700, color: userProfile.score >= d.baseScore ? 'var(--success)' : 'var(--danger)' }}>
                                {d.baseScore.toFixed(2)}
                              </td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>{d.topScore.toFixed(2)}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>{d.quota.toLocaleString('tr-TR')}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>{d.placed.toLocaleString('tr-TR')}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>{d.applicants.toLocaleString('tr-TR')}</td>
                              <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                                {userProfile.score >= d.baseScore ? (
                                  <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
                                    <CheckCircle2 size={10} /> Yeterdi
                                  </span>
                                ) : (
                                  <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>
                                    <AlertTriangle size={10} /> Yetmezdi
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* Trend bar visual */}
                      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.35rem', alignItems: 'flex-end', height: '50px' }}>
                        {info.data.map((d, i) => {
                          const maxScore = Math.max(...info.data.map(x => x.baseScore));
                          const minScore = Math.min(...info.data.map(x => x.baseScore));
                          const range = maxScore - minScore || 1;
                          const pct = ((d.baseScore - minScore) / range) * 100;
                          return (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}>
                              <div style={{
                                width: '100%',
                                height: `${20 + pct * 0.3}px`,
                                background: userProfile.score >= d.baseScore 
                                  ? 'linear-gradient(to top, var(--success), rgba(16, 185, 129, 0.4))'
                                  : 'linear-gradient(to top, var(--danger), rgba(239, 68, 68, 0.4))',
                                borderRadius: '3px 3px 0 0',
                                transition: 'height 0.3s ease'
                              }} />
                              <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{d.period}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB: ÖSYM 7 Haneli Kadro Kodları */}
      {activeAnalyticsTab === 'osym_codes' && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Hash size={20} style={{ color: 'var(--warning)' }} />
              ÖSYM AİS Tercih Kodları (7 Haneli Kadro Kodu)
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            ÖSYM üzerinden tercih yaparken sisteme girmeniz gereken 7 haneli kadro kodlarını burada bulabilirsiniz. Bu kodlar memurlar.net tercih robotundan alınan örneklerdir.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Search size={16} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              placeholder="ÖSYM kodu, kurum, unvan veya il ara..."
              value={positionSearch}
              onChange={(e) => setPositionSearch(e.target.value)}
            />
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-subtle)', background: 'var(--bg-surface-subtle)' }}>
                  <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700, whiteSpace: 'nowrap' }}>ÖSYM Kodu</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Kurum</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Kadro Unvanı</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Görev Yeri</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Kontenjan</th>
                  <th style={{ textAlign: 'center', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Puan Türü</th>
                  <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)', fontWeight: 700 }}>Nitelik Kodları</th>
                </tr>
              </thead>
              <tbody>
                {filteredPositions.map((pos, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '0.5rem', fontFamily: 'monospace', fontWeight: 800, color: 'var(--primary)', fontSize: '0.85rem' }}>
                      {pos.osmyCode}
                    </td>
                    <td style={{ padding: '0.5rem', fontWeight: 600 }}>{pos.institution}</td>
                    <td style={{ padding: '0.5rem' }}>{pos.title}</td>
                    <td style={{ padding: '0.5rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                        {pos.city}
                      </span>
                    </td>
                    <td style={{ textAlign: 'center', padding: '0.5rem', fontWeight: 700 }}>{pos.quota}</td>
                    <td style={{ textAlign: 'center', padding: '0.5rem' }}>
                      <span className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{pos.scoreType}</span>
                    </td>
                    <td style={{ padding: '0.5rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.2rem' }}>
                        {pos.nitelikCodes.map(c => (
                          <span key={c} className="qual-chip" style={{ fontSize: '0.65rem' }}>#{c}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
            ⚠️ ÖSYM kodları her tercih döneminde değişebilir. Resmi tercih kılavuzundaki güncel kodları mutlaka kontrol ediniz.
          </p>
        </div>
      )}

      {/* TAB: Tahmini Maaş & Özlük */}
      {activeAnalyticsTab === 'salary' && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Banknote size={20} style={{ color: 'var(--success)' }} />
              Tahmini Maaş & Özlük Hakları (2026 Ekim)
            </h3>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Kadro türüne göre 2026 yılı tahmini brüt ve net maaş bilgileri. Döner sermaye, ek ödeme ve tazminatlarla gerçek rakamlar yukarıda belirtilenlerden farklılık gösterebilir.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {Object.entries(SALARY_ESTIMATES).map(([type, info]) => (
              <div key={type} style={{ background: 'var(--bg-surface-subtle)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '1.1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                  <DollarSign size={18} style={{ color: 'var(--success)' }} />
                  <strong style={{ fontSize: '0.95rem' }}>{type}</strong>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Brüt Maaş: </span>
                    <strong style={{ color: 'var(--text-main)' }}>{info.gross}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Net Eline Geçen: </span>
                    <strong style={{ color: 'var(--success)' }}>{info.net}</strong>
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', marginTop: '0.25rem' }}>
                    💡 {info.benefits}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: Branş Sıralaması */}
      {activeAnalyticsTab === 'branch' && (
        <div className="glass-panel" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} style={{ color: 'var(--warning)' }} />
              Branş Sıralaması & Rakip Analizi
            </h3>
            <span className="badge badge-warning">{userProfile.department}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Tahmini Branş Sıralamanız</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>{estimatedRank?.toLocaleString('tr-TR')}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ {branchInfo.totalCandidates.toLocaleString('tr-TR')} aday</div>
            </div>

            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Branş Ortalaması</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: userProfile.score > branchInfo.avgScore ? 'var(--success)' : 'var(--danger)' }}>
                {branchInfo.avgScore.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Siz: {userProfile.score.toFixed(2)} ({userProfile.score > branchInfo.avgScore ? '↑ Ortalamanın üstünde' : '↓ Ortalamanın altında'})
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Branş Medyanı</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{branchInfo.medianScore.toFixed(2)}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Ortadaki adayın puanı
              </div>
            </div>

            <div style={{ background: 'var(--bg-surface-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>Toplam Rakip Aday</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{branchInfo.totalCandidates.toLocaleString('tr-TR')}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {userProfile.department} branşında
              </div>
            </div>
          </div>

          {/* All branches comparison */}
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem' }}>Tüm Branşlar Karşılaştırması</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {Object.entries(BRANCH_RANKINGS).filter(([k]) => k !== 'Tümü').sort((a, b) => b[1].avgScore - a[1].avgScore).map(([name, data]) => {
              const isUser = name === userProfile.department;
              const pct = ((data.avgScore - 55) / 45) * 100;
              return (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.5rem', background: isUser ? 'var(--primary-light)' : 'transparent', borderRadius: 'var(--radius-sm)', border: isUser ? '1px solid var(--primary)' : 'none' }}>
                  <span style={{ flex: '0 0 200px', fontSize: '0.775rem', fontWeight: isUser ? 700 : 500, color: isUser ? 'var(--primary)' : 'var(--text-main)' }}>
                    {isUser ? '⭐ ' : ''}{name}
                  </span>
                  <div style={{ flex: 1, background: 'var(--bg-surface-subtle)', borderRadius: '3px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ width: `${Math.min(100, pct)}%`, height: '100%', background: isUser ? 'var(--primary)' : 'var(--border-hover)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ flex: '0 0 45px', fontSize: '0.725rem', fontWeight: 700, textAlign: 'right' }}>{data.avgScore.toFixed(1)}</span>
                  <span style={{ flex: '0 0 50px', fontSize: '0.675rem', color: 'var(--text-muted)', textAlign: 'right' }}>{(data.totalCandidates / 1000).toFixed(0)}K</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
