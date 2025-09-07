const fs = require('fs');
const path = require('path');

// Load sample mapping
const sampleMapping = JSON.parse(fs.readFileSync('./sample-mapping.json', 'utf8'));

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

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
    const name = match[1];
    const params = match[2].trim();
    functions.push({ name, params });
  }
  
  return functions;
}

function generateProductMDX(product) {
  const slug = generateSlug(product.name);
  const cleanPN = product.partNumber
    .replace(/GDL-/g, '')
    .replace(/\[\s*\]/g, '')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();
  
  const categoryLower = product.category.toLowerCase();
  
  // Map driver file names
  const driverFileMap = {
    'led s404 rev a': 'led-sxx4',
    'led s284 rev b': 'led-sxx4',
    'led s564 rev a': 'led-sxx4',
    'led mt1208 rev a': 'led-mt1208',
    'led r16 rev b': 'led-r16',
    'led rgb3 rev a': 'led-rgb3',
    'led ss805': 'led-ss805',
    'smart led rev a': 'smart-led',
    'lcd 16x2 rev c': 'lcd-xxxx-char',
    'lcd 20x4 rev b': 'lcd-xxxx-char',
    'oled 096 rev a': 'oled-96'
  };
  
  const driverFileName = driverFileMap[product.name.toLowerCase()] || slug.replace(/-rev-[a-z]$/, '');
  
  // Parse driver file if it exists
  const driverPath = `./static/code/drivers/${categoryLower}/${driverFileName}.due`;
  const driverFunctions = parseDriverFile(driverPath);
  
  // Get sample file path from mapping
  const samplePath = sampleMapping[product.name];
  
  return `---
sidebar_position: 1
title: ${product.name}
description: ${product.shortDescription}
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProductImageSelector from '@site/src/components/ProductImageSelector';

# ${product.name}

<ProductImageSelector 
  partNumber="${cleanPN}"
  productName="${product.name}"
/>

---

<Tabs className="unique-tabs" groupid="catalog" queryString="show" defaultValue="overview"
  values={[
    {label: 'Overview', value: 'overview'},
    {label: 'Drivers', value: 'drivers'},
    {label: 'Samples', value: 'samples'},
  ]}>

<TabItem value="overview">

This is a high-quality DUELink module designed for easy integration into your projects.

<table><td width='50%'>
**Key features**

• High-quality DUELink module<br/>
• Easy integration<br/>
• Professional grade components<br/>

</td><td width='50%'>
**Resources**
 
📄[Schematics](/sch/${cleanPN}.pdf)<br/>
🔩[3D STEP file](/3d/${cleanPN}.step)<br/>

</td></table>

</TabItem>

<TabItem value="drivers">

${(() => {
  if (!driverFunctions || driverFunctions.length === 0) {
    return 'No driver documentation available for this module.';
  }
  
  // Generate driver API table
  let driverContent = `See [Drivers](../../engine/drivers) page for further details.

| Function | Description |
| --- | --- |
| \`DVer()\` | This driver version. |
| \`Init()\` | Initialize the module. Automatically called on power up. |`;
  
  // Add specific functions based on module type
  const functionDescriptions = {
    'Seg7': 'Draw a single digit (0 to 9) on specified position.',
    'Dot': 'Draw a dot at index with value (0 off, 1 on).',
    'Colon': 'Show colon on time-type LED.',
    'Digit': 'Draw number to LEDs.',
    'BtnPin': 'BtnPin function',
    'BtnLdr': 'BtnLdr function',
    'BtnA': 'BtnA function',
    'BtnB': 'BtnB function',
    'Buzzer': 'Buzzer function',
    'IsTouch': 'IsTouch function',
    'Light': 'Light function',
    'IsColor': 'IsColor function',
    'GetW': 'GetW function',
    'GetH': 'GetH function',
    'TouchA': 'TouchA function',
    'TouchB': 'TouchB function',
    'TouchUp': 'TouchUp function',
    'TouchDown': 'TouchDown function',
    'TouchLeft': 'TouchLeft function',
    'TouchRight': 'TouchRight function'
  };
  
  driverFunctions.forEach(fn => {
    const desc = functionDescriptions[fn.name] || `${fn.name} function`;
    const signature = fn.params ? `${fn.name}(${fn.params})` : `${fn.name}()`;
    driverContent += `
| \`${signature}\` | ${desc} |`;
  });
  
  driverContent += `

<details>
  <summary>The Code!</summary>

\`\`\`py reference title="${product.name} Driver"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/drivers/${categoryLower}/${driverFileName}.due
\`\`\`

</details>`;
  
  return driverContent;
})()}

</TabItem>

<TabItem value="samples">

${(() => {
  if (!samplePath) {
    return 'No sample code available for this module yet.';
  }
  
  return `Samples assumes [Drivers](../../engine/drivers) are installed.

<Tabs
  values={[
    {label: 'Script', value: 'script'},
  ]}>

<TabItem value="script">

\`\`\`py reference title="Script Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/samples/script/${samplePath}
\`\`\`
</TabItem>

</Tabs>`;
})()}

</TabItem>

</Tabs>

---

## Ordering Information

**${product.partNumber}** - ${product.shortDescription} - **$${product.price}**
`;
}

function generateProductPages() {
  console.log('🔄 Generating Product Pages (V4 - With Sample Mapping)...\n');
  
  // Load simplified product data
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v3.json', 'utf8'));
  
  // Create products directory if it doesn't exist
  const productsDir = './docs/products';
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  let generated = 0;
  let errors = 0;
  let withSamples = 0;
  let withoutSamples = 0;

  // Generate MDX file for each product
  productData.products.forEach(product => {
    try {
      const slug = generateSlug(product.name);
      const mdxContent = generateProductMDX(product);
      const filePath = path.join(productsDir, `${slug}.mdx`);
      
      fs.writeFileSync(filePath, mdxContent);
      generated++;
      
      if (sampleMapping[product.name]) {
        withSamples++;
      } else {
        withoutSamples++;
      }
      
      console.log(`✅ Generated: ${filePath}`);
    } catch (error) {
      errors++;
      console.error(`❌ Error generating ${product.name}:`, error.message);
    }
  });

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Generated: ${generated} product pages`);
  console.log(`   📝 With samples: ${withSamples}`);
  console.log(`   ⚠️  Without samples: ${withoutSamples}`);
  console.log(`   ❌ Errors: ${errors}`);
}

// Run the generator
generateProductPages();