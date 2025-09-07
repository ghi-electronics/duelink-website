const fs = require('fs');
const path = require('path');

const imageDir = './static/img/catalog';

// Get all files with gdl- prefix
const files = fs.readdirSync(imageDir).filter(f => f.startsWith('gdl-'));

console.log(`Found ${files.length} files with gdl- prefix to rename\n`);

let renamed = 0;
let failed = 0;

files.forEach(oldFile => {
  // Remove gdl- prefix
  const newFile = oldFile.replace(/^gdl-/, '');
  
  const oldPath = path.join(imageDir, oldFile);
  const newPath = path.join(imageDir, newFile);
  
  try {
    // Check if target already exists
    if (fs.existsSync(newPath)) {
      console.log(`⚠️  Target exists, skipping: ${oldFile} -> ${newFile}`);
    } else {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ Renamed: ${oldFile} -> ${newFile}`);
      renamed++;
    }
  } catch (error) {
    console.error(`❌ Failed: ${oldFile} -> ${newFile}: ${error.message}`);
    failed++;
  }
});

console.log('\n📊 Summary:');
console.log(`   ✅ Renamed: ${renamed} files`);
console.log(`   ❌ Failed: ${failed} files`);
console.log(`   ⚠️  Skipped: ${files.length - renamed - failed} files`);