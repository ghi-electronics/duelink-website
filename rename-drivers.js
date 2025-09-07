const fs = require('fs');
const path = require('path');

function renameDriverFiles() {
  const driversPath = './static/code/drivers';
  let renamedCount = 0;
  
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        processDirectory(fullPath);
      } else if (file.endsWith('.txt')) {
        // Skip readme and test files
        if (file.includes('readme') || file.includes('test')) {
          console.log(`⏭️  Skipped: ${fullPath} (readme/test file)`);
          continue;
        }
        
        const newPath = fullPath.replace('.txt', '.due');
        fs.renameSync(fullPath, newPath);
        renamedCount++;
        console.log(`✅ Renamed: ${fullPath} → ${newPath}`);
      }
    }
  }
  
  processDirectory(driversPath);
  console.log(`\n📊 Summary: Renamed ${renamedCount} driver files from .txt to .due`);
}

renameDriverFiles();