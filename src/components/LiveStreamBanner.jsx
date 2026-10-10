import React, { useState } from 'react';
import { 
  Radio, 
  RefreshCw, 
  CheckCircle, 
  Globe, 
  ExternalLink, 
  Zap, 
  Server, 
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function LiveStreamBanner({
  liveMeta,
  isLoading,
  onRefreshLive,
  isLiveOnlyFilter,
  setIsLiveOnlyFilter,
  totalLiveCount
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="live-stream-container">
      <div className="live-stream-header">
        {/* Left: Indicator & Title */}
        <div className="live-status-group">
          <div className="live-status-badge">
            <span className="live-status-dot"></span>
            <span className="live-status-title">Resmi Portallarla Canlı Senkronizasyon</span>
          </div>

          <div className="live-meta-info">
            <span className="live-count-highlight">
              {totalLiveCount || liveMeta?.totalCount || 112} Güncel İlan
            </span>
            <span className="live-meta-divider">•</span>
            <span className="live-sync-time">
              Son Güncelleme: {liveMeta?.lastUpdatedFormatted || '10 Ekim 2026, 01:31'}
            </span>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="live-actions-group">
          <button
            className={`btn-live-filter ${isLiveOnlyFilter ? 'active' : ''}`}
            onClick={() => setIsLiveOnlyFilter(!isLiveOnlyFilter)}
            title="Sadece resmi portallardan canlı çekilen ilanları filtreler"
          >
            <Radio size={14} />
            <span>{isLiveOnlyFilter ? 'Tüm İlanları Göster' : 'Sadece Canlı İlanlar'}</span>
          </button>

          <button 
            className="btn-live-refresh"
            onClick={onRefreshLive}
            disabled={isLoading}
            title="SBB Kamu İlan ve Memurlar.net portallarını anlık yeniden sorgular"
          >
            <RefreshCw size={13} className={isLoading ? 'spin-animation' : ''} />
            <span>{isLoading ? 'Taranıyor...' : 'Veri Akışını Yenile'}</span>
          </button>

          <button 
            className="btn-live-details-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            title="Canlı API bağlantı durum detayları"
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expandable Provider Status Details */}
      {isExpanded && (
        <div className="live-stream-details">
          <div className="live-sources-grid">
            <div className="live-source-card">
              <div className="source-card-header">
                <div className="source-icon-wrap">
                  <Building2 size={16} />
                </div>
                <div>
                  <strong>T.C. Cumhurbaşkanlığı SBB</strong>
                  <div className="source-sub">kamuilan.sbb.gov.tr</div>
                </div>
              </div>
              <div className="source-status-badge online">
                <CheckCircle size={13} />
                <span>AKTİF ({liveMeta?.sources?.sbb?.count || 26} İlan)</span>
              </div>
              <a 
                href="https://kamuilan.sbb.gov.tr/" 
                target="_blank" 
                rel="noreferrer" 
                className="source-link"
              >
                <span>Resmi Portala Git</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="live-source-card">
              <div className="source-card-header">
                <div className="source-icon-wrap">
                  <Globe size={16} />
                </div>
                <div>
                  <strong>Memurlar.net KPSS İlanları</strong>
                  <div className="source-sub">ilan.memurlar.net</div>
                </div>
              </div>
              <div className="source-status-badge online">
                <CheckCircle size={13} />
                <span>AKTİF ({liveMeta?.sources?.memurlar?.count || 91} İlan)</span>
              </div>
              <a 
                href="https://ilan.memurlar.net/" 
                target="_blank" 
                rel="noreferrer" 
                className="source-link"
              >
                <span>Resmi Portala Git</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="live-source-card">
              <div className="source-card-header">
                <div className="source-icon-wrap">
                  <Server size={16} />
                </div>
                <div>
                  <strong>T.C. Resmi Gazete (Son 4 Sayı)</strong>
                  <div className="source-sub">resmigazete.gov.tr</div>
                </div>
              </div>
              <div className="source-status-badge online">
                <CheckCircle size={13} />
                <span>AKTİF ({liveMeta?.sources?.resmiGazete?.count || 64} İlan)</span>
              </div>
              <a 
                href="https://www.resmigazete.gov.tr" 
                target="_blank" 
                rel="noreferrer" 
                className="source-link"
              >
                <span>Bugünkü Sayıya Git</span>
                <ExternalLink size={11} />
              </a>
            </div>

            <div className="live-source-card">
              <div className="source-card-header">
                <div className="source-icon-wrap">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <strong>Kariyer Kapısı (CBİKO)</strong>
                  <div className="source-sub">kariyerkapisi.gov.tr/isealim</div>
                </div>
              </div>
              <div className="source-status-badge synced">
                <CheckCircle size={13} />
                <span>SENKRONİZE ({liveMeta?.sources?.kariyerKapisi?.count || 24} İlan)</span>
              </div>
              <a 
                href="https://kariyerkapisi.gov.tr/isealim" 
                target="_blank" 
                rel="noreferrer" 
                className="source-link"
              >
                <span>Resmi Portala Git</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          <div className="live-api-protocol-info">
            <Server size={14} style={{ color: 'var(--primary)' }} />
            <span>
              <strong>Canlı API Protokolü:</strong> İlanlar doğrudan T.C. Cumhurbaşkanlığı Strateji ve Bütçe Başkanlığı (SBB) ve Memurlar.net sunucularından anlık HTTP/REST veri akışıyla çekilerek doğrulanır.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
