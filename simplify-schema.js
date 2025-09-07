const fs = require('fs');

function simplifyProductSchema() {
  console.log('🔄 Simplifying Product JSON Schema...\n');
  
  // Load current complex schema
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v2.json', 'utf8'));
  
  console.log(`📊 Current Schema Stats:`);
  console.log(`   Products: ${productData.products.length}`);
  console.log(`   Complex fields per product: ~15-20`);
  
  // Transform to simplified schema
  const simplifiedData = {
    metadata: {
      ...productData.metadata,
      version: "0.4",
      timestamp: new Date().toISOString().split('T')[0],
      description: "Simplified product schema with convention-based resource resolution"
    },
    products: productData.products.map(product => ({
      name: product.name,
      partNumber: product.partNumber,
      category: product.category,
      price: product.price,
      shortDescription: product.shortDescription
    }))
  };
  
  console.log(`\n✨ Simplified Schema:`);
  console.log(`   Essential fields per product: 5`);
  console.log(`   Reduction: ~75% fewer fields`);
  
  // Save simplified schema
  const outputPath = './static/duelink-v3.json';
  fs.writeFileSync(outputPath, JSON.stringify(simplifiedData, null, 2));
  
  console.log(`\n💾 Saved simplified schema: ${outputPath}`);
  
  // Show example comparison
  console.log(`\n📄 Example Product Comparison:`);
  console.log(`\nBEFORE (Complex):`);
  console.log(JSON.stringify(productData.products[0], null, 2).substring(0, 500) + '...');
  
  console.log(`\nAFTER (Simplified):`);
  console.log(JSON.stringify(simplifiedData.products[0], null, 2));
  
  // Convention-based resolution explanation
  console.log(`\n🏗️  Convention-Based Resolution:`);
  const exampleProduct = simplifiedData.products.find(p => p.name.includes('LED S404'));
  if (exampleProduct) {
    const slug = exampleProduct.name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    const cleanPN = exampleProduct.partNumber.toLowerCase().replace(/\[.*?\]/g, '').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-');
    
    console.log(`   Product: ${exampleProduct.name}`);
    console.log(`   Derived paths:`);
    console.log(`   • Images: /img/catalog/${cleanPN}-{1-5}.png`);  
    console.log(`   • 3D Model: /3d/${cleanPN}.step`);
    console.log(`   • Schematic: /sch/${cleanPN}.pdf`);
    console.log(`   • Samples: /code/samples/{category}/${slug}.{ext}`);
  }
  
  return simplifiedData;
}

// Main execution
if (require.main === module) {
  simplifyProductSchema();
}