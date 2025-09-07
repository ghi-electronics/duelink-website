import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  setDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase-config';

const COLLECTION_NAME = 'products';

// Get all products
export const getProducts = async () => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('Name'));
    const querySnapshot = await getDocs(q);
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

// Add a new product
export const addProduct = async (product) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return { id: docRef.id, ...product };
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (id, product) => {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(productRef, product);
    return { id, ...product };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return id;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Migrate products from JSON to Firestore
export const migrateProducts = async (productsData) => {
  try {
    const promises = productsData.boards.map(async (product) => {
      // Use PartNumber as document ID for consistency
      const docRef = doc(db, COLLECTION_NAME, product.PartNumber);
      await setDoc(docRef, product);
    });
    
    await Promise.all(promises);
    console.log('Migration completed successfully');
    return true;
  } catch (error) {
    console.error('Error migrating products:', error);
    throw error;
  }
};

// Export products to JSON format
export const exportProductsToJSON = async () => {
  try {
    const products = await getProducts();
    
    // Read the existing duelink.json structure for metadata
    const response = await fetch('/duelink.json');
    const existingData = await response.json();
    
    // Build the JSON structure matching the existing format
    const jsonData = {
      metadata: existingData.metadata || {
        author: "GHI Electronics",
        version: "0.2",
        timestamp: new Date().toISOString().split('T')[0],
        image_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/img/catalog/",
        code_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/drivers/",
        fw_url_base: "https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/bin/fw/"
      },
      boards: products.map(p => {
        // Remove Firebase ID from the exported data
        const { id, ...productData } = p;
        return productData;
      })
    };
    
    return jsonData;
  } catch (error) {
    console.error('Error exporting products:', error);
    throw error;
  }
};