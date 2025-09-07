import React, { useState, memo } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index }) => {
  const [selectedImage, setSelectedImage] = useState('front');

  const getImageName = (imgPath) => {
    return imgPath.replace('.png', '').replace('-front', '');
  };

  const getProductUrl = (product) => {
    return product.slug || null;
  };

  const imageName = getImageName(product.Img);
  const productUrl = getProductUrl(product);

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <div className={styles.mainImageWrapper}>
          <Zoom>
            <img 
              src={`/img/catalog/${imageName}-${selectedImage}.png`} 
              alt={`${product.Name} ${selectedImage}`}
              className={styles.mainImage}
              loading="lazy"
            />
          </Zoom>
        </div>
        
        <div className={styles.imageThumbs}>
          {['front', 'back', 'front-45', 'back-45', 'pencil'].map(imageType => (
            <button 
              key={imageType}
              className={`${styles.thumbButton} ${selectedImage === imageType ? styles.activeThumb : ''}`}
              onClick={() => setSelectedImage(imageType)}
              aria-label={`${imageType} view`}
            >
              <img 
                src={`/img/catalog/${imageName}-${imageType}.png`} 
                alt={imageType}
                loading="lazy"
              />
            </button>
          ))}
        </div>
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
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Part Number</span>
            <span className={styles.metaValue}>{product.PartNumber}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Product ID</span>
            <span className={styles.metaValue}>{product.PID}</span>
          </div>
          {product.Category && (
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Category</span>
              <span className={styles.metaValue}>{product.Category}</span>
            </div>
          )}
        </div>

        {productUrl && (
          <a href={productUrl} className={styles.viewDetailsBtn}>
            View Details →
          </a>
        )}
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;