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

function mapCategory(category) {
  const categoryMap = {
    'Microcomputer': 'microcomputer',
    'Display': 'display', 
    'Actuator': 'actuator',
    'Communication': 'com',
    'HMI': 'hmi',
    'Storage': 'storage',
    'Wireless': 'wireless',
    'Sensor': 'sensor',
    'LED': 'led',
    'Sound': 'sound',
    'Special': 'special',
    'Vision': 'vision',
    'Adapter': 'adapter'
  };
  return categoryMap[category] || category.toLowerCase();
}

function reorganizeSamples() {
  // Load the product data to get product names and categories
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v2.json', 'utf8'));
  
  const languageMap = {
    'javascript': '.js',
    'python': '.py', 
    'script': '.due', // Note: script samples are currently .txt but should be .due
    'microblocks': '.ubp'
  };
  
  // Create new structure directories
  const newSamplesPath = './static/code/samples-new';
  
  if (!fs.existsSync(newSamplesPath)) {
    fs.mkdirSync(newSamplesPath, { recursive: true });
  }
  
  let moved = 0;
  let created = 0;
  
  // Process each language directory
  Object.entries(languageMap).forEach(([language, ext]) => {
    const oldLangPath = `./static/code/samples/${language}`;
    if (!fs.existsSync(oldLangPath)) return;
    
    // Process each category in the language directory
    const categories = fs.readdirSync(oldLangPath);
    categories.forEach(category => {
      const categoryPath = path.join(oldLangPath, category);
      if (!fs.statSync(categoryPath).isDirectory()) return;
      
      // Process each file in the category
      const files = fs.readdirSync(categoryPath);
      files.forEach(filename => {
        const oldFilePath = path.join(categoryPath, filename);
        
        // Find matching product to get the correct slug
        const baseName = filename.replace(path.extname(filename), '');
        const matchingProduct = productData.products.find(p => {
          const productSlug = generateSlug(p.name);
          const categorySlug = mapCategory(p.category);
          
          // Try various matching strategies
          return (
            filename.includes(baseName) ||
            productSlug.includes(baseName) ||
            baseName.includes(productSlug.split('-')[0])
          ) && categorySlug === category;
        });
        
        if (matchingProduct) {
          const productSlug = generateSlug(matchingProduct.name);
          const categorySlug = mapCategory(matchingProduct.category);
          
          // Create new directory structure
          const newCategoryPath = path.join(newSamplesPath, categorySlug);
          if (!fs.existsSync(newCategoryPath)) {
            fs.mkdirSync(newCategoryPath, { recursive: true });
            created++;
          }
          
          // Move file to new location with new name
          const newFileName = `${productSlug}${ext}`;
          const newFilePath = path.join(newCategoryPath, newFileName);
          
          if (!fs.existsSync(newFilePath)) {
            fs.copyFileSync(oldFilePath, newFilePath);
            moved++;
            console.log(`✅ Moved: ${oldFilePath} → ${newFilePath}`);
          }
        } else {
          console.log(`⚠️  No matching product found for: ${oldFilePath}`);
        }
      });
    });
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Created ${created} new directories`);
  console.log(`   Moved ${moved} sample files`);
  console.log(`   New structure: ${newSamplesPath}`);
}

reorganizeSamples();