export interface Product {
  id?: string;
  Name: string;
  PartNumber: string;
  PID: string;
  Category: string;
  Img: string;
  Code: string;
  Notes?: string;
  CoProc?: string;
}

export interface DuelinkJSON {
  metadata: {
    author: string;
    version: string;
    timestamp: string;
    image_url_base: string;
    code_url_base: string;
    fw_url_base: string;
  };
  boards: Product[];
}

// In-memory storage for products
let productsData: Product[] = [];

// Get all products from memory
export const getProducts = async (): Promise<Product[]> => {
  return [...productsData];
};

// Save products to memory
const saveProducts = async (products: Product[]): Promise<void> => {
  productsData = [...products];
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const products = await getProducts();
    const newProduct = {
      ...product,
      id: `${product.PartNumber}-${Date.now()}`
    };
    products.push(newProduct);
    await saveProducts(products);
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  try {
    const products = await getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    products[index] = { ...products[index], ...updates };
    await saveProducts(products);
    return products[index];
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id: string): Promise<string> => {
  try {
    const products = await getProducts();
    const filtered = products.filter(p => p.id !== id);
    await saveProducts(filtered);
    return id;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Import products from JSON
export const importProducts = async (productsData: DuelinkJSON): Promise<boolean> => {
  try {
    // Add IDs to imported products
    const productsWithIds = productsData.boards.map((product, index) => ({
      ...product,
      id: `${product.PartNumber}-${index}`
    }));
    await saveProducts(productsWithIds);
    console.log('Import completed successfully');
    return true;
  } catch (error) {
    console.error('Error importing products:', error);
    throw error;
  }
};

// Export products to JSON format
export const exportProductsToJSON = async (): Promise<DuelinkJSON> => {
  try {
    const products = await getProducts();
    return {
      metadata: {
        author: "GHI Electronics",
        version: "0.2",
        timestamp: new Date().toISOString().split('T')[0],
        image_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/img/catalog/",
        code_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/drivers/",
        fw_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/bin/fw/"
      },
      boards: products.map(p => {
        const { id, ...productData } = p;
        return productData;
      })
    };
  } catch (error) {
    console.error('Error exporting products:', error);
    throw error;
  }
};

// For backward compatibility
export const migrateProducts = importProducts;