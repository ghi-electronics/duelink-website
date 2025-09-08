const fs = require('fs');
const path = require('path');

// Load product data
const dataPath = path.join(__dirname, 'static', 'duelink.json');
const outputDir = path.join(__dirname, 'docs', 'products');

// Product-specific descriptions and features
const productDetails = {
    'GDL-ACMOTOMAX-B': {
        overview: 'This heavy-duty single motor controller has some serious driving power with up to 27V and 43A!',
        features: [
            '43A H-Bridge',
            '6 to 27V',
            'Screw terminal connections',
            '52x50mm overall dimension'
        ]
    },
    'GDL-ACMOTOTWIN-B': {
        overview: 'Dual motor controller with independent control of two DC motors.',
        features: [
            'Dual H-Bridge',
            '6 to 27V',
            'Independent motor control',
            'Compact design'
        ]
    },
    'GDL-ACRELAYP4-C': {
        overview: '4-channel power relay module for high-current switching applications.',
        features: [
            '4 relay channels',
            'High current switching',
            'LED status indicators',
            'Screw terminal connections'
        ]
    },
    'GDL-ACSERVOP8-B': {
        overview: '8-channel servo controller for precise servo motor control.',
        features: [
            '8 servo channels',
            'PWM control',
            'Standard servo compatibility',
            'Daisy-chain capable'
        ]
    }
    // Add more products as needed
};

// Paths for resource files
const schematicsDir = path.join(__dirname, 'static', 'sch');
const modelsDir = path.join(__dirname, 'static', '3d');
const samplesDir = path.join(__dirname, 'static', 'code', 'samples', 'script');

// Helper functions to check resource availability
function hasSchematic(partNumber) {
    const partPrefix = extractPartPrefix(partNumber);
    const schematicPath = path.join(schematicsDir, `gdl-${partPrefix}.pdf`);
    return fs.existsSync(schematicPath);
}

function has3DModel(partNumber) {
    const partPrefix = extractPartPrefix(partNumber);
    const modelPath = path.join(modelsDir, `gdl-${partPrefix}.step`);
    return fs.existsSync(modelPath);
}

