import { exportProductsToJSON } from './productService';
import fs from 'fs';
import path from 'path';

// Generate MDX content for a single product
const generateProductMDX = (product) => {
  const slug = product.Name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  
  const mdxContent = `---
title: ${product.Name}
description: ${product.Name} - Part Number ${product.PartNumber}
---

# ${product.Name}

<div style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
  <div style={{flex: '1'}}>
    <img 
      src="/img/catalog/${product.Img}" 
      alt="${product.Name}"
      style={{width: '100%', maxWidth: '400px'}}
    />
  </div>
  <div style={{flex: '1'}}>

## Product Details

- **Part Number:** ${product.PartNumber}
- **Product ID:** ${product.PID}
- **Category:** ${product.Category}
${product.Notes ? `\n### Notes\n${product.Notes}` : ''}

## Quick Links

- [View Driver Code](${product.Code ? `https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/drivers/${product.Code}` : '#'})
- [Product Support](/support)

  </div>
</div>

## Specifications

| Feature | Value |
|---------|-------|
| Part Number | ${product.PartNumber} |
| Product ID | ${product.PID} |
| Category | ${product.Category} |

## Getting Started

To use this product with DUELink, connect it to your microcomputer and use the appropriate driver code.

\`\`\`python
# Example usage
import duelink
# Initialize ${product.Name}
# See driver documentation for details
\`\`\`

## Resources

- [DUELink Documentation](/docs/intro)
- [Product Catalog](/docs/catalog-list)
- [Support Forum](https://forum.ghielectronics.com)
`;

  return { slug, content: mdxContent };
};

// Generate category MDX page
const generateCategoryMDX = (category, products) => {
  const categoryProducts = products.filter(p => p.Category === category);
  const slug = category.toLowerCase().replace(/\s+/g, '-');
  
  const mdxContent = `---
title: ${category} Products
description: Browse our ${category} products for DUELink
---

import ProductCatalog from '@site/src/components/ProductCatalog';

# ${category} Products

Browse our selection of ${category} products compatible with DUELink.

## Products in this Category

${categoryProducts.map(product => {
  const productSlug = product.Name.toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
  return `### [${product.Name}](/docs/catalog/products/${productSlug})
- Part Number: ${product.PartNumber}
- Product ID: ${product.PID}

`;
}).join('\n')}

## View All Products

<ProductCatalog category="${category}" />
`;

  return { slug, content: mdxContent };
};

// Main function to generate all MDX files
export const generateMDXFiles = async () => {
  try {
    console.log('Starting MDX generation...');
    
    // Get all products from Firestore
    const jsonData = await exportProductsToJSON();
    const products = jsonData.boards;
    
    // Create directories if they don't exist
    const docsPath = path.join(process.cwd(), 'docs');
    const catalogPath = path.join(docsPath, 'catalog');
    const productsPath = path.join(catalogPath, 'products');
    
    if (!fs.existsSync(catalogPath)) {
      fs.mkdirSync(catalogPath, { recursive: true });
    }
    if (!fs.existsSync(productsPath)) {
      fs.mkdirSync(productsPath, { recursive: true });
    }
    
    // Generate individual product pages
    const generatedFiles = [];
    for (const product of products) {
      const { slug, content } = generateProductMDX(product);
      const filePath = path.join(productsPath, `${slug}.mdx`);
      fs.writeFileSync(filePath, content);
      generatedFiles.push(filePath);
    }
    
    // Generate category pages
    const categories = [...new Set(products.map(p => p.Category))];
    for (const category of categories) {
      const { slug, content } = generateCategoryMDX(category, products);
      const filePath = path.join(catalogPath, `${slug}.mdx`);
      fs.writeFileSync(filePath, content);
      generatedFiles.push(filePath);
    }
    
    // Update the main catalog list page
    const catalogListContent = `---
title: Product Catalog
description: Browse all DUELink compatible products
---

import ProductCatalog from '@site/src/components/ProductCatalog';

# Product Catalog

Browse our complete selection of DUELink compatible products.

## Categories

${categories.map(cat => {
  const slug = cat.toLowerCase().replace(/\s+/g, '-');
  const count = products.filter(p => p.Category === cat).length;
  return `- [${cat}](/docs/catalog/${slug}) (${count} products)`;
}).join('\n')}

## All Products

<ProductCatalog />
`;
    
    const catalogListPath = path.join(docsPath, 'catalog-list.mdx');
    fs.writeFileSync(catalogListPath, catalogListContent);
    generatedFiles.push(catalogListPath);
    
    // Generate the static JSON file
    const jsonPath = path.join(process.cwd(), 'static', 'duelink.json');
    fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
    generatedFiles.push(jsonPath);
    
    console.log(`Generated ${generatedFiles.length} files successfully`);
    return generatedFiles;
    
  } catch (error) {
    console.error('Error generating MDX files:', error);
    throw error;
  }
};

// Function to be called from the browser (using a serverless function or API)
export const generateMDXFromBrowser = async () => {
  // This would typically be called through an API endpoint
  // For now, we'll export the JSON data that can be used to generate files
  try {
    const jsonData = await exportProductsToJSON();
    return {
      success: true,
      data: jsonData,
      message: 'Data exported successfully. Use server-side script to generate MDX files.'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};