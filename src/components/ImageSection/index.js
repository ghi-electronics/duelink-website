import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageBlock = ({ 
    product = "null", // Product name
    tagline = "null", // Description
}) => {

    return (
    <div style={{ textAlign: "center"}}>
      <div style={{ 
        display: "flex", 
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ width: "100%", maxWidth: "600px" }}>
          <Zoom>
            <img alt="Main" style={{ width: "100%", maxHeight: "400px", objectFit: "contain" }} src={`/img/catalog/${product}-1.png`} />
          </Zoom>
        </div>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "row",
          gap: "10px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <Zoom>
            <img alt="Back" style={{ width: "120px", maxHeight: "120px", objectFit: "contain" }} src={`/img/catalog/${product}-2.png`} />
          </Zoom>
          <Zoom>
            <img alt="Size" style={{ width: "120px", maxHeight: "120px", objectFit: "contain" }} src={`/img/catalog/${product}-3.png`}/>
          </Zoom>
          <Zoom>
            <img alt="Front" style={{ width: "120px", maxHeight: "120px", objectFit: "contain" }} src={`/img/catalog/${product}-4.png`}/>
          </Zoom>
          <Zoom>
            <img alt="Back" style={{ width: "120px", maxHeight: "120px", objectFit: "contain" }} src={`/img/catalog/${product}-5.png`}/>
          </Zoom>
        </div>
      </div>
      
      <p style={{ marginTop: "20px" }}>{tagline}</p>
    </div>

  );
};

export default ImageBlock;
  
