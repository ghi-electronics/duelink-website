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

function getImageName(imgPath) {
  return imgPath.replace('.png', '').replace('-front', '');
}

function mapCategory(category) {
  const categoryMap = {
    'Microcomputer': 'microcomputer',
    'Display': 'display', 
    'Actuator': 'actuator',
    'Communication': 'communication',
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

function migrateProduct(oldProduct) {
  const slug = generateSlug(oldProduct.Name);
  const imageName = getImageName(oldProduct.Img);
  const categorySlug = mapCategory(oldProduct.Category || 'Other');
  
  return {
    name: oldProduct.Name,
    shortDescription: `${oldProduct.Name} - High-quality DUELink module`, // Placeholder
    partNumber: oldProduct.PartNumber,
    category: oldProduct.Category || 'Other',
    price: 19.99, // Placeholder price
    variations: {}, // Empty for now, will be filled manually for products that need it
    images: {
      front: `${imageName}-front.png`,
      pencil: `${imageName}-pencil.png`,
      back: `${imageName}-back.png`,
      front45: `${imageName}-front-45.png`,
      back45: `${imageName}-back-45.png`
    },
    overviewText: `/desc/${categorySlug}/${slug}.txt`,
    keyFeatures: [], // To be filled manually
    resources: {
      model3d: `/3d/${oldProduct.PartNumber.toLowerCase()}.step`,
      schematic: `/sch/${oldProduct.PartNumber.toLowerCase()}.pdf`
    },
    driverCode: `/code/drivers/${categorySlug}/${slug}.due`,
    samples: {
      script: `/code/samples/${categorySlug}/${slug}.due`,
      python: `/code/samples/${categorySlug}/${slug}.py`, 
      javascript: `/code/samples/${categorySlug}/${slug}.js`,
      dotnet: `/code/samples/${categorySlug}/${slug}.cs`,
      micropython: `/code/samples/${categorySlug}/${slug}.mpy`,
      arduino: `/code/samples/${categorySlug}/${slug}.cpp`
    }
  };
}

function migrateJSON() {
  try {
    // Read the existing JSON file
    const oldData = JSON.parse(fs.readFileSync('./static/duelink.json', 'utf8'));
    
    // Create new structure
    const newData = {
      metadata: {
        ...oldData.metadata,
        version: "0.3",
        timestamp: new Date().toISOString().split('T')[0]
      },
      products: oldData.boards.map(migrateProduct),
      // Keep legacy boards array for backward compatibility
      boards: oldData.boards
    };
    
    // Write the new schema
    fs.writeFileSync('./static/duelink-v2.json', JSON.stringify(newData, null, 2));
    console.log(`✅ Migrated ${newData.products.length} products to new schema`);
    console.log('✅ Created duelink-v2.json with new structure');
    console.log('✅ Original duelink.json preserved for backward compatibility');
    
    // Generate summary report
    const categories = {};
    newData.products.forEach(product => {
      const cat = product.category;
      categories[cat] = (categories[cat] || 0) + 1;
    });
    
    console.log('\n📊 Migration Summary:');
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`   ${cat}: ${count} products`);
    });
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  }
}

// Run migration
migrateJSON();