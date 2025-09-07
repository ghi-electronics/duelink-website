const fs = require('fs');
const path = require('path');

// Load product data
const productData = JSON.parse(fs.readFileSync('./static/duelink-v3.json', 'utf8'));

const imageDir = './static/img/catalog';
let missing = [];
let found = 0;

productData.products.forEach(product => {
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
  
  // Check if first image exists
  const imagePath = path.join(imageDir, `${cleanPN}-1.png`);
  
  if (fs.existsSync(imagePath)) {
    found++;
  } else {
    missing.push({
      name: product.name,
      partNumber: product.partNumber,
      cleanPN: cleanPN,
      expectedFile: `${cleanPN}-1.png`
    });
  }
});

console.log(`\n📊 Image Check Summary:`);
console.log(`   ✅ Found: ${found} products with images`);
console.log(`   ❌ Missing: ${missing.length} products without images\n`);

if (missing.length > 0) {
  console.log('Missing images for:');
  missing.forEach(p => {
    console.log(`   - ${p.name} (${p.partNumber}) -> Expected: ${p.expectedFile}`);
  });
}