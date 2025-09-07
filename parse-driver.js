const fs = require('fs');

function parseDriverFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const functions = [];
  
  // Parse function definitions
  const fnRegex = /^fn\s+(\w+)\((.*?)\)/gm;
  let match;
  
  while ((match = fnRegex.exec(content)) !== null) {
    const funcName = match[1];
    const params = match[2].trim();
    
    // Get description based on common function names
    let description = '';
    switch(funcName) {
      case 'Init':
        description = 'Initialize the module. Automatically called on power up.';
        break;
      case 'DVer':
        description = 'This driver version.';
        break;
      case 'Digit':
        description = 'Draw number to LEDs.';
        break;
      case 'Seg7':
        description = 'Draw a single digit (0 to 9) on specified position.';
        break;
      case 'Dot':
        description = 'Draw a dot at index with value (0 off, 1 on).';
        break;
      case 'Colon':
        description = 'Show colon on time-type LED.';
        break;
      case 'Show':
        description = 'Update display with buffer content.';
        break;
      case 'Clear':
        description = 'Clear the display.';
        break;
      default:
        description = `${funcName} function`;
    }
    
    functions.push({
      name: funcName,
      params: params,
      description: description
    });
  }
  
  return {
    functions,
    fullCode: content
  };
}

// Map product categories to driver file names
function getDriverFileName(productName, category) {
  const nameLower = productName.toLowerCase();
  
  // Special cases
  if (nameLower.includes('led s284') || nameLower.includes('led s404') || nameLower.includes('led s564')) {
    return 'led-sxx4';
  }
  if (nameLower.includes('lcd 16x2') || nameLower.includes('lcd 20x4')) {
    return 'lcd-xxxx-char';
  }
  
  // Default: use slug
  return nameLower
    .replace(/\s+rev\s+[a-z]/gi, '') // Remove "Rev X"
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

module.exports = { parseDriverFile, getDriverFileName };