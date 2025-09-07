import React, { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

const LazyImage = ({ src, alt, className, loading = 'lazy' }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageRef, setImageRef] = useState();
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers that don't support IntersectionObserver
      setImageSrc(src);
      return;
    }

    observer.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.current.disconnect();
          }
        });
      },
      { 
        threshold: 0.01, 
        rootMargin: '50px' 
      }
    );

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (imageRef && observer.current) {
      observer.current.observe(imageRef);
    }
  }, [imageRef]);

  useEffect(() => {
    if (isIntersecting) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
      };
    }
  }, [isIntersecting, src]);

  return (
    <div ref={setImageRef} className={styles.lazyImageWrapper}>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={alt} 
          className={className}
          loading={loading}
        />
      ) : (
        <div className={styles.imagePlaceholder}>
          <div className={styles.imageSpinner}></div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;