import React, { useState, useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductImageSelector = ({ images, partNumber, productName }) => {
  // Support both legacy (images object) and new (partNumber) props
  const imageList = images 
    ? [
        { key: 'front', src: images.front, alt: 'Front view' },
        { key: 'back', src: images.back, alt: 'Back view' },
        { key: 'pencil', src: images.pencil, alt: 'Pencil view' },
        { key: 'front45', src: images.front45, alt: 'Front 45° view' },
        { key: 'back45', src: images.back45, alt: 'Back 45° view' }
      ].filter(img => img.src && img.src.trim())
    : [
        { key: 'front', src: `${partNumber}-1.png`, alt: 'Front view' },
        { key: 'back', src: `${partNumber}-2.png`, alt: 'Back view' },
        { key: 'pencil', src: `${partNumber}-3.png`, alt: 'Pencil view' },
        { key: 'front45', src: `${partNumber}-4.png`, alt: 'Front 45° view' },
        { key: 'back45', src: `${partNumber}-5.png`, alt: 'Back 45° view' }
      ];

  const [selectedImage, setSelectedImage] = useState(imageList[0]?.src);
  
  // Ensure component re-renders properly in MDX
  useEffect(() => {
    setSelectedImage(imageList[0]?.src);
  }, [images?.front, partNumber]);

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