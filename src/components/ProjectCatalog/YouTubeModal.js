import React, { useCallback, useRef } from 'react';
import styles from './styles.module.css';

const YouTubeModal = ({ videoId, onClose }) => {
  const overlayRef = useRef(null);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  }, [onClose]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Add keyboard listener on mount
  React.useLayoutEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      ref={overlayRef}
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="YouTube video player"
    >
      <div className={styles.modalContainer}>
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close video"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className={styles.modalContent}>
          <iframe
            className={styles.youtubeIframe}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className={styles.modalHint}>Press ESC or click outside to close</p>
      </div>
    </div>
  );
};

export default YouTubeModal;
