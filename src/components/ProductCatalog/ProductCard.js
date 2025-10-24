import React, { memo, useState } from 'react';
import ReactDOM from 'react-dom';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index, onCategoryClick }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  
  // Generate clean part number for image paths
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  const generateSlug = (partNumber) => {
    // Remove GDL- prefix and convert to lowercase
    return partNumber
      .replace(/^GDL-/, '')
      .toLowerCase();
  };

  const productSlug = generateSlug(product.partNumber);
  const productUrl = `/docs/products/${productSlug}`;
  
  // Array of all image URLs
  const imageUrls = [
    `/img/catalog/${cleanPN}-1.png`,
    `/img/catalog/${cleanPN}-2.png`,
    `/img/catalog/${cleanPN}-3.png`,
    `/img/catalog/${cleanPN}-4.png`,
    `/img/catalog/${cleanPN}-5.png`
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setShowLightbox(true);
  };

  const handleThumbnailClick = (e, index) => {
    e.stopPropagation();
    setMainImageIndex(index);
  };

  const handleMainPrevious = (e) => {
    e.stopPropagation();
    setMainImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const handleMainNext = (e) => {
    e.stopPropagation();
    setMainImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goToPrevious(e);
    if (e.key === 'ArrowRight') goToNext(e);
    if (e.key === 'Escape') closeLightbox();
  };

  React.useEffect(() => {
    if (showLightbox) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showLightbox, currentImageIndex]);

  return (
    <>
      <div className={styles.productCard}>
        <div className={styles.mainThumbnailContainer} onClick={() => openLightbox(mainImageIndex)}>
          <LazyImage 
            src={imageUrls[mainImageIndex]} 
            alt={product.name}
            className={styles.mainThumbnailImage}
          />
          <button className={styles.mainImageNavPrev} onClick={handleMainPrevious} aria-label="Previous image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className={styles.mainImageNavNext} onClick={handleMainNext} aria-label="Next image">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className={styles.additionalThumbnails}>
          {imageUrls.map((url, idx) => (
            <div 
              key={idx} 
              onClick={(e) => handleThumbnailClick(e, idx)}
              className={`${styles.thumbnailWrapper} ${idx === mainImageIndex ? styles.activeThumbnailWrapper : ''}`}
            >
              <LazyImage 
                src={url} 
                alt={`${product.name} view ${idx + 1}`}
                className={styles.smallThumbnail}
              />
            </div>
          ))}
        </div>

        {product.tagline && (
          <p className={styles.productTagline}>{product.tagline}</p>
        )}

        <div className={styles.productPriceRow}>
          {product.category && (
            <button 
              className={styles.categoryChip}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onCategoryClick) {
                  onCategoryClick(product.category);
                }
              }}
              aria-label={`Filter by ${product.category} category`}
            >
              {product.category}
            </button>
          )}
          <div className={styles.productPrice}>
            ${product.variations? product.variations[0].price.toFixed(2).concat('✢') : product.price?.toFixed(2)}
          </div>
        </div>

        <a 
          href={productUrl} 
          className={styles.productNameBtn}
        >
          {product.name}
        </a>
      </div>

      {showLightbox && ReactDOM.createPortal(
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>×</button>
          <button className={styles.lightboxPrev} onClick={goToPrevious}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className={styles.lightboxNext} onClick={goToNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          
          <div className={styles.lightboxHeader}>
            <h2 className={styles.lightboxTitle}>{product.name}</h2>
            {product.tagline && <p className={styles.lightboxTagline}>{product.tagline}</p>}
          </div>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={imageUrls[currentImageIndex]} 
              alt={`${product.name} view ${currentImageIndex + 1}`}
              className={styles.lightboxImage}
            />
          </div>
          
          <div className={styles.lightboxThumbnails}>
            {imageUrls.map((url, idx) => (
              <button
                key={idx}
                className={`${styles.lightboxThumbnail} ${idx === currentImageIndex ? styles.activeThumbnail : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(idx);
                }}
              >
                <img 
                  src={url} 
                  alt={`Thumbnail ${idx + 1}`}
                  className={styles.lightboxThumbnailImage}
                />
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;