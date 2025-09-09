import React, { useEffect, useState, useMemo, useCallback } from 'react';
import ProductCard from './ProductCard';
import styles from './styles.module.css';

// Debounce hook
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/duelink.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  // Memoize categories to avoid recalculation
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category || 'Other'));
    return Array.from(cats).sort();
  }, [products]);

  // Memoize filtered and sorted products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = 
        debouncedSearchTerm === '' || 
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.partNumber.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered products
    const sorted = [...filtered];
    switch(sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'category':
        sorted.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    return sorted;
  }, [products, debouncedSearchTerm, selectedCategory, sortBy]);

  // Callbacks to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    
    // Always scroll to show products after category change
    setTimeout(() => {
      if (isMobile) {
        setMobileFiltersOpen(false);
        // Mobile: Scroll to product grid
        const productsSection = document.querySelector('[class*="productGrid"]');
        if (productsSection) {
          const offset = 130; // Account for fixed header + filter button
          const elementPosition = productsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // Desktop: Scroll up to show the filter bar and products clearly
        const catalogContainer = document.querySelector('[class*="catalogContainer"]');
        if (catalogContainer) {
          // Scroll to top of catalog section
          const offset = 20; // Small offset from top
          const elementPosition = catalogContainer.getBoundingClientRect().top;
          const scrollPosition = elementPosition + window.pageYOffset - offset;
          
          // Force scroll up to show everything
          window.scrollTo({
            top: Math.max(0, scrollPosition - 100), // Extra 100px to ensure we scroll up enough
            behavior: 'smooth'
          });
        }
      }
    }, isMobile ? 150 : 50); // Slightly longer delay on mobile for filter to close
  }, [isMobile]);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
    if (isMobile) {
      setMobileFiltersOpen(false);
      // Scroll to products after sort change on mobile
      setTimeout(() => {
        const productsSection = document.querySelector('[class*="productGrid"]');
        if (productsSection) {
          const offset = 80;
          const elementPosition = productsSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [isMobile]);

  const toggleMobileFilters = useCallback(() => {
    setMobileFiltersOpen(prev => !prev);
  }, []);

  const activeFiltersCount = (selectedCategory !== 'all' ? 1 : 0) + (searchTerm ? 1 : 0);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className={styles.catalogContainer}>
      {isMobile && (
        <div className={`${styles.mobileFilterHeader} ${mobileFiltersOpen ? styles.mobileFilterHeaderActive : ''}`}>
          <button 
            className={styles.mobileFilterToggle}
            onClick={toggleMobileFilters}
            aria-expanded={mobileFiltersOpen}
            aria-label="Toggle filters"
          >
            <svg className={styles.filterIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className={styles.filterBadge}>{activeFiltersCount}</span>
            )}
          </button>
          {activeFiltersCount > 0 && (
            <button
              className={styles.clearFiltersBtn}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name-asc');
                // Scroll to show all products after clearing filters
                setTimeout(() => {
                  const productsSection = document.querySelector('[class*="productGrid"]');
                  if (productsSection) {
                    const offset = 130;
                    const elementPosition = productsSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }, 100);
              }}
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}
      {isMobile && mobileFiltersOpen && (
        <div className={styles.mobileFilterOverlay} onClick={() => setMobileFiltersOpen(false)} />
      )}
      <div className={`${styles.filterBar} ${isMobile ? styles.mobileFilterBar : ''} ${isMobile && mobileFiltersOpen ? styles.mobileFilterBarOpen : ''}`}>
        <div className={`${styles.searchRow} ${isMobile ? styles.mobileSearchRow : ''}`}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
            autoFocus={!isMobile}
          />
          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="category">Category</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>
        <div className={`${styles.categoryFilters} ${isMobile ? styles.mobileCategoryFilters : ''}`}>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('all')}
            aria-pressed={selectedCategory === 'all'}
          >
            All Products ({products.length})
          </button>
          {categories.map(category => {
            const count = products.filter(p => p.category === category).length;
            return (
              <button 
                key={category}
                className={`${styles.filterButton} ${selectedCategory.toLowerCase() === category.toLowerCase() ? styles.active : ''}`}
                onClick={() => handleCategoryChange(category)}
                aria-pressed={selectedCategory.toLowerCase() === category.toLowerCase()}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {(!isMobile || !mobileFiltersOpen) && (
        <div className={styles.resultsCount}>
          {debouncedSearchTerm && (
            <span className={styles.searchingText}>Searching for "{debouncedSearchTerm}"... </span>
          )}
          <span className={styles.countText}>Showing {filteredProducts.length} from {products.length} products</span>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className={styles.noResults}>
          <p>No products found matching your criteria.</p>
          <button 
            className={styles.resetButton}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={`${styles.productGrid} ${isMobile ? styles.mobileProductGrid : ''}`}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.partNumber || index} 
              product={product} 
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;