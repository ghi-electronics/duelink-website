export interface ProductVariation {
  name: string;
  partCode: string;
  price: number;
}

export interface Product {
  id?: string;
  name: string;
  description: string;
  partNumber: string;
  category: string;
  price: number;
  variations?: ProductVariation[];
  images: {
    front: string;
    pencil: string;
    back: string;
    front45: string;
    back45: string;
  };
  overviewText: string;
  keyFeatures: string[];
  resources: {
    model3d: string;
    schematic: string;
  };
  driverCode: string;
  samples: {
    script: string;
    python: string;
    javascript: string;
    dotnet: string;
    micropython: string;
    arduino: string;
  };
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
  products: Product[];
}

// In-memory storage for products
let productsData: Product[] = [];
let initialized = false;

// Initialize products from the existing JSON file
const initializeProducts = async (): Promise<void> => {
  if (initialized) return;
  
  try {
    // Try to load from duelink.json first
    const response = await fetch('/duelink.json');
    if (response.ok) {
      const data = await response.json();
      if (data.products) {
        // Remove orderingInfo from products
        productsData = data.products.map((product: any) => {
          const { orderingInfo, ...cleanProduct } = product;
          return {
            ...cleanProduct,
            id: cleanProduct.partNumber
          };
        });
        initialized = true;
        return;
      }
    }
    throw new Error('duelink.json not found or invalid');
  } catch (error) {
    console.warn('Could not load product data from duelink.json:', error);
    initialized = true; // Prevent infinite retries
  }
};

// Get all products from memory
export const getProducts = async (): Promise<Product[]> => {
  await initializeProducts();
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
      id: product.partNumber
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
    // Remove orderingInfo if it exists
    const productsWithIds = productsData.products.map((product: any) => {
      const { orderingInfo, ...cleanProduct } = product;
      return {
        ...cleanProduct,
        id: cleanProduct.partNumber
      };
    });
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
        code_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/driver/",
        fw_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/bin/fw/"
      },
      products: products.map(p => {
        const { id: _id, ...productData } = p;
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