import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ImageBlock = ({ 
    product = "null", // Product name
    tagline = "null", // Description
}) => {

    return (
    <div style={{ textAlign: "center"}}>

<Zoom>
<img alt="Main" width="65%" src={`/img/catalog/${product}-1.png`} />
</Zoom>
  <table>
    <td>
      <Zoom>
        <img alt="Back" src={`/img/catalog/${product}-2.png`} />
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Size" src={`/img/catalog/${product}-3.png`}/>
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Front" src={`/img/catalog/${product}-4.png`}/>
      </Zoom>
    </td>
    <td>
      <Zoom>
        <img alt="Back"  src={`/img/catalog/${product}-5.png`}/>
      </Zoom>
    </td>
  </table>
  <p>{tagline}</p>
</div>

  );
};

export default ImageBlock;
  
