const fs = require('fs');
const path = require('path');

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function cleanPartNumber(partNumber) {
  return partNumber
    .toLowerCase()
    .replace(/\[.*?\]/g, '') // Remove brackets like [  ]
    .replace(/[^a-z0-9-]/g, '') // Remove special chars except hyphens
    .replace(/-+/g, '-'); // Collapse multiple hyphens
}

function analyzeImageRenaming() {
  console.log('🔍 Analyzing Image File Renaming Requirements...\n');
  
  // Load product data
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v2.json', 'utf8'));
  
  const catalogDir = './static/img/catalog';
  const existingFiles = fs.readdirSync(catalogDir);
  
  let renamingPlan = [];
  let missingFiles = [];
  
  productData.products.forEach(product => {
    const slug = generateSlug(product.name);
    const cleanPN = cleanPartNumber(product.partNumber);
    
    console.log(`\n📦 Product: ${product.name}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Part Number: ${product.partNumber} → ${cleanPN}`);
    
    // Current image names from JSON
    const currentImages = [
      product.images.front,
      product.images.back,
      product.images.pencil,
      product.images.front45,
      product.images.back45
    ];
    
    // Target part-number-based images  
    const partNumberImages = [
      `${cleanPN}-1.png`, // front
      `${cleanPN}-2.png`, // back
      `${cleanPN}-3.png`, // pencil
      `${cleanPN}-4.png`, // front45
      `${cleanPN}-5.png`  // back45
    ];
    
    console.log('   Current → Target:');
    
    for (let i = 0; i < currentImages.length; i++) {
      const currentName = currentImages[i];
      const targetName = partNumberImages[i];
      
      if (currentName && existingFiles.includes(currentName)) {
        console.log(`   ✅ ${currentName} → ${targetName}`);
        renamingPlan.push({
          current: path.join(catalogDir, currentName),
          target: path.join(catalogDir, targetName),
          product: product.name
        });
      } else {
        console.log(`   ❌ MISSING: ${currentName || 'undefined'}`);
        missingFiles.push({
          expected: currentName || 'undefined',
          product: product.name
        });
      }
    }
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   🎯 Files to rename: ${renamingPlan.length}`);
  console.log(`   ❌ Missing files: ${missingFiles.length}`);
  
  if (missingFiles.length > 0) {
    console.log('\n🚨 Missing Files:');
    missingFiles.forEach(item => {
      console.log(`   ${item.expected} (${item.product})`);
    });
  }
  
  return { renamingPlan, missingFiles };
}

function executeRenaming(renamingPlan, dryRun = true) {
  if (dryRun) {
    console.log('\n🧪 DRY RUN - No files will be actually renamed\n');
  } else {
    console.log('\n🔄 EXECUTING RENAME OPERATIONS...\n');
  }
  
  let success = 0;
  let failures = 0;
  
  renamingPlan.forEach(item => {
    try {
      if (!dryRun) {
        fs.renameSync(item.current, item.target);
      }
      console.log(`✅ ${path.basename(item.current)} → ${path.basename(item.target)}`);
      success++;
    } catch (error) {
      console.log(`❌ Failed: ${path.basename(item.current)} → ${path.basename(item.target)}`);
      console.log(`   Error: ${error.message}`);
      failures++;
    }
  });
  
  console.log(`\n📊 Rename Summary:`);
  console.log(`   ✅ Success: ${success}`);
  console.log(`   ❌ Failures: ${failures}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const isExecute = args.includes('--execute');
  
  const { renamingPlan, missingFiles } = analyzeImageRenaming();
  
  if (missingFiles.length > 0) {
    console.log('\n⚠️  Cannot proceed with renaming - some expected files are missing.');
    console.log('Please ensure all product images exist before renaming.');
    return;
  }
  
  executeRenaming(renamingPlan, !isExecute);
  
  if (!isExecute) {
    console.log('\n💡 To actually execute the rename operation, run:');
    console.log('   node rename-images.js --execute');
  }
}

if (require.main === module) {
  main();
}