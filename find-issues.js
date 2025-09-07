const fs = require('fs');

// Load product data
const productData = JSON.parse(fs.readFileSync('./static/duelink-v3.json', 'utf8'));

console.log('\n🔍 Checking for issues...\n');

// Check for duplicate part numbers
const partNumbers = {};
const duplicates = [];

productData.products.forEach(product => {
  if (partNumbers[product.partNumber]) {
    duplicates.push({
      partNumber: product.partNumber,
      product1: partNumbers[product.partNumber],
      product2: product.name
    });
  } else {
    partNumbers[product.partNumber] = product.name;
  }
});

if (duplicates.length > 0) {
  console.log('❌ Duplicate Part Numbers:');
  duplicates.forEach(d => {
    console.log(`   ${d.partNumber}: "${d.product1}" and "${d.product2}"`);
  });
  console.log();
}

// Check for missing categories
const missingCategory = productData.products.filter(p => !p.category || p.category === '');
if (missingCategory.length > 0) {
  console.log('❌ Missing Categories:');
  missingCategory.forEach(p => {
    console.log(`   ${p.name}`);
  });
  console.log();
}

// Check for invalid prices
const invalidPrice = productData.products.filter(p => !p.price || p.price <= 0);
if (invalidPrice.length > 0) {
  console.log('❌ Invalid Prices:');
  invalidPrice.forEach(p => {
    console.log(`   ${p.name}: $${p.price}`);
  });
  console.log();
}

// Check for products without images
const imageDir = './static/img/catalog';
const noImages = [];

productData.products.forEach(product => {
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
  
  const imagePath = `${imageDir}/${cleanPN}-1.png`;
  if (!fs.existsSync(imagePath)) {
    noImages.push({
      name: product.name,
      partNumber: product.partNumber,
      expectedImage: `${cleanPN}-1.png`
    });
  }
});

if (noImages.length > 0) {
  console.log('❌ Products Without Images:');
  noImages.forEach(p => {
    console.log(`   ${p.name} (${p.partNumber}) -> Missing: ${p.expectedImage}`);
  });
  console.log();
}

// Summary
console.log('📊 Summary:');
console.log(`   Total Products: ${productData.products.length}`);
console.log(`   Duplicate Part Numbers: ${duplicates.length}`);
console.log(`   Missing Categories: ${missingCategory.length}`);
console.log(`   Invalid Prices: ${invalidPrice.length}`);
console.log(`   Missing Images: ${noImages.length}`);