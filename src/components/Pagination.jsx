import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePageSelect = (page) => {
    if (page === '...' || page === currentPage || page < 1 || page > totalPages) return;
    onPageChange(page);
    window.scrollTo({ top: 460, behavior: 'smooth' });
  };

  return (
    <div className="pagination-wrapper">
      <div className="pagination-info">
        <span>Toplam <strong>{totalItems}</strong> ilandan <strong>{startItem}-{endItem}</strong> arası listeleniyor</span>
        
        <div className="items-per-page-group">
          <span>Sayfa Başına:</span>
          <select 
            value={itemsPerPage} 
            onChange={(e) => {
              onItemsPerPageChange(Number(e.target.value));
              onPageChange(1);
            }}
            className="form-select-sm"
          >
            <option value={12}>12 İlan</option>
            <option value={24}>24 İlan</option>
            <option value={48}>48 İlan</option>
            <option value={100}>Tümü</option>
          </select>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button 
            className="pagination-btn"
            onClick={() => handlePageSelect(1)}
            disabled={currentPage === 1}
            title="İlk Sayfa"
          >
            <ChevronsLeft size={16} />
          </button>

          <button 
            className="pagination-btn"
            onClick={() => handlePageSelect(currentPage - 1)}
            disabled={currentPage === 1}
            title="Önceki Sayfa"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="pagination-pages">
            {getPageNumbers().map((p, idx) => (
              <button
                key={idx}
                className={`pagination-page-btn ${p === currentPage ? 'active' : ''} ${p === '...' ? 'dots' : ''}`}
                onClick={() => handlePageSelect(p)}
                disabled={p === '...'}
              >
                {p}
              </button>
            ))}
          </div>

          <button 
            className="pagination-btn"
            onClick={() => handlePageSelect(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Sonraki Sayfa"
          >
            <ChevronRight size={16} />
          </button>

          <button 
            className="pagination-btn"
            onClick={() => handlePageSelect(totalPages)}
            disabled={currentPage === totalPages}
            title="Son Sayfa"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
