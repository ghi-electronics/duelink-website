import React, { useState, useEffect } from 'react';
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageBlock = ({ 
    product = "null", // Product name
    tagline = "null", // Description
}) => {
    const [availableImages, setAvailableImages] = useState([]);
    const [mainImage, setMainImage] = useState(null);
    
    useEffect(() => {
        const checkImages = async () => {
            const images = [];
            const mainImg = `/img/catalog/${product}-1.webp`;
            
            // Check main image
            try {
                const response = await fetch(mainImg, { method: 'HEAD' });
                if (response.ok) {
                    setMainImage(mainImg);
                }
            } catch (error) {
                console.log(`Main image not found for ${product}`);
            }
            
            // Check thumbnail images (2-5)
            for (let i = 2; i <= 5; i++) {
                const imgPath = `/img/catalog/${product}-${i}.webp`;
                try {
                    const response = await fetch(imgPath, { method: 'HEAD' });
                    if (response.ok) {
                        images.push({
                            src: imgPath,
                            alt: `View ${i}`,
                            index: i
                        });
                    }
                } catch (error) {
                    // Image doesn't exist, skip it
                }
            }
            
            setAvailableImages(images);
        };
        
        if (product !== "null") {
            checkImages();
        }
    }, [product]);

    // If no images are available, don't render anything
    if (!mainImage && availableImages.length === 0) {
        return (
            <div style={{ textAlign: "center"}}>
                <p style={{ marginTop: "20px" }}>{tagline}</p>
            </div>
        );
    }

    return (
    <div style={{ textAlign: "center"}}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {mainImage && (
          <div style={{ width: "100%", maxWidth: "600px" }}>
            <Zoom>
              <img alt="Main" style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} src={mainImage} />
            </Zoom>
          </div>
        )}
        
        {availableImages.length > 0 && (
          <div style={{ 
            display: "flex", 
            flexDirection: "row",
            gap: "10px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {availableImages.map((img) => (
              <Zoom key={img.index}>
                <img alt={img.alt} style={{ width: "120px", maxHeight: "120px", objectFit: "contain" }} src={img.src} />
              </Zoom>
            ))}
          </div>
        )}
      </div>
      
      <p style={{ marginTop: "20px" }}>{tagline}</p>
    </div>

  );
};

export default ImageBlock;
  
