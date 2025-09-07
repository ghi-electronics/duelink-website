const fs = require('fs');
const path = require('path');

const imageDir = './static/img/catalog';

// Get all files
const files = fs.readdirSync(imageDir);

// Filter files that still have old naming convention
const oldFormatFiles = files.filter(f => 
  f.includes('-front') || 
  f.includes('-back') || 
  f.includes('-pencil') || 
  f.includes('-45')
);

console.log(`Found ${oldFormatFiles.length} files to rename\n`);

// Group files by product
const products = {};
oldFormatFiles.forEach(file => {
  const baseName = file
    .replace('-front-45.png', '')
    .replace('-back-45.png', '')
    .replace('-front.png', '')
    .replace('-back.png', '')
    .replace('-pencil.png', '');
  
  if (!products[baseName]) {
    products[baseName] = [];
  }
  products[baseName].push(file);
});

let renamed = 0;
let failed = 0;

// Rename files for each product
Object.keys(products).forEach(productBase => {
  const productFiles = products[productBase];
  
  console.log(`\nProcessing: ${productBase}`);
  console.log(`  Files: ${productFiles.join(', ')}`);
  
  // Map old names to new numbers
  const renameMap = {
    [`${productBase}-front.png`]: `${productBase}-1.png`,
    [`${productBase}-back.png`]: `${productBase}-2.png`,
    [`${productBase}-pencil.png`]: `${productBase}-3.png`,
    [`${productBase}-front-45.png`]: `${productBase}-4.png`,
    [`${productBase}-back-45.png`]: `${productBase}-5.png`
  };
  
  productFiles.forEach(oldFile => {
    const newFile = renameMap[oldFile];
    if (newFile) {
      const oldPath = path.join(imageDir, oldFile);
      const newPath = path.join(imageDir, newFile);
      
      try {
        // Check if target already exists
        if (fs.existsSync(newPath)) {
          console.log(`  ⚠️  Target exists, skipping: ${oldFile} -> ${newFile}`);
        } else {
          fs.renameSync(oldPath, newPath);
          console.log(`  ✅ Renamed: ${oldFile} -> ${newFile}`);
          renamed++;
        }
      } catch (error) {
        console.error(`  ❌ Failed: ${oldFile} -> ${newFile}: ${error.message}`);
        failed++;
      }
    } else {
      console.log(`  ⚠️  No mapping for: ${oldFile}`);
    }
  });
});

console.log('\n📊 Summary:');
console.log(`   ✅ Renamed: ${renamed} files`);
console.log(`   ❌ Failed: ${failed} files`);
console.log(`   ⚠️  Skipped: ${oldFormatFiles.length - renamed - failed} files`);