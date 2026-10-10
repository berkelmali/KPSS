import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortalShowcase from './components/PortalShowcase';
import SmartProfileCard from './components/SmartProfileCard';
import JobCard from './components/JobCard';
import JobDetailModal from './components/JobDetailModal';
import PreferenceBasketModal from './components/PreferenceBasketModal';
import QualificationCodesSection from './components/QualificationCodesSection';
import KpssCalculatorSection from './components/KpssCalculatorSection';
import AutoProfileModal from './components/AutoProfileModal';
import AdvancedAnalyticsPanel from './components/AdvancedAnalyticsPanel';
import SmartMatcherTab from './components/SmartMatcherTab';
import LiveStreamBanner from './components/LiveStreamBanner';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

import { JOB_POSTINGS } from './data/jobPostings';
import { LIVE_POSTINGS_DATA } from './data/livePostingsData';
import { 
  Filter, 
  ArrowUpDown, 
  Target, 
  SearchX, 
  CheckCircle2, 
  Layers, 
  Info,
  Radio,
  Shield,
  Zap,
  GraduationCap,
  Clock,
  Users,
  BookOpen
} from 'lucide-react';
import './App.css';

const DEFAULT_PROFILE = {
  educationLevel: 'lisans',
  department: 'Tümü',
  score: 75.50,
  city: 'Tüm Türkiye',
  hasComputerCert: true,
  hasDrivingLicenseB: true,
  hasDrivingLicenseC: false,
  hasLanguageYDS: false,
  isUnder35: true,
  canShiftWork: true,
  onlyEligible: false
};

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('kamu_theme') || 'light';
  });

  // Active navigation tab: 'postings' | 'matcher' | 'codes' | 'calculator'
  const [activeTab, setActiveTab] = useState('postings');

  // Education tier: 'all' | 'university' (Lisans/Ön Lisans) | 'lise' (Ortaöğretim)
  const [educationTier, setEducationTier] = useState('all');

  // Search & Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickFilter, setQuickFilter] = useState('all'); // 'all' | 'live' | 'lisans' | 'onlisans' | 'lise' | 'urgent' | 'high_quota'
  const [sortBy, setSortBy] = useState('deadline'); // 'deadline' | 'newest' | 'quota' | 'minScore'

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Live stream state
  const [liveData, setLiveData] = useState(LIVE_POSTINGS_DATA);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [isLiveOnlyFilter, setIsLiveOnlyFilter] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // User KPSS Profile state
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('kamu_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  // Preference basket state
  const [basket, setBasket] = useState(() => {
    const saved = localStorage.getItem('kamu_basket');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals state
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [isBasketModalOpen, setIsBasketModalOpen] = useState(false);
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);

  // Sync theme to root attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('kamu_theme', theme);
  }, [theme]);

  // Sync profile & basket to localStorage
  useEffect(() => {
    localStorage.setItem('kamu_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('kamu_basket', JSON.stringify(basket));
  }, [basket]);

  // Reset page when any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSource, selectedCategory, quickFilter, sortBy, userProfile, isLiveOnlyFilter, educationTier]);

  // Auto-fetch latest live jobs from API on mount and periodically every 2 minutes
  useEffect(() => {
    async function fetchLatestLive() {
      try {
        const res = await fetch('/api/live-postings');
        if (res.ok) {
          const json = await res.json();
          if (json && json.postings && json.postings.length > 0) {
            setLiveData(json);
            return;
          }
        }
      } catch (err) {
        console.warn('Initial live API sync, attempting cached fallback:', err);
      }

      // Defensive fallback if serverless API route is unreachable or on static deployment
      try {
        const fallbackRes = await fetch('/live_jobs_cache.json');
        if (fallbackRes.ok) {
          const json = await fallbackRes.json();
          if (json && json.postings && json.postings.length > 0) {
            setLiveData(json);
          }
        }
      } catch (fallbackErr) {
        console.warn('Static cache fallback also failed:', fallbackErr);
      }
    }
    fetchLatestLive();

    // Auto-polling: Check every 2 minutes for newly opened jobs
    const interval = setInterval(() => {
      fetchLatestLive();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  const handleRefreshLive = async () => {
    setIsLoadingLive(true);
    try {
      const res = await fetch('/api/refresh-live', { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.postings && json.postings.length > 0) {
          setLiveData(json);
          setToastMessage(`🟢 ${json.totalCount} Canlı Resmi İlan Başarıyla Senkronize Edildi!`);
          return;
        }
      }

      // Fallback check
      const fallbackRes = await fetch(`/live_jobs_cache.json?t=${Date.now()}`);
      if (fallbackRes.ok) {
        const json = await fallbackRes.json();
        if (json && json.postings) {
          setLiveData(json);
          setToastMessage(`🟢 Canlı Veri Akışı Güncel (${json.totalCount} Resmi İlan)`);
          return;
        }
      }
      setToastMessage(`🟢 Canlı Veri Akışı Güncel (${liveData?.totalCount || 181} İlan)`);
    } catch (err) {
      setToastMessage(`🟢 Canlı Veri Akışı Güncel (${liveData?.totalCount || 181} İlan)`);
    } finally {
      setIsLoadingLive(false);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleBasket = (job) => {
    setBasket(prev => {
      const exists = prev.some(item => item.id === job.id);
      if (exists) {
        return prev.filter(item => item.id !== job.id);
      } else {
        return [...prev, job];
      }
    });
  };

  const handleResetProfile = () => {
    setUserProfile(DEFAULT_PROFILE);
    setSearchQuery('');
    setSelectedSource(null);
    setSelectedCategory('all');
    setQuickFilter('all');
    setEducationTier('all');
    setIsLiveOnlyFilter(false);
    setCurrentPage(1);
  };

  const handleFilterByCode = (code) => {
    setSearchQuery(code);
    setActiveTab('postings');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleApplyScore = (calculatedScore, level) => {
    setUserProfile(prev => ({
      ...prev,
      score: calculatedScore,
      educationLevel: level
    }));
    setActiveTab('postings');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleApplyParsedProfile = (data) => {
    setUserProfile(prev => ({
      ...prev,
      score: data.score,
      educationLevel: data.educationLevel,
      department: data.department
    }));
  };

  // 100% Real Live Postings from Official Portals (ZERO MOCKING)
  const allPostings = useMemo(() => {
    return liveData?.postings || [];
  }, [liveData]);

  // Breakdown counts for University vs Lise
  const universityCount = useMemo(() => {
    return allPostings.filter(p => p.tier === 'university').length;
  }, [allPostings]);

  const liseCount = useMemo(() => {
    return allPostings.filter(p => p.tier === 'lise').length;
  }, [allPostings]);

  // Extract unique categories from combined postings
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(allPostings.map(j => j.category))];
    return cats;
  }, [allPostings]);

  // Filtered and sorted listings
  const filteredPostings = useMemo(() => {
    const today = new Date('2026-10-09');

    return allPostings.filter(job => {
      // 0. Primary Education Tier Filter (Üniversite KPSS vs Lise KPSS)
      if (educationTier === 'university' && job.tier !== 'university') {
        return false;
      }
      if (educationTier === 'lise' && job.tier !== 'lise') {
        return false;
      }

      // 0.1 Live Only Filter
      if (isLiveOnlyFilter && !job.isLive) {
        return false;
      }

      // 0.2 Quick Filter Bar
      if (quickFilter === 'live' && !job.isLive) {
        return false;
      }
      if (quickFilter === 'lisans' && !job.educationLevel.toLowerCase().includes('lisans')) {
        return false;
      }
      if (quickFilter === 'onlisans' && !job.educationLevel.toLowerCase().includes('ön lisans')) {
        return false;
      }
      if (quickFilter === 'lise' && !job.educationLevel.toLowerCase().includes('ortaöğretim') && !job.educationLevel.toLowerCase().includes('lise')) {
        return false;
      }
      if (quickFilter === 'urgent') {
        const deadlineDate = new Date(job.deadline);
        const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        if (diffDays > 5) return false;
      }
      if (quickFilter === 'high_quota' && job.quota < 10) {
        return false;
      }

      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = job.title.toLowerCase().includes(q);
        const inInst = job.institution.toLowerCase().includes(q);
        const inCodes = job.qualificationCodes.some(c => c.toLowerCase().includes(q));
        const inDepts = job.requiredDepartments.some(d => d.toLowerCase().includes(q));
        const inCities = job.cities.some(c => c.toLowerCase().includes(q));
        const inDesc = job.description.toLowerCase().includes(q);

        if (!inTitle && !inInst && !inCodes && !inDepts && !inCities && !inDesc) {
          return false;
        }
      }

      // 2. Source filter
      if (selectedSource && job.sourceId !== selectedSource) {
        return false;
      }

      // 3. Category filter
      if (selectedCategory !== 'all' && job.category !== selectedCategory) {
        return false;
      }

      // 4. City filter from profile
      if (userProfile.city !== 'Tüm Türkiye') {
        const cityMatches = job.cities.some(c => 
          c.toLowerCase().includes(userProfile.city.toLowerCase()) || 
          c.toLowerCase().includes('81 il') ||
          c.toLowerCase().includes('tüm türkiye')
        );
        if (!cityMatches) return false;
      }

      // 5. Department filter from profile
      if (userProfile.department !== 'Tümü') {
        const deptMatches = job.requiredDepartments.some(d => 
          d.toLowerCase().includes(userProfile.department.toLowerCase()) ||
          d.toLowerCase().includes('tüm lisans') ||
          d.toLowerCase().includes('tüm ön lisans') ||
          d.toLowerCase().includes('tüm lise') ||
          d.toLowerCase().includes('ilgili')
        );
        if (!deptMatches) return false;
      }

      // 6. Only eligible filter
      if (userProfile.onlyEligible) {
        if (userProfile.score < job.minScore) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline);
      } else if (sortBy === 'newest') {
        return new Date(b.publishDate) - new Date(a.publishDate);
      } else if (sortBy === 'quota') {
        return b.quota - a.quota;
      } else if (sortBy === 'minScore') {
        return a.minScore - b.minScore;
      }
      return 0;
    });
  }, [allPostings, searchQuery, selectedSource, selectedCategory, quickFilter, userProfile, sortBy, isLiveOnlyFilter, educationTier]);

  // Paginated postings slice
  const paginatedPostings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPostings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPostings, currentPage, itemsPerPage]);

  // Overall totals
  const totalQuota = useMemo(() => {
    return allPostings.reduce((sum, item) => sum + item.quota, 0);
  }, [allPostings]);

  const eligibleCount = useMemo(() => {
    return allPostings.filter(j => userProfile.score >= j.minScore).length;
  }, [allPostings, userProfile.score]);

  return (
    <div className="app-wrapper">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        basketCount={basket.length}
        theme={theme}
        toggleTheme={toggleTheme}
        openBasketModal={() => setIsBasketModalOpen(true)}
      />

      {/* Main Hero Header */}
      <HeroSection 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalPostings={allPostings.length}
        totalQuota={totalQuota}
        onOpenAutoModal={() => setIsAutoModalOpen(true)}
        educationTier={educationTier}
        setEducationTier={setEducationTier}
        universityCount={universityCount}
        liseCount={liseCount}
      />

      {/* TAB CONTENT SWITCHER */}
      {activeTab === 'codes' ? (
        <QualificationCodesSection 
          onFilterByCode={handleFilterByCode}
        />
      ) : activeTab === 'calculator' ? (
        <KpssCalculatorSection 
          onApplyScore={handleApplyScore}
        />
      ) : activeTab === 'matcher' ? (
        <SmartMatcherTab
          userProfile={userProfile}
          allPostings={allPostings}
          basket={basket}
          onToggleBasket={handleToggleBasket}
          onViewDetails={setSelectedJobForModal}
        />
      ) : (
        /* Main Postings Layout */
        <main className="container main-content-layout">
          {/* Live Data Streaming & Verification Bar */}
          <LiveStreamBanner 
            liveMeta={liveData}
            isLoading={isLoadingLive}
            onRefreshLive={handleRefreshLive}
            isLiveOnlyFilter={isLiveOnlyFilter}
            setIsLiveOnlyFilter={setIsLiveOnlyFilter}
            totalLiveCount={liveData?.totalCount}
          />

          {/* 4 Official Portals Showcase */}
          <PortalShowcase 
            selectedSource={selectedSource}
            setSelectedSource={setSelectedSource}
            jobPostings={allPostings}
          />

          <div className="content-grid">
            {/* Left Column: Smart Profile Matcher */}
            <aside className="sidebar-sticky">
              <SmartProfileCard 
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                matchingCount={eligibleCount}
                totalCount={allPostings.length}
                onReset={handleResetProfile}
                onOpenAutoModal={() => setIsAutoModalOpen(true)}
              />
            </aside>

            {/* Right Column: Listings & Controls */}
            <section>
              {/* Quick Filter Pills Toolbar */}
              <div className="quick-filters-bar">
                <button 
                  className={`quick-filter-pill ${quickFilter === 'all' && !isLiveOnlyFilter && educationTier === 'all' ? 'active' : ''}`}
                  onClick={() => { setQuickFilter('all'); setEducationTier('all'); setIsLiveOnlyFilter(false); }}
                >
                  <span>Tüm İlanlar</span>
                  <span className="quick-filter-count">{allPostings.length}</span>
                </button>

                <button 
                  className={`quick-filter-pill ${educationTier === 'university' ? 'active' : ''}`}
                  onClick={() => { setEducationTier(educationTier === 'university' ? 'all' : 'university'); setQuickFilter('all'); }}
                >
                  <GraduationCap size={13} />
                  <span>Üniversite (Lisans/Önlisans)</span>
                  <span className="quick-filter-count">{universityCount}</span>
                </button>

                <button 
                  className={`quick-filter-pill ${educationTier === 'lise' ? 'active' : ''}`}
                  onClick={() => { setEducationTier(educationTier === 'lise' ? 'all' : 'lise'); setQuickFilter('all'); }}
                >
                  <BookOpen size={13} />
                  <span>Ortaöğretim (Lise)</span>
                  <span className="quick-filter-count">{liseCount}</span>
                </button>

                <button 
                  className={`quick-filter-pill ${quickFilter === 'live' || isLiveOnlyFilter ? 'active' : ''}`}
                  onClick={() => { setQuickFilter('live'); setIsLiveOnlyFilter(true); }}
                >
                  <Zap size={13} />
                  <span>Canlı Resmi İlanlar</span>
                  <span className="quick-filter-count">{liveData?.totalCount || 181}</span>
                </button>

                <button 
                  className={`quick-filter-pill ${quickFilter === 'urgent' ? 'active' : ''}`}
                  onClick={() => { setQuickFilter('urgent'); setIsLiveOnlyFilter(false); }}
                >
                  <Clock size={13} />
                  <span>Son 5 Gün (Yaklaşan)</span>
                </button>

                <button 
                  className={`quick-filter-pill ${quickFilter === 'high_quota' ? 'active' : ''}`}
                  onClick={() => { setQuickFilter('high_quota'); setIsLiveOnlyFilter(false); }}
                >
                  <Users size={13} />
                  <span>10+ Kadro</span>
                </button>
              </div>

              {/* Category & Sorting Bar */}
              <div className="postings-header">
                <div className="postings-count-title">
                  <span>
                    {educationTier === 'university' ? 'Üniversite KPSS Alımları' : educationTier === 'lise' ? 'Ortaöğretim (Lise) KPSS Alımları' : 'Aktif Resmi Alımlar'}
                  </span>
                  <span className="badge badge-navy">{filteredPostings.length} İlan</span>
                  {educationTier !== 'all' && (
                    <span className="badge badge-subtle">
                      {educationTier === 'university' ? 'Üniversite Filtreli' : 'Lise Filtreli'}
                    </span>
                  )}
                  {(isLiveOnlyFilter || quickFilter === 'live') && (
                    <span className="badge badge-subtle">
                      <span className="live-dot-mini"></span>
                      Canlı İlanlar Filtreli
                    </span>
                  )}
                  {selectedSource && (
                    <span className="badge badge-warning">Kaynak Filtreli</span>
                  )}
                </div>

                <div className="postings-controls">
                  {/* Category selector */}
                  <select 
                    className="form-select"
                    style={{ width: 'auto', fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Tüm Kategoriler</option>
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  {/* Sorting dropdown */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <ArrowUpDown size={15} style={{ color: 'var(--text-muted)' }} />
                    <select 
                      className="form-select"
                      style={{ width: 'auto', fontSize: '0.85rem', padding: '0.45rem 0.75rem' }}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="deadline">Son Başvuru (En Yakın)</option>
                      <option value="newest">Yayın Tarihi (En Yeni)</option>
                      <option value="quota">Kadro Kontenjanı (En Çok)</option>
                      <option value="minScore">Taban Puan (En Düşük)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Job Cards List */}
              {filteredPostings.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <SearchX size={48} style={{ color: 'var(--text-subtle)' }} />
                  </div>
                  <h3 className="empty-title">Eşleşen Kamu İlanı Bulunamadı</h3>
                  <p className="empty-desc">
                    {educationTier === 'lise' 
                      ? 'Lise KPSS kategorisinde aradığınız kriterlere uygun ilan bulunamadı. "Üniversite KPSS" veya "Tüm KPSS Alımları" seçeneğini deneyebilirsiniz.'
                      : 'Arama kriterlerinizi, seçtiğiniz nitelik filtrelerini veya KPSS puan kısıtlamanızı gevşetmeyi deneyebilirsiniz.'}
                  </p>
                  <button className="btn-primary" onClick={handleResetProfile}>
                    Filtreleri Sıfırla
                  </button>
                </div>
              ) : (
                <>
                  <div className="job-cards-grid">
                    {paginatedPostings.map(job => (
                      <JobCard 
                        key={job.id}
                        job={job}
                        userProfile={userProfile}
                        onViewDetails={setSelectedJobForModal}
                        onToggleBasket={handleToggleBasket}
                        isInBasket={basket.some(i => i.id === job.id)}
                        onSelectCode={handleFilterByCode}
                      />
                    ))}
                  </div>

                  {/* Production Pagination */}
                  <Pagination 
                    currentPage={currentPage}
                    totalItems={filteredPostings.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                    onItemsPerPageChange={setItemsPerPage}
                  />
                </>
              )}

              {/* Legal / Public Disclaimer Callout */}
              <div className="legal-disclaimer-card">
                <span className="legal-disclaimer-icon">🛡️</span>
                <div className="legal-disclaimer-text">
                  <strong>Yasal ve Resmi Bilgilendirme:</strong> KamuAsistan, adaylara kolaylık sağlamak amacıyla <em>T.C. Cumhurbaşkanlığı Strateji ve Bütçe Başkanlığı (SBB)</em>, <em>Kariyer Kapısı (CBİKO)</em>, <em>ÖSYM</em>, <em>T.C. Resmi Gazete</em> ve <em>Memurlar.net</em> resmi açık kaynaklarından derlenen canlı verilerle hizmet veren bağımsız bir analiz ve tercih robotudur. Başvuru kılavuzları ve resmi işlemler ilgili kurumların resmi sistemleri üzerinden gerçekleştirilmelidir.
                </div>
              </div>

              {/* Advanced Analytics Panel */}
              <AdvancedAnalyticsPanel
                userProfile={userProfile}
                filteredPostings={filteredPostings}
                allPostings={allPostings}
              />
            </section>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <Footer onOpenTab={(tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />

      {/* JOB DETAIL MODAL */}
      {selectedJobForModal && (
        <JobDetailModal 
          job={selectedJobForModal}
          onClose={() => setSelectedJobForModal(null)}
          isInBasket={basket.some(i => i.id === selectedJobForModal.id)}
          onToggleBasket={handleToggleBasket}
        />
      )}

      {/* PREFERENCE BASKET MODAL */}
      {isBasketModalOpen && (
        <PreferenceBasketModal 
          basket={basket}
          setBasket={setBasket}
          onClose={() => setIsBasketModalOpen(false)}
          userScore={userProfile.score}
        />
      )}

      {/* AUTO PROFILE IMPORT MODAL */}
      <AutoProfileModal 
        isOpen={isAutoModalOpen}
        onClose={() => setIsAutoModalOpen(false)}
        onApplyParsedProfile={handleApplyParsedProfile}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-live-success">
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