// Convert product name to sample filename
function getSampleFilename(productName) {
    // Remove "Rev X" suffix and convert to lowercase with hyphens
    const cleanName = productName.replace(/\s+Rev\s+[A-Z]$/i, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
    return `${cleanName}.txt`;
}

// Map category names to folder names
function getCategoryFolder(category) {
    const categoryMap = {
        'LED': 'led',
        'HMI': 'hmi',
        'Sensor': 'sensor',
        'Actuator': 'actuator',
        'Display': 'display',
        'Communication': 'com',
        'Adapter': 'adapter',
        'Storage': 'storage',
        'Wireless': 'wireless',
        'Sound': 'sound',
        'Vision': 'vision',
        'Special': 'special',
        'Microcomputer': 'microcomputer'
    };
    return categoryMap[category] || category.toLowerCase();
}

// Check if sample exists for product
function hasSample(product) {
    const sampleFilename = getSampleFilename(product.name);
    const categoryFolder = getCategoryFolder(product.category);
    const samplePath = path.join(samplesDir, categoryFolder, sampleFilename);
    return fs.existsSync(samplePath);
}


// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read and parse JSON data
let productData;
try {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    productData = JSON.parse(rawData);
} catch (error) {
    console.error('Error reading product data:', error);
    process.exit(1);
}

// Function to convert product name to filename
function generateFilename(name) {
    // Extract product name and revision
    const match = name.match(/^(.+?)\s+Rev\s+([A-Z])$/i);
    if (match) {
        const productName = match[1].toLowerCase().replace(/\s+/g, '-');
        const revision = match[2].toLowerCase();
        return `${productName}-rev-${revision}.mdx`;
    }
    // Fallback for names without revision
    return name.toLowerCase().replace(/\s+/g, '-') + '.mdx';
}

// Function to extract part number prefix
function extractPartPrefix(partNumber) {
    // Remove GDL- prefix and keep everything else
    const match = partNumber.match(/GDL-(.+)$/);
    if (match) {
        return match[1].toLowerCase();
    }
    return partNumber.toLowerCase();
}

// Generate MDX content for each product
function generateMDX(product, index) {
    const partPrefix = extractPartPrefix(product.partNumber);
    const partNumberClean = product.partNumber.replace(/^GDL-/, '');
    const details = productDetails[product.partNumber] || {};
    
    // Build resources section dynamically
    let resourceLinks = [];
    if (hasSchematic(product.partNumber)) {
        resourceLinks.push(`📄[Schematics](/sch/gdl-${partPrefix}.pdf)`);
    }
    if (has3DModel(product.partNumber)) {
        resourceLinks.push(`🔩[3D STEP file](/3d/gdl-${partPrefix}.step)`);
    }
    
    // Create resources section only if there are resources
    const resourcesSection = resourceLinks.length > 0 
        ? `**Resources**
 
${resourceLinks.join('<br/>\n')}<br/>`
        : '';
    
    // Build tabs array dynamically
    const tabs = [
        {label: 'Overview', value: 'overview'},
        {label: 'Drivers', value: 'drivers'}
    ];
    
    // Check if sample exists and add tab if it does
    const sampleExists = hasSample(product);
    let sampleContent = '';
    if (sampleExists) {
        tabs.push({label: 'Samples', value: 'samples'});
        const sample = loadSample(product);
        if (sample) {
            sampleContent = `
<TabItem value="samples">

**Samples assumes Drivers are installed.**

### Script

**Script Sample**

\`\`\`basic
${sample}
\`\`\`

[See full example on GitHub](https://github.com/ghi-electronics/duelink-website/tree/main/static/code/samples)

</TabItem>`;
        }
    }
    
    const mdxContent = `---
sidebar_position: ${index + 1}
title: ${product.name}
description: ${product.name} - High-quality DUELink module
pagination_prev: null
pagination_next: null
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageSection from '@site/src/components/ImageSection';
import OrderSection from '@site/src/components/OrderSection';

# ${product.name}

<ImageSection 
  product="${partPrefix}"
  tagline="${(product.tagline || 'High-quality DUELink module').replace(/"/g, '')}"
/>

---

<Tabs className="unique-tabs" groupid="catalog" queryString="show" defaultValue="overview"
  values={${JSON.stringify(tabs, null, 4).replace(/"([^"]+)":/g, '$1:')}}>

<TabItem value="overview">

${details.overview || product.shortDescription || 'This is a high-quality DUELink module designed for easy integration into your projects.'}${product.Notes ? '\n\n' + product.Notes : ''}

<table><td width='50%'>
**Key features**

${details.features ? details.features.map(f => `• ${f}<br/>`).join('\n') : `• High-quality DUELink module<br/>
• Easy integration<br/>
• Professional grade components<br/>`}

</td><td width='50%'>
${resourcesSection}
</td></table>

</TabItem>

<TabItem value="drivers">

See [Drivers](../../engine/drivers) page for further details.

\`\`\`python
# Python driver installation
import duelink
dl = duelink.DueLink()

# Example code for ${product.name}
# Initialize the module
module = dl.${product.category.toLowerCase()}.${product.name.split(' ')[0].toLowerCase()}()

# Basic operations
module.initialize()
module.read()
\`\`\`

</TabItem>
${sampleContent}

</Tabs>

---

<OrderSection
    product="DUELink ${product.name.replace(' Rev ', ' ')}"
    partnumber="${product.partNumber}"
    price="$${product.price || '00.00'}"
/>
`;

    return mdxContent;
}

// Process all products
console.log('Generating product pages...');
let generatedCount = 0;
let errors = [];

productData.products.forEach((product, index) => {
    try {
        const filename = generateFilename(product.name);
        const filepath = path.join(outputDir, filename);
        const content = generateMDX(product, index);
        
        fs.writeFileSync(filepath, content);
        generatedCount++;
        console.log(`✓ Generated: ${filename}`);
    } catch (error) {
        errors.push({ product: product.name, error: error.message });
        console.error(`✗ Error generating ${product.name}:`, error.message);
    }
});

// Summary
console.log('\n=== Generation Complete ===');
console.log(`Successfully generated: ${generatedCount} pages`);
if (errors.length > 0) {
    console.log(`Errors encountered: ${errors.length}`);
    errors.forEach(e => console.log(`  - ${e.product}: ${e.error}`));
} else {
    console.log('No errors encountered');
}