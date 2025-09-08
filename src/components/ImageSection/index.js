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
        flexDirection: "row",
        gap: "20px",
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap"
      }}>
        <div style={{ flex: "1 1 auto", maxWidth: "65%" }}>
          <Zoom>
            <img alt="Main" width="100%" src={`/img/catalog/${product}-1.png`} />
          </Zoom>
        </div>
        
        <div style={{ 
          display: "flex", 
          flexDirection: "column",
          gap: "10px",
          flex: "0 0 auto"
        }}>
          <Zoom>
            <img alt="Back" width="120px" src={`/img/catalog/${product}-2.png`} />
          </Zoom>
          <Zoom>
            <img alt="Size" width="120px" src={`/img/catalog/${product}-3.png`}/>
          </Zoom>
          <Zoom>
            <img alt="Front" width="120px" src={`/img/catalog/${product}-4.png`}/>
          </Zoom>
          <Zoom>
            <img alt="Back" width="120px" src={`/img/catalog/${product}-5.png`}/>
          </Zoom>
        </div>
      </div>
      
      <p style={{ marginTop: "20px" }}>{tagline}</p>
    </div>

  );
};

export default ImageBlock;
  
