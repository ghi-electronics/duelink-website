const fs = require('fs');
const path = require('path');

// Load product data
const dataPath = path.join(__dirname, 'static', 'duelink.json');
const driverDir = path.join(__dirname, 'driver');
const sampleDir = path.join(__dirname, 'sample');

console.log('Loading product data...');
const rawData = fs.readFileSync(dataPath, 'utf8');
const productData = JSON.parse(rawData);

// Function to generate old baseName (current naming)
function getOldBaseName(product) {
    return product.name.replace(/\s+[A-Z]$/i, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
}

// Function to generate new baseName (partNumber-based naming)
function getNewBaseName(product) {
    return product.partNumber.toLowerCase();
}

// Collect rename operations
const renameOps = [];

console.log('\n=== Analyzing Files for Rename ===');

productData.products.forEach((product, index) => {
    const oldBaseName = getOldBaseName(product);
    const newBaseName = getNewBaseName(product);
    
    if (oldBaseName === newBaseName) {
        // Skip if names are already the same
        return;
    }
    
    console.log(`${index + 1}. ${product.name} (${product.partNumber})`);
    console.log(`   Old: ${oldBaseName} → New: ${newBaseName}`);
    
    // Check driver file
    const oldDriverPath = path.join(driverDir, `${oldBaseName}.txt`);
    const newDriverPath = path.join(driverDir, `${newBaseName}.txt`);
    
    if (fs.existsSync(oldDriverPath)) {
        renameOps.push({
            type: 'driver',
            product: product.name,
            oldPath: oldDriverPath,
            newPath: newDriverPath,
            oldName: `${oldBaseName}.txt`,
            newName: `${newBaseName}.txt`
        });
    }
    
    // Check sample files
    const extensions = ['.txt', '.py', '.js'];
    extensions.forEach(ext => {
        const oldSamplePath = path.join(sampleDir, `${oldBaseName}${ext}`);
        const newSamplePath = path.join(sampleDir, `${newBaseName}${ext}`);
        
        if (fs.existsSync(oldSamplePath)) {
            renameOps.push({
                type: 'sample',
                product: product.name,
                oldPath: oldSamplePath,
                newPath: newSamplePath,
                oldName: `${oldBaseName}${ext}`,
                newName: `${newBaseName}${ext}`
            });
        }
    });
});

console.log(`\n=== Rename Operations Summary ===`);
console.log(`Total operations: ${renameOps.length}`);
console.log(`Driver renames: ${renameOps.filter(op => op.type === 'driver').length}`);
console.log(`Sample renames: ${renameOps.filter(op => op.type === 'sample').length}`);

// Check for conflicts
console.log('\n=== Checking for Conflicts ===');
const conflicts = [];
renameOps.forEach(op => {
    if (fs.existsSync(op.newPath)) {
        conflicts.push(op);
    }
});

if (conflicts.length > 0) {
    console.log(`⚠️  WARNING: ${conflicts.length} conflicts detected!`);
    conflicts.forEach(conflict => {
        console.log(`   ${conflict.newName} already exists`);
    });
} else {
    console.log('✅ No conflicts detected');
}

// Get command line argument
const dryRun = !process.argv.includes('--execute');

if (dryRun) {
    console.log('\n=== DRY RUN MODE ===');
    console.log('Preview of rename operations:');
    
    renameOps.forEach((op, index) => {
        console.log(`${index + 1}. [${op.type}] ${op.product}`);
        console.log(`   ${op.oldName} → ${op.newName}`);
    });
    
    console.log('\n📋 To execute these renames, run:');
    console.log('node rename-files-by-partnumber.js --execute');
    
} else {
    console.log('\n=== EXECUTING RENAMES ===');
    
    if (conflicts.length > 0) {
        console.log('❌ Cannot execute due to conflicts. Please resolve them first.');
        process.exit(1);
    }
    
    let successCount = 0;
    let errorCount = 0;
    
    renameOps.forEach((op, index) => {
        try {
            fs.renameSync(op.oldPath, op.newPath);
            console.log(`✅ ${index + 1}/${renameOps.length} - Renamed: ${op.oldName} → ${op.newName}`);
            successCount++;
        } catch (error) {
            console.log(`❌ ${index + 1}/${renameOps.length} - Failed: ${op.oldName} - ${error.message}`);
            errorCount++;
        }
    });
    
    console.log('\n=== EXECUTION COMPLETE ===');
    console.log(`✅ Successful renames: ${successCount}`);
    console.log(`❌ Failed renames: ${errorCount}`);
    
    if (errorCount === 0) {
        console.log('🎉 All files successfully renamed to use partNumber-based naming!');
    }
}