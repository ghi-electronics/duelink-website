const fs = require('fs');
const path = require('path');

// Load product data
const productData = JSON.parse(fs.readFileSync('./static/duelink-v3.json', 'utf8'));

// Check samples directory
const samplesDir = './static/code/samples/script';

// Create a mapping of product names to sample files
const mapping = {};
let found = 0;
let missing = 0;

productData.products.forEach(product => {
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
  
  const slug = product.name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  
  const category = product.category.toLowerCase();
  
  // Map category names (products use 'LED' but folder is 'led')
  const categoryMap = {
    'led': 'led',
    'leds': 'led',
    'microcomputer': 'microcomputer',
    'adapter': 'adapter',
    'hmi': 'hmi',
    'sensor': 'sensor',
    'actuator': 'actuator',
    'com': 'com',
    'display': 'display',
    'sound': 'sound',
    'storage': 'storage',
    'vision': 'vision',
    'wireless': 'wireless',
    'special': 'special'
  };
  
  const folderCategory = categoryMap[category] || category;
  
  // Try different possible file names
  const possibleNames = [
    slug,
    cleanPN,
    product.name.toLowerCase().replace(/\s+/g, '-'),
    // Special cases for specific products
    slug.replace(/-rev-[a-z]$/, ''), // Remove rev suffix
    cleanPN.replace(/-[a-z]$/, ''), // Remove single letter suffix
  ];
  
  let foundFile = null;
  
  for (const name of possibleNames) {
    const filePath = path.join(samplesDir, folderCategory, `${name}.txt`);
    if (fs.existsSync(filePath)) {
      foundFile = `${folderCategory}/${name}.txt`;
      break;
    }
  }
  
  if (!foundFile) {
    // Check if any file exists in the category folder
    const categoryPath = path.join(samplesDir, folderCategory);
    if (fs.existsSync(categoryPath)) {
      const files = fs.readdirSync(categoryPath);
      // Try to find a close match
      for (const file of files) {
        const baseName = file.replace('.txt', '');
        if (slug.includes(baseName) || baseName.includes(slug.split('-')[0])) {
          foundFile = `${folderCategory}/${file}`;
          break;
        }
      }
    }
  }
  
  if (foundFile) {
    found++;
    mapping[product.name] = foundFile;
    console.log(`✅ ${product.name}: ${foundFile}`);
  } else {
    missing++;
    console.log(`❌ ${product.name}: NO SAMPLE FOUND (tried: ${folderCategory}/${slug}.txt)`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Found: ${found}`);
console.log(`   Missing: ${missing}`);

// Save mapping for reference
fs.writeFileSync('./sample-mapping.json', JSON.stringify(mapping, null, 2));
console.log('\n💾 Mapping saved to sample-mapping.json');