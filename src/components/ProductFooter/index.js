import React from 'react';
import styles from './styles.module.css';

const ProductFooter = () => {
  return (
    <div className={styles.productFooter}>
      <a href="/buy" className={styles.footerBtn}>
        Buy Now!
      </a>
      <a href="/docs/catalog/products" className={styles.footerBtn}>
        Catalog Home
      </a>
    </div>
  );
};

export default ProductFooter;