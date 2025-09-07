import React, { useState, memo, useRef, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index }) => {
  const [selectedImage, setSelectedImage] = useState('front');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const imageTypes = ['front', 'back', 'pencil', 'front45', 'back45'];
  
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
  
  useEffect(() => {
    setSelectedImage(imageTypes[currentImageIndex]);
  }, [currentImageIndex]);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  };

  const productSlug = generateSlug(product.name);
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
      if (diff > 0 && currentImageIndex < imageTypes.length - 1) {
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
      setCurrentImageIndex(imageTypes.length - 1);
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < imageTypes.length - 1) {
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
              alt={`${product.name} ${selectedImage}`}
              className={styles.mainImage}
            />
          </Zoom>
        </div>
        
        {isMobile ? (
          <div className={styles.mobileImageIndicators}>
            {imageTypes.map((_, idx) => (
              <button
                key={idx}
                className={`${styles.imageIndicator} ${currentImageIndex === idx ? styles.activeIndicator : ''}`}
                onClick={() => {
                  setCurrentImageIndex(idx);
                  setSelectedImage(imageTypes[idx]);
                }}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        ) : (
          <>
            {isHovered && imageTypes.length > 1 && (
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
                  {imageTypes.map((imageType, idx) => (
                    <button 
                      key={imageType}
                      className={`${styles.thumbButton} ${selectedImage === imageType ? styles.activeThumb : ''}`}
                      onClick={() => {
                        setSelectedImage(imageType);
                        setCurrentImageIndex(idx);
                      }}
                      aria-label={`${imageType} view`}
                    >
                      <LazyImage 
                        src={`/img/catalog/${cleanPN}-${idx + 1}.png`} 
                        alt={imageType}
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
        
        <p className={styles.shortDescription}>{product.shortDescription}</p>
        
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