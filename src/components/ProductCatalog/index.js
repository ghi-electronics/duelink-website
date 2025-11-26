import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
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
  const history = useHistory();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('category');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);

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

  // Initialize filters from URL parameters on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const sortParam = params.get('sort');
    const searchParam = params.get('search');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (sortParam) {
      setSortBy(sortParam);
    }
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, []); // Only run on mount

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== 'all') {
      params.set('category', selectedCategory.toLowerCase());
    }
    if (sortBy !== 'category') {
      params.set('sort', sortBy);
    }
    if (searchTerm) {
      params.set('search', searchTerm);
    }

    const newSearch = params.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;

    // Only update if URL actually changed
    const currentUrl = `${location.pathname}${location.search}`;
    if (newUrl !== currentUrl) {
      history.replace(newUrl);
    }
  }, [selectedCategory, sortBy, searchTerm, history, location.pathname, location.search]);

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

  // Memoize categories to avoid recalculation - match sidebar order
  const categories = useMemo(() => {
    const categoryOrder = [
      'Kit',
      'Microcomputer',
      'Specialty',
      'Adapter',
      'Display',
      'Sensor',
      'Actuator',
      'Communication',
      'HMI',
      'Storage',
      'Wireless',
      'LED',
      'Sound',
      'Vision',
      'Accessory'
    ];
    
    const cats = new Set(products.map(p => p.category || 'Other'));
    const catArray = Array.from(cats);
    
    // Sort by predefined order, then alphabetically for any not in the list
    return catArray.sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
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
        // Define the same category order as used in the sidebar
        const categoryOrder = [
          'Kit',
          'Microcomputer',
          'Specialty',
          'Adapter',
          'Display',
          'Sensor',
          'Actuator',
          'Communication',
          'HMI',
          'Storage',
          'Wireless',
          'LED',
          'Sound',
          'Vision',
          'Accessory'
        ];
        
        sorted.sort((a, b) => {
          const catA = a.category || 'Other';
          const catB = b.category || 'Other';
          const indexA = categoryOrder.indexOf(catA);
          const indexB = categoryOrder.indexOf(catB);
          
          // Both in predefined order
          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
          }
          // Only A in predefined order - A comes first
          if (indexA !== -1) return -1;
          // Only B in predefined order - B comes first
          if (indexB !== -1) return 1;
          // Neither in predefined order - sort alphabetically
          return catA.localeCompare(catB);
        });
        break;
      case 'price-asc':
        sorted.sort((a, b) => {
          const priceA = a.variations ? a.variations[0].price : a.price;
          const priceB = b.variations ? b.variations[0].price : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        sorted.sort((a, b) => {
          const priceA = a.variations ? a.variations[0].price : a.price;
          const priceB = b.variations ? b.variations[0].price : b.price;
          return priceB - priceA;
        });
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
    setMobileFiltersOpen(prev => {
      const newState = !prev;
      if (newState && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 100);
      }
      return newState;
    });
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
                setSortBy('category');
                // Focus search input after clearing
                setTimeout(() => {
                  searchInputRef.current?.focus();
                }, 50);
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
            ref={searchInputRef}
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
          <span className={styles.countText}>Showing {filteredProducts.length} from {products.length} products</span>
          {selectedCategory !== 'all' && (
            <span className={styles.activeFilter}>
              <span className={styles.filterLabel}>Category: {selectedCategory}</span>
              <button 
                className={styles.clearFilterBtn}
                onClick={() => setSelectedCategory('all')}
                aria-label="Clear category filter"
              >
                ×
              </button>
            </span>
          )}
          {debouncedSearchTerm && (
            <span className={styles.activeFilter}>
              <span className={styles.filterLabel}>Search: "{debouncedSearchTerm}"</span>
              <button 
                className={styles.clearFilterBtn}
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                ×
              </button>
            </span>
          )}
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
              // Focus search input on desktop after reset
              setTimeout(() => {
                searchInputRef.current?.focus();
              }, 50);
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
              onCategoryClick={handleCategoryChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;