const fs = require('fs');
const path = require('path');
const { parseDriverFile, getDriverFileName } = require('./parse-driver');

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

function generateProductMDX(product) {
  const slug = generateSlug(product.name);
  const cleanPN = cleanPartNumber(product.partNumber);
  const categoryLower = product.category.toLowerCase();

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

See [Drivers](../../engine/drivers) page for further details.

${(() => {
  const driverFileName = getDriverFileName(product.name, product.category);
  const driverPath = `./static/code/drivers/${categoryLower}/${driverFileName}.due`;
  const driverData = parseDriverFile(driverPath);
  
  if (!driverData || driverData.functions.length === 0) {
    return 'Driver documentation will be available soon.';
  }
  
  // Build function table
  let driverContent = '| Function | Description |\n| --- | --- |\n';
  driverData.functions.forEach(func => {
    const signature = func.params ? `\`${func.name}(${func.params})\`` : `\`${func.name}()\``;
    driverContent += `| ${signature} | ${func.description} |\n`;
  });
  
  // Add collapsible code section
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

Samples assumes [Drivers](../../engine/drivers) are installed.

<Tabs
  values={[
    {label: 'Script', value: 'script'},
  ]}>

<TabItem value="script">

\`\`\`py reference title="Script Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/samples/script/${categoryLower}/${slug}.txt
\`\`\`
</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

## Ordering Information

**${product.partNumber}** - ${product.shortDescription} - **$${product.price}**
`;
}

function generateProductPages() {
  console.log('🔄 Generating Product Pages (V3 - Convention Based)...\n');
  
  // Load simplified product data
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v3.json', 'utf8'));
  
  // Create products directory if it doesn't exist
  const productsDir = './docs/products';
  if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir, { recursive: true });
  }

  let generated = 0;
  let errors = 0;

  // Generate MDX file for each product
  productData.products.forEach(product => {
    try {
      const slug = generateSlug(product.name);
      const mdxContent = generateProductMDX(product);
      const filePath = path.join(productsDir, `${slug}.mdx`);
      
      fs.writeFileSync(filePath, mdxContent);
      generated++;
      console.log(`✅ Generated: ${filePath} (Convention-based)`);
    } catch (error) {
      errors++;
      console.error(`❌ Error generating ${product.name}:`, error.message);
    }
  });

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Generated: ${generated} product pages`);
  console.log(`   ❌ Errors: ${errors}`);
  console.log(`\n🎯 Convention-Based Features:`);
  console.log(`   • Images: {partNumber}-{1-5}.png`);
  console.log(`   • 3D Models: {partNumber}.step`);
  console.log(`   • Schematics: {partNumber}.pdf`);
  console.log(`   • Sample Code: {category}/{slug}.txt`);
}

// Run the generator
generateProductPages();