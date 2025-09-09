import React, { useState, memo, useRef, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const totalImages = 5; // Total number of images (1-5)
  
  // Generate clean part number for image paths
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  

  const generateSlug = (partNumber) => {
    // Remove GDL- prefix and convert to lowercase
    return partNumber
      .replace(/^GDL-/, '')
      .toLowerCase();
  };

  const productSlug = generateSlug(product.partNumber);
  const productUrl = `/docs/products/${productSlug}`;
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };
  
  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0 && currentImageIndex < totalImages - 1) {
        // Swipe left - next image
        setCurrentImageIndex(prev => prev + 1);
      } else if (diff < 0 && currentImageIndex > 0) {
        // Swipe right - previous image
        setCurrentImageIndex(prev => prev - 1);
      }
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(prev => prev - 1);
    } else {
      setCurrentImageIndex(totalImages - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < totalImages - 1) {
      setCurrentImageIndex(prev => prev + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  return (
    <div 
      className={styles.productCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <div 
          className={styles.mainImageWrapper}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <Zoom zoomMargin={isMobile ? 20 : 40}>
            <LazyImage 
              src={`/img/catalog/${cleanPN}-${currentImageIndex + 1}.png`} 
              alt={`${product.name} view ${currentImageIndex + 1}`}
              className={styles.mainImage}
            />
          </Zoom>
        </div>
        
        {isMobile ? (
          <div className={styles.mobileImageIndicators}>
            {[...Array(totalImages)].map((_, idx) => (
              <button
                key={idx}
                className={`${styles.imageIndicator} ${currentImageIndex === idx ? styles.activeIndicator : ''}`}
                onClick={() => {
                  setCurrentImageIndex(idx);
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        ) : (
          <>
            {isHovered && totalImages > 1 && (
              <>
                <button 
                  className={styles.imageNavPrev}
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  className={styles.imageNavNext}
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
                <div className={styles.imageThumbs}>
                  {[...Array(totalImages)].map((_, idx) => (
                    <button 
                      key={idx}
                      className={`${styles.thumbButton} ${currentImageIndex === idx ? styles.activeThumb : ''}`}
                      onClick={() => {
                        setCurrentImageIndex(idx);
                      }}
                      aria-label={`View ${idx + 1}`}
                    >
                      <LazyImage 
                        src={`/img/catalog/${cleanPN}-${idx + 1}.png`} 
                        alt={`View ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
      
      <div className={styles.productDetails}>
        <a href={productUrl} className={styles.productLink}>
          <h3 className={styles.productTitle}>{product.name}</h3>
        </a>
        
        <div className={styles.shortDescription}>
          {product.tagline || ''}
        </div>
        
        <div className={styles.productMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Price</span>
            <span className={styles.metaValue}>${product.price}</span>
          </div>
        </div>

        <a 
          href={productUrl} 
          className={`${styles.viewDetailsBtn} ${isMobile ? styles.mobileViewDetailsBtn : ''}`}
        >
          View Details →
        </a>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;