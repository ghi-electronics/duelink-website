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
  
  // Debounce search term for better performance
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    fetch('/duelink.json')
      .then(response => response.json())
      .then(data => {
        setProducts(data.boards || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  // Memoize categories to avoid recalculation
  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.Category || 'Other'));
    return Array.from(cats).sort();
  }, [products]);

  // Memoize filtered and sorted products
  const filteredProducts = useMemo(() => {
    const filtered = products.filter(product => {
      const matchesSearch = 
        debouncedSearchTerm === '' || 
        product.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        product.PartNumber.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        (product.Category && product.Category.toLowerCase() === selectedCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });

    // Sort the filtered products
    const sorted = [...filtered];
    switch(sortBy) {
      case 'name-asc':
        sorted.sort((a, b) => a.Name.localeCompare(b.Name));
        break;
      case 'name-desc':
        sorted.sort((a, b) => b.Name.localeCompare(a.Name));
        break;
      case 'part-asc':
        sorted.sort((a, b) => a.PartNumber.localeCompare(b.PartNumber));
        break;
      case 'part-desc':
        sorted.sort((a, b) => b.PartNumber.localeCompare(a.PartNumber));
        break;
      case 'category':
        sorted.sort((a, b) => (a.Category || '').localeCompare(b.Category || ''));
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
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

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
      <div className={styles.filterBar}>
        <div className={styles.searchRow}>
          <input
            type="text"
            placeholder="Search products..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label="Search products"
            autoFocus
          />
          <select 
            className={styles.sortSelect}
            value={sortBy}
            onChange={handleSortChange}
            aria-label="Sort products"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="part-asc">Part # (A-Z)</option>
            <option value="part-desc">Part # (Z-A)</option>
            <option value="category">Category</option>
          </select>
        </div>
        <div className={styles.categoryFilters}>
          <button 
            className={`${styles.filterButton} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => handleCategoryChange('all')}
            aria-pressed={selectedCategory === 'all'}
          >
            All Products ({products.length})
          </button>
          {categories.map(category => {
            const count = products.filter(p => p.Category === category).length;
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

      <div className={styles.resultsCount}>
        {debouncedSearchTerm && (
          <span>Searching for "{debouncedSearchTerm}"... </span>
        )}
        Showing {filteredProducts.length} of {products.length} products
      </div>

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
            Reset Filters
          </button>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {filteredProducts.map((product, index) => (
            <ProductCard 
              key={product.PID || index} 
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