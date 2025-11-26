import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductImageSelector = ({ images, partNumber, productName }) => {
  // Support both legacy (images object) and new (partNumber) props
  const imageList = images 
    ? [
        { key: 1, src: images.front, alt: 'View 1' },
        { key: 2, src: images.back, alt: 'View 2' },
        { key: 3, src: images.pencil, alt: 'View 3' },
        { key: 4, src: images.front45, alt: 'View 4' },
        { key: 5, src: images.back45, alt: 'View 5' }
      ].filter(img => img.src && img.src.trim())
    : [
        { key: 1, src: `${partNumber}-1.webp`, alt: 'View 1' },
        { key: 2, src: `${partNumber}-2.webp`, alt: 'View 2' },
        { key: 3, src: `${partNumber}-3.webp`, alt: 'View 3' },
        { key: 4, src: `${partNumber}-4.webp`, alt: 'View 4' },
        { key: 5, src: `${partNumber}-5.webp`, alt: 'View 5' }
      ];

  const [selectedImage, setSelectedImage] = useState(imageList[0]?.src);
  
  // Ensure component re-renders properly in MDX
  useEffect(() => {
    setSelectedImage(imageList[0]?.src);
  }, [images, partNumber]);

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      margin: '30px 0',
      maxWidth: '600px'
    }}>
      {/* Main Image with Zoom */}
      <div style={{
        position: 'relative',
        marginBottom: '20px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e1e5e9',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Zoom>
          <img 
            src={`/img/catalog/${selectedImage}`} 
            alt={productName} 
            style={{
              width: '350px',
              height: '350px',
              objectFit: 'contain',
              backgroundColor: '#fafbfc',
              display: 'block',
              cursor: 'zoom-in'
            }} 
          />
        </Zoom>
      </div>
      
      {/* Thumbnail Selector */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {imageList.map(({ key, src, alt }) => (
          <button
            key={key}
            onClick={() => handleImageClick(src)}
            style={{
              padding: '4px',
              border: '3px solid',
              borderColor: selectedImage === src ? '#0969da' : 'transparent',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              boxShadow: selectedImage === src ? '0 0 0 2px rgba(9, 105, 218, 0.2)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedImage !== src) {
                e.target.style.borderColor = '#0969da';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedImage !== src) {
                e.target.style.borderColor = 'transparent';
              }
            }}
          >
            <img 
              src={`/img/catalog/${src}`} 
              alt={alt}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                backgroundColor: '#fafbfc',
                borderRadius: '4px',
                display: 'block'
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSelector;