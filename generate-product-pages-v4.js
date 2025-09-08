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

// Check which sample languages exist for product
function getAvailableSamples(product) {
    // Remove revision letter (like "B" or "C") from the end and convert to lowercase
    const baseName = product.name.replace(/\s+[A-Z]$/i, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
    const categoryFolder = getCategoryFolder(product.category);
    
    const samples = {};
    
    // Check for Python sample
    const pythonPath = path.join(__dirname, 'static', 'code', 'samples', 'python', categoryFolder, `${baseName}.py`);
    if (fs.existsSync(pythonPath)) {
        samples.python = pythonPath;
    }
    
    // Check for JavaScript sample
    const jsPath = path.join(__dirname, 'static', 'code', 'samples', 'javascript', categoryFolder, `${baseName}.js`);
    if (fs.existsSync(jsPath)) {
        samples.javascript = jsPath;
    }
    
    // Check for Script sample
    const scriptPath = path.join(__dirname, 'static', 'code', 'samples', 'script', categoryFolder, `${baseName}.txt`);
    if (fs.existsSync(scriptPath)) {
        samples.script = scriptPath;
    }
    
    return samples;
}

// Load sample content from file
function loadSampleContent(filepath) {
    try {
        return fs.readFileSync(filepath, 'utf8');
    } catch (error) {
        console.error(`Error loading sample from ${filepath}:`, error.message);
        return null;
    }
}

// Check if driver file exists for product
function getDriverPath(product) {
    const baseName = product.name.replace(/\s+[A-Z]$/i, '')
        .toLowerCase()
        .replace(/\s+/g, '-');
    const categoryFolder = getCategoryFolder(product.category);
    const driverPath = path.join(__dirname, 'static', 'code', 'drivers', categoryFolder, `${baseName}.txt`);
    
    if (fs.existsSync(driverPath)) {
        return driverPath;
    }
    return null;
}

// Load driver content from file
function loadDriverContent(filepath) {
    try {
        return fs.readFileSync(filepath, 'utf8');
    } catch (error) {
        console.error(`Error loading driver from ${filepath}:`, error.message);
        return null;
    }
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
    // For LED and OLED products that used to have A/B/C suffix, generate filename without suffix
    // This applies to products that previously had suffix but now don't
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

// Generate OrderSection based on whether product has variations
function generateOrderSection(product) {
    if (product.variations && product.variations.length > 0) {
        // Generate props for each variation
        const orderProps = product.variations.map((variation, idx) => {
            const propNum = idx === 0 ? '' : (idx + 1).toString();
            return `
    product${propNum}="DUELink ${variation.name}"
    partnumber${propNum}="${variation.partNumber}"
    price${propNum}="$${variation.price?.toFixed(2) || '00.00'}"`;
        }).join('');
        
        return `<OrderSection${orderProps}
/>`;
    } else {
        // No variations, use standard format
        return `<OrderSection
    product="DUELink ${product.name.replace(' Rev ', ' ')}"
    partnumber="${product.partNumber}"
    price="$${product.price?.toFixed(2) || '00.00'}"
/>`;
    }
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
    
    // Check for driver first
    const driverPath = getDriverPath(product);
    let hasDriver = false;
    let driverContent = null;
    
    if (driverPath) {
        driverContent = loadDriverContent(driverPath);
        hasDriver = !!driverContent;
    }
    
    // Build tabs array dynamically
    const tabs = [
        {label: 'Overview', value: 'overview'}
    ];
    
    // Only add Drivers tab if driver exists
    if (hasDriver) {
        tabs.push({label: 'Drivers', value: 'drivers'});
    }
    
    // Check for available samples and add tab if any exist
    const availableSamples = getAvailableSamples(product);
    const hasSamples = Object.keys(availableSamples).length > 0;
    let sampleContent = '';
    
    if (hasSamples) {
        tabs.push({label: 'Samples', value: 'samples'});
        
        // Build sample content for each available language
        let sampleSections = [];
        
        if (availableSamples.python) {
            const pythonCode = loadSampleContent(availableSamples.python);
            if (pythonCode) {
                sampleSections.push(`### Python

\`\`\`python
${pythonCode}
\`\`\``);
            }
        }
        
        if (availableSamples.javascript) {
            const jsCode = loadSampleContent(availableSamples.javascript);
            if (jsCode) {
                sampleSections.push(`### JavaScript

\`\`\`javascript
${jsCode}
\`\`\``);
            }
        }
        
        if (availableSamples.script) {
            const scriptCode = loadSampleContent(availableSamples.script);
            if (scriptCode) {
                sampleSections.push(`### Script

\`\`\`text
${scriptCode}
\`\`\``)
            }
        }
        
        if (sampleSections.length > 0) {
            sampleContent = `
<TabItem value="samples">

${sampleSections.join('\n\n')}

[See full examples on GitHub](https://github.com/ghi-electronics/duelink-website/tree/main/static/code/samples)

</TabItem>`;
        }
    }
    
    // Generate driver tab content if driver exists
    let driverTabContent = '';
    
    if (hasDriver) {
        // Use driverTable from product JSON if available, otherwise no table
        const driverTable = product.driverTable || '';
        
        // Extract just the product name without revision
        const productBaseName = product.name.replace(/\s+[A-Z]$/i, '');
        
        // Use triple backticks for code block to avoid MDX JSX parsing
        // This creates a markdown code block instead of using CodeBlock component
        driverTabContent = `
<TabItem value="drivers">

See [Drivers](/docs/engine/drivers) page for further details.

${driverTable ? driverTable + '\n' : ''}<details>
<summary><strong>The Code!</strong></summary>

**${productBaseName} Driver**

\`\`\`text
${driverContent}
\`\`\`

</details>

[See full driver on GitHub](https://github.com/ghi-electronics/duelink-website/tree/main/static/code/drivers)

</TabItem>`;
    }
    
    const mdxContent = `---
sidebar_position: ${index + 1}
title: ${product.name}
description: ${product.name} - High-quality DUELink module
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

${(product.keyFeatures || []).map(f => `• ${f}<br/>`).join('\n')}

</td><td width='50%'>
${resourcesSection}
</td></table>

</TabItem>
${driverTabContent}
${sampleContent}

</Tabs>

---

${generateOrderSection(product)}
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