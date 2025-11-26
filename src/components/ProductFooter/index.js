import React from 'react';
import styles from './styles.module.css';

const ProductFooter = () => {
  return (
    <div className={styles.productFooter}>
      <a href="/distributors" className={styles.footerBtn}>
        Distributors
      </a>
      <a href="/docs/catalog/intro" className={styles.footerBtn}>
        Catalog Home
      </a>
    </div>
  );
};

export default ProductFooter;