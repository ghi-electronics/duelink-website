import "react-medium-image-zoom/dist/styles.css";


const OrderSection = ({ 
    product = null, // Product name
    partnumber = null, // partnumber
    price = null, // price

    product2 = null, // Product name
    partnumber2 = null, // partnumber
    price2 = null, // price 

    product3 = null, // Product name
    partnumber3 = null, // partnumber
    price3 = null, // price

    product4 = null, // Product name
    partnumber4 = null, // partnumber
    price4 = null, // price

    product5 = null, // Product name
    partnumber5 = null, // partnumber
    price5 = null // price
   
}) => 
    {
        if(product5 != null)
        {
            return (
<>          
            <p
                style={{
                        backgroundColor: "lightcyan",
                        color: "black",
                        padding: "0px 0px 0px 30px",
                        }}
            >
            <h2>Ordering Info</h2>
            </p>
            <table>
            <tr>
                <th>Product</th>
                <th>Part Number</th>
                <th>Price</th>

            </tr>
            <tr>
                <td>
                    {product}
                </td>
                <td>
                    {partnumber}
                </td>
                <td>
                    {price}
                </td>
            </tr>
            <tr>
                <td>
                    {product2}
                </td>
                <td>
                    {partnumber2}
                </td>
                <td>
                    {price2}
                </td>
            </tr>
             <tr>
                <td>
                    {product3}
                </td>
                <td>
                    {partnumber3}
                </td>
                <td>
                    {price3}
                </td>
            </tr>
             <tr>
                <td>
                    {product4}
                </td>
                <td>
                    {partnumber4}
                </td>
                <td>
                    {price4}
                </td>
            </tr>
             <tr>
                <td>
                    {product5}
                </td>
                <td>
                    {partnumber5}
                </td>
                <td>
                    {price5}
                </td>
            </tr>                       
            </table>                    </>
            );
        }


        if(product4 != null)
        {
            return (
<>          
            <p
                style={{
                        backgroundColor: "lightcyan",
                        color: "black",
                        padding: "0px 0px 0px 30px",
                        }}
            >
                <h2>Ordering Info</h2>
            </p>
            <table>
            <tr>
                <th>Product</th>
                <th>Part Number</th>
                <th>Price</th>

            </tr>
            <tr>
                <td>
                    {product}
                </td>
                <td>
                    {partnumber}
                </td>
                <td>
                    {price}
                </td>
            </tr>
            <tr>
                <td>
                    {product2}
                </td>
                <td>
                    {partnumber2}
                </td>
                <td>
                    {price2}
                </td>
            </tr>
             <tr>
                <td>
                    {product3}
                </td>
                <td>
                    {partnumber3}
                </td>
                <td>
                    {price3}
                </td>
            </tr>
             <tr>
                <td>
                    {product4}
                </td>
                <td>
                    {partnumber4}
                </td>
                <td>
                    {price4}
                </td>
            </tr>              
            </table>                    </>
            );
        }

         if(product3 != null)
        {
            return (
<>          
            <p
                style={{
                        backgroundColor: "lightcyan",
                        color: "black",
                        padding: "0px 0px 0px 30px",
                        }}
            >
                <h2>Ordering Info</h2>
            </p>
            <table>
            <tr>
                <th>Product</th>
                <th>Part Number</th>
                <th>Price</th>

            </tr>
            <tr>
                <td>
                    {product}
                </td>
                <td>
                    {partnumber}
                </td>
                <td>
                    {price}
                </td>
            </tr>
            <tr>
                <td>
                    {product2}
                </td>
                <td>
                    {partnumber2}
                </td>
                <td>
                    {price2}
                </td>
            </tr>
             <tr>
                <td>
                    {product3}
                </td>
                <td>
                    {partnumber3}
                </td>
                <td>
                    {price3}
                </td>
            </tr>       
            </table>                    </>
            );
        }
        
        if(product2 != null)
        {
            return (
<>          
            <p
                style={{
                        backgroundColor: "lightcyan",
                        color: "black",
                        padding: "0px 0px 0px 30px",
                        }}
            >
                <h2>Ordering Info</h2>
            </p>
            <table>
            <tr>
                <th>Product</th>
                <th>Part Number</th>
                <th>Price</th>

            </tr>
            <tr>
                <td>
                    {product}
                </td>
                <td>
                    {partnumber}
                </td>
                <td>
                    {price}
                </td>
            </tr>
            <tr>
                <td>
                    {product2}
                </td>
                <td>
                    {partnumber2}
                </td>
                <td>
                    {price2}
                </td>
            </tr>    
            </table>                    </>
            );
        }

        if(product != null)
        {
            return (
<>          
                <p
                    style={{
                            backgroundColor: "lightcyan",
                            color: "black",
                            padding: "0px 0px 0px 30px",
                            }}
                >
                    <h2>Ordering Info</h2>
                </p>
                <table>
                <tr>
                    <th>Product</th>
                    <th>Part Number</th>
                    <th>Price</th>

                </tr>
                <tr>
                    <td>
                        {product}
                    </td>
                    <td>
                        {partnumber}
                    </td>
                    <td>
                        {price}
                    </td>
                </tr>
                </table>

                            </>
                );
  
        }

};

export default OrderSection;

  
