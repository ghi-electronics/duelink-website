import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageBlock = ({ 
    product = "null", // Product name
    tagline = "null", // Description
}) => {

    return (
    <div style={{ textAlign: "center"}}>

<Zoom>
<img alt="Main" width="65%" src={`/img/catalog/${product}-front.png`} />
</Zoom>
  <table>
    <td>
      <Zoom>
        <img alt="Back" src={`/img/catalog/${product}-back.png`} />
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Size" src={`/img/catalog/${product}-pencil.png`}/>
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Front" src={`/img/catalog/${product}-front-45.png`}/>
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Back"  src={`/img/catalog/${product}-back-45.png`}/>
      </Zoom>
    </td>
  </table>
  <p>{tagline}</p>
</div>

  );
};

export default ImageBlock;
  
