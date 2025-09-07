#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Generate MDX content for a single product
function generateProductMDX(product) {
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
}

// Generate category MDX page
function generateCategoryMDX(category, products) {
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
}

// Main function
async function generateCatalog() {
  console.log('🚀 Starting catalog generation...');
  
  try {
    // Read the source JSON file
    const jsonPath = path.join(__dirname, '..', 'static', 'duelink.json');
    const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const products = jsonData.boards;
    
    console.log(`📦 Found ${products.length} products`);
    
    // Create directories
    const docsPath = path.join(__dirname, '..', 'docs');
    const catalogPath = path.join(docsPath, 'catalog');
    const productsPath = path.join(catalogPath, 'products');
    
    if (!fs.existsSync(catalogPath)) {
      fs.mkdirSync(catalogPath, { recursive: true });
    }
    if (!fs.existsSync(productsPath)) {
      fs.mkdirSync(productsPath, { recursive: true });
    }
    
    // Generate individual product pages
    console.log('📝 Generating product pages...');
    let generatedFiles = [];
    
    for (const product of products) {
      const { slug, content } = generateProductMDX(product);
      const filePath = path.join(productsPath, `${slug}.mdx`);
      fs.writeFileSync(filePath, content);
      generatedFiles.push(`docs/catalog/products/${slug}.mdx`);
    }
    
    // Generate category pages
    console.log('📁 Generating category pages...');
    const categories = [...new Set(products.map(p => p.Category))].sort();
    
    for (const category of categories) {
      const { slug, content } = generateCategoryMDX(category, products);
      const filePath = path.join(catalogPath, `${slug}.mdx`);
      fs.writeFileSync(filePath, content);
      generatedFiles.push(`docs/catalog/${slug}.mdx`);
    }
    
    // Update the main catalog list page
    console.log('📋 Updating catalog index...');
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
    generatedFiles.push('docs/catalog-list.mdx');
    
    console.log(`✅ Generated ${generatedFiles.length} files successfully!`);
    
    // Optionally commit to Git
    if (process.argv.includes('--commit')) {
      console.log('📤 Committing to Git...');
      try {
        execSync('git add docs/catalog* static/duelink.json', { stdio: 'inherit' });
        execSync('git commit -m "Update product catalog from JSON"', { stdio: 'inherit' });
        console.log('✅ Changes committed successfully!');
        
        if (process.argv.includes('--push')) {
          execSync('git push', { stdio: 'inherit' });
          console.log('✅ Changes pushed to remote!');
        }
      } catch (gitError) {
        console.error('⚠️ Git operation failed:', gitError.message);
      }
    }
    
    // Summary
    console.log('\n📊 Summary:');
    console.log(`  - Products: ${products.length}`);
    console.log(`  - Categories: ${categories.length}`);
    console.log(`  - Files generated: ${generatedFiles.length}`);
    
    if (!process.argv.includes('--commit')) {
      console.log('\n💡 Tip: Use --commit flag to automatically commit changes');
      console.log('   Example: node scripts/generate-catalog.js --commit');
    }
    
  } catch (error) {
    console.error('❌ Error generating catalog:', error);
    process.exit(1);
  }
}

// Run the script
generateCatalog();