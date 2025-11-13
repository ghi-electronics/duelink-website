import React, { memo } from 'react';
import LazyImage from './LazyImage';
import styles from './styles.module.css';

const ProductCard = memo(({ product, index, onCategoryClick }) => {
  
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

  // Main product image URL
  const mainImageUrl = `/img/catalog/${cleanPN}-1.webp`;

  return (
    <>
      <div className={styles.productCard}>
        <a href={productUrl} className={styles.mainThumbnailContainer}>
          <LazyImage
            src={mainImageUrl}
            alt={product.name}
            className={styles.mainThumbnailImage}
          />
        </a>

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
    </>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;