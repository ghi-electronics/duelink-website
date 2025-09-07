import React, { useState, memo, useRef, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index }) => {
  const [selectedImage, setSelectedImage] = useState('front');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  const imageTypes = ['front', 'back', 'front-45', 'back-45', 'pencil'];
  
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

  const getImageName = (imgPath) => {
    return imgPath.replace('.png', '').replace('-front', '');
  };

  const getProductUrl = (product) => {
    return product.slug || null;
  };

  const imageName = getImageName(product.Img);
  const productUrl = getProductUrl(product);
  
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

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <div 
          className={styles.mainImageWrapper}
          onTouchStart={isMobile ? handleTouchStart : undefined}
          onTouchEnd={isMobile ? handleTouchEnd : undefined}
        >
          <Zoom zoomMargin={isMobile ? 20 : 40}>
            <LazyImage 
              src={`/img/catalog/${imageName}-${selectedImage}.png`} 
              alt={`${product.Name} ${selectedImage}`}
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
          <div className={styles.imageThumbs}>
            {imageTypes.map(imageType => (
              <button 
                key={imageType}
                className={`${styles.thumbButton} ${selectedImage === imageType ? styles.activeThumb : ''}`}
                onClick={() => setSelectedImage(imageType)}
                aria-label={`${imageType} view`}
              >
                <LazyImage 
                  src={`/img/catalog/${imageName}-${imageType}.png`} 
                  alt={imageType}
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className={styles.productDetails}>
        {productUrl ? (
          <a href={productUrl} className={styles.productLink}>
            <h3 className={styles.productTitle}>{product.Name}</h3>
          </a>
        ) : (
          <h3 className={styles.productTitle}>{product.Name}</h3>
        )}
        
        <div className={styles.productMeta}>
          {!isMobile && (
            <>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Part Number</span>
                <span className={styles.metaValue}>{product.PartNumber}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Product ID</span>
                <span className={styles.metaValue}>{product.PID}</span>
              </div>
            </>
          )}
          {product.Category && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaValue}>{product.Category}</span>
            </div>
          )}
        </div>

        {productUrl && (
          <a 
            href={productUrl} 
            className={`${styles.viewDetailsBtn} ${isMobile ? styles.mobileViewDetailsBtn : ''}`}
          >
            View Details →
          </a>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;