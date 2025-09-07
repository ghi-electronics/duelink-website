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

function generateSimpleProductMDX(product) {
  const slug = generateSlug(product.name);

  return `---
sidebar_position: 1
title: ${product.name}
description: ${product.shortDescription}
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProductImageSelector from '@site/src/components/ProductImageSelector';

# ${product.name}


<Tabs className="unique-tabs" groupid="catalog" queryString="show" defaultValue="overview"
  values={[
    {label: 'Overview', value: 'overview'},
    {label: 'Drivers', value: 'drivers'},
    {label: 'Samples', value: 'samples'},
  ]}>

<TabItem value="overview">

<ProductImageSelector 
  images={{
    front: "${product.images.front}",
    back: "${product.images.back}",
    front45: "${product.images.front45}",
    back45: "${product.images.back45}",
    pencil: "${product.images.pencil}"
  }}
  productName="${product.name}"
/>

This is a high-quality DUELink module designed for easy integration into your projects.

<table><td width='50%'>
**Key features**

${product.keyFeatures.length > 0 ? 
  product.keyFeatures.map(feature => `• ${feature}<br/>`).join('\n') :
  '• High-quality DUELink module<br/>\n• Easy integration<br/>\n• Professional grade components<br/>'
}

</td><td width='50%'>
**Resources**
 
📄[Schematics](${product.resources.schematic})<br/>
🔩[3D STEP file](${product.resources.model3d})<br/>

</td></table>

</TabItem>

<TabItem value="drivers">

See [Drivers](../../engine/drivers) page for further details.

Driver documentation will be available soon.

</TabItem>

<TabItem value="samples">

Samples assumes [Drivers](../../engine/drivers) are installed.

<Tabs
  values={[
    {label: 'Script', value: 'script'},
  ]}>

<TabItem value="script">

\`\`\`py reference title="Script Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/samples/script/${product.Code || 'default.txt'}
\`\`\`
</TabItem>

</Tabs>

</TabItem>

</Tabs>

---

## Ordering Information

**${product.partNumber}** - ${product.shortDescription} - **$${product.price}**

${Object.keys(product.variations).length > 0 ? 
  Object.entries(product.variations).map(([variationType, options]) => 
    `\n**${variationType} Options:**\n\n${Object.entries(options).map(([code, name]) => 
      `**${product.partNumber}-${code}** - ${name} - $${product.price}`
    ).join('  \n')}`
  ).join('\n') : 
  ''
}`;
}

function generateSimpleProductPages() {
  // Load product data
  const productData = JSON.parse(fs.readFileSync('./static/duelink-v2.json', 'utf8'));
  
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
      const mdxContent = generateSimpleProductMDX(product);
      const filePath = path.join(productsDir, `${slug}.mdx`);
      
      fs.writeFileSync(filePath, mdxContent);
      generated++;
      console.log(`✅ Generated: ${filePath}`);
    } catch (error) {
      errors++;
      console.error(`❌ Error generating ${product.name}:`, error.message);
    }
  });

  console.log(`\n📊 Generation Summary:`);
  console.log(`   ✅ Generated: ${generated} product pages`);
  console.log(`   ❌ Errors: ${errors}`);
}

// Run the generator
generateSimpleProductPages();