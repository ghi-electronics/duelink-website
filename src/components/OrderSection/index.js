import "react-medium-image-zoom/dist/styles.css";

const OrderSection = (props) => {
    // Collect all products from props
    const products = [];
    
    // Handle first product (no number suffix)
    if (props.product) {
        products.push({
            product: props.product,
            partnumber: props.partnumber,
            price: props.price
        });
    }
    
    // Handle numbered products (product2, product3, etc.)
    for (let i = 2; i <= 5; i++) {
        const productKey = `product${i}`;
        const partnumberKey = `partnumber${i}`;
        const priceKey = `price${i}`;
        
        if (props[productKey]) {
            products.push({
                product: props[productKey],
                partnumber: props[partnumberKey],
                price: props[priceKey]
            });
        }
    }
    
    // If no products, return null
    if (products.length === 0) {
        return null;
    }
    
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
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Part Number</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product}</td>
                            <td>{item.partnumber}</td>
                            <td>{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default OrderSection;