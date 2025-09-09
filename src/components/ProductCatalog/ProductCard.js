import React, { memo } from 'react';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index }) => {
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

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <div className={styles.mainImageWrapper}>
          <LazyImage 
            src={`/img/catalog/${cleanPN}-1.png`} 
            alt={product.name}
            className={styles.mainImage}
          />
        </div>
      </div>
      
      <div className={styles.productDetails}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        
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
          className={styles.productNameBtn}
        >
          {product.name}
        </a>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;