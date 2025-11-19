const fs = require('fs');
const path = require('path');

// Load product data
const dataPath = path.join(__dirname, 'static', 'duelink.json');
const outputDir = path.join(__dirname, 'docs', 'products');

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

// Get all 3D models for a product (with smart label detection)
function get3DModels(partNumber) {
    // Convert part number to lowercase for matching (GDL-AXCONNECTORS-A -> gdl-axconnectors-a)
    const partNumberLower = partNumber.toLowerCase();
    const models = [];
    
    // Get all STEP files that include the full part number
    const files = fs.readdirSync(modelsDir)
        .filter(file => {
            const fileLower = file.toLowerCase();
            // Check if filename includes the part number (with .step extension)
            return fileLower.includes(partNumberLower.replace('gdl-', 'gdl-')) && fileLower.endsWith('.step');
        })
        .sort(); // Sort to maintain consistent order
    
    files.forEach(filename => {
        const filePath = `/3d/${filename}`;
        
        // Extract suffix after the part number
        const fileWithoutExt = filename.replace('.step', '');
        const partNumberPattern = partNumber.toLowerCase().replace('gdl-', 'gdl-');
        const suffix = fileWithoutExt.toLowerCase().replace(partNumberPattern, '').replace(/^-/, '');
        
        let label = '3D STEP file';
        if (suffix) {
            // Check if it's just a number
            if (/^\d+$/.test(suffix)) {
                // Plain number, use default numbering
                label = `3D STEP file ${parseInt(suffix) + 1}`;
            } else {
                // Descriptive suffix - capitalize first letter of each word
                const description = suffix.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                label = `3D ${description} STEP file`;
            }
        }
        
        models.push({
            path: filePath,
            label: label
        });
    });
    
    return models;
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
        'Kit': 'kit',
        'Microcomputer': 'microcomputer',
        'Accessory': 'accessory'
    };
    return categoryMap[category] || category.toLowerCase();
}

// Check which sample languages exist for product
function getAvailableSamples(product) {
    // Use partNumber as base filename (already includes revision)
    const baseName = product.partNumber.toLowerCase();
    const categoryFolder = getCategoryFolder(product.category);
    
    const samples = {};
    
    // Check for Python sample
    const pythonPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.py`);
    if (fs.existsSync(pythonPath)) {
        samples.python = pythonPath;
    }
    
    // Check for JavaScript sample
    const jsPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.js`);
    if (fs.existsSync(jsPath)) {
        samples.javascript = jsPath;
    }
    
    // Check for Script sample
    const scriptPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.txt`);
    if (fs.existsSync(scriptPath)) {
        samples.script = scriptPath;
    }
    
    // Check for C# sample
    const csPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.cs`);
    if (fs.existsSync(csPath)) {
        samples.csharp = csPath;
    }
    
    // Check for MicroPython sample
    const mpyPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.mpy`);
    if (fs.existsSync(mpyPath)) {
        samples.micropython = mpyPath;
    }
    
    // Check for Arduino sample (.ino files)
    const inoPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.ino`);
    if (fs.existsSync(inoPath)) {
        samples.arduino = inoPath;
    }

    // Check for MicroBlocks sample (.ubp files)
    const ubpPath = path.join(__dirname, 'static', 'code', 'sample', 'daisylink', `${baseName}.ubp`);
    if (fs.existsSync(ubpPath)) {
        samples.microblocks = ubpPath;
    }
    
    return samples;
}

// Check which standalone sample types exist for product
function getAvailableStandaloneSamples(product) {
    const baseName = product.partNumber.toLowerCase();
    const samples = {};

    // Check for Script sample (.txt)
    const scriptPath = path.join(__dirname, 'static', 'code', 'sample', 'standalone', `${baseName}.txt`);
    if (fs.existsSync(scriptPath)) {
        samples.script = scriptPath;
    }

    // Check for Arduino sample (.ino)
    const inoPath = path.join(__dirname, 'static', 'code', 'sample', 'standalone', `${baseName}.ino`);
    if (fs.existsSync(inoPath)) {
        samples.arduino = inoPath;
    }

    // Check for MicroBlocks Project (.ubp)
    const ubpPath = path.join(__dirname, 'static', 'code', 'sample', 'standalone', `${baseName}.ubp`);
    if (fs.existsSync(ubpPath)) {
        samples.microblocks = ubpPath;
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
    // Use partNumber as base filename (already includes revision)
    const baseName = product.partNumber.toLowerCase();
    const categoryFolder = getCategoryFolder(product.category);
    const driverPath = path.join(__dirname, 'static', 'code', 'driver', `${baseName}.txt`);
    
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

// Function to convert part number to filename
function generateFilename(name, partNumber) {
    // Use part number for filename, removing GDL- prefix
    const cleanPartNumber = partNumber
        .replace(/^GDL-/, '')
        .toLowerCase();
    return `${cleanPartNumber}.mdx`;
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

// Generate Order table based on whether product has variations
function generateOrderSection(product) {
    let tableRows = '';
    
    if (product.variations && product.variations.length > 0) {
        // Generate rows for each variation
        tableRows = product.variations.map(variation => {
            const variationPrice = typeof variation.price === 'string' ? parseFloat(variation.price) : variation.price;
            return `| DUELink ${product.name} (${variation.name}) | ${product.partNumber}-**${variation.partCode}** | $${(variationPrice || 0).toFixed(2)} |`;
        }).join('\n');
    } else {
        // No variations, single row
        tableRows = `| DUELink ${product.name.replace(' Rev ', ' ')} | ${product.partNumber} | $${product.price?.toFixed(2) || '00.00'} |`;
    }
    
    return `<p style={{"backgroundColor": "lightcyan", "color": "black", "padding": "0px 0px 0px 30px"}}>
    <h2>Ordering Info</h2>
</p>

| Product | Part Number | Price |
|---------|-------------|-------|
${tableRows}`;
}

// Generate MDX content for each product
function generateMDX(product, index) {
    const partPrefix = extractPartPrefix(product.partNumber);
    const partNumberClean = product.partNumber.replace(/^GDL-/, '');
    
    // Generate base name for file references using partNumber
    const baseName = product.partNumber.toLowerCase();
    
    // Use part prefix directly for image names
    let imagePrefix = partPrefix;
    
    // Build resources section dynamically
    let resourceLinks = [];
    
    if (hasSchematic(product.partNumber)) {
        resourceLinks.push(`📄 <a href="/sch/gdl-${partPrefix}.pdf">Schematics</a>`);
    }
    
    // Add 3D models with automatically detected labels
    const models3D = get3DModels(product.partNumber);
    models3D.forEach(model => {
        resourceLinks.push(`🔩 <a href="${model.path}">${model.label}</a>`);
    });
    
    if (product.video) {
        resourceLinks.push(`▶ <a href="https://www.youtube.com/watch?v=${product.video}" target="_blank" >YouTube Video</a>`);
    }

    // Create resources section only if there are resources
    const resourcesSection = resourceLinks.length > 0 
        ? `**Resources**
 
${resourceLinks.join('<br/>\n')}<br/>`
        : '';
    
    // Add PID section if it exists
    const pidSection = product.PID ? `\n\n**PID:** ${product.PID}` : '';
    
    // Check for driver first
    const driverPath = getDriverPath(product);
    let driverContent = null;
    
    if (driverPath) {
        driverContent = loadDriverContent(driverPath);
    }
    
    // Build tabs array dynamically
    const tabs = [
        {label: 'Overview', value: 'overview'}
    ];
    
    // Only add Drivers tab if driver file exists
    if (driverPath) {
        tabs.push({label: 'Driver', value: 'driver'});
    }
    
    // Check for available daisylink samples and add tab if any exist
    const availableSamples = getAvailableSamples(product);
    const hasSamples = Object.keys(availableSamples).length > 0;
    let sampleContent = '';

    if (hasSamples) {
        tabs.push({label: 'Daisylink', value: 'dl-samples'});
        
        // Build sample tabs for each available language
        // Order: Script, Python, MicroPython, JavaScript, .NET, Arduino
        let sampleTabs = [];
        let sampleTabItems = [];
        
        if (availableSamples.script) {
            const scriptCode = loadSampleContent(availableSamples.script);
            if (scriptCode) {
                sampleTabs.push({label: 'Script', value: 'script'});
                sampleTabItems.push(`<TabItem value="script">

\`\`\`py reference title="Script Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.txt
\`\`\`

</TabItem>`);
            }
        }
        
        if (availableSamples.python) {
            const pythonCode = loadSampleContent(availableSamples.python);
            if (pythonCode) {
                sampleTabs.push({label: 'Python', value: 'python'});
                sampleTabItems.push(`<TabItem value="python">

\`\`\`py reference title="Python Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.py
\`\`\`

</TabItem>`);
            }
        }
        
        if (availableSamples.micropython) {
            const mpyCode = loadSampleContent(availableSamples.micropython);
            if (mpyCode !== null) {  // Check for null explicitly since empty file returns ""
                sampleTabs.push({label: 'MicroPython', value: 'micropython'});
                sampleTabItems.push(`<TabItem value="micropython">

\`\`\`py reference title="MicroPython Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.mpy
\`\`\`

</TabItem>`);
            }
        }
        
        if (availableSamples.javascript) {
            const jsCode = loadSampleContent(availableSamples.javascript);
            if (jsCode) {
                sampleTabs.push({label: 'JavaScript', value: 'javascript'});
                sampleTabItems.push(`<TabItem value="javascript">

\`\`\`js reference title="JavaScript Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.js
\`\`\`

</TabItem>`);
            }
        }
        
        if (availableSamples.csharp) {
            const csCode = loadSampleContent(availableSamples.csharp);
            if (csCode !== null) {  // Check for null explicitly since empty file returns ""
                sampleTabs.push({label: '.NET', value: 'dotnet'});
                sampleTabItems.push(`<TabItem value="dotnet">

\`\`\`cs reference title=".NET Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.cs
\`\`\`

</TabItem>`);
            }
        }
        
        // Check for Arduino files (.ino only)
        if (availableSamples.arduino) {
            const arduinoCode = loadSampleContent(availableSamples.arduino);
            if (arduinoCode !== null) {  // Check for null explicitly since empty file returns ""
                sampleTabs.push({label: 'Arduino', value: 'arduino'});
                sampleTabItems.push(`<TabItem value="arduino">

\`\`\`ino reference title="Arduino Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/daisylink/${baseName}.ino
\`\`\`

</TabItem>`);
            }
        }
        

        // Check for microblocks files (.ubp only)
        if (availableSamples.microblocks) {
            const microblocks = loadSampleContent(availableSamples.microblocks);
            if (microblocks !== null) {  // Check for null explicitly since empty file returns ""
                sampleTabs.push({label: 'MicroBlocks', value: 'microblocks'});
                sampleTabItems.push(`<TabItem value="microblocks">

                    This project runs on a device that is loaded with MicroBlocks. This same device is also Daisylinked to this DUELink module. See [MicroBlocks](/docs/language/microblocks) to learn more.

                    Click the button below to open, edit, and run the project directly on MicroBlocks' website.

                    <Button
                    style={{ color:'white' }}
                    label="Load Project"
                    link="https://microblocks.fun/run-pilot/microblocks.html?project=https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/sample/daisylink/${baseName}.ubp"
                    />
                    

</TabItem>`);
            }
        }


        if (sampleTabItems.length > 0) {
            sampleContent = `
<TabItem value="dl-samples">

These Daisylink samples assume the driver is installed, see the <a href="?show=driver" onClick={(e) => { e.preventDefault(); const scrollPos = window.scrollY; window.history.pushState(null, '', '?show=driver'); Array.from(document.querySelectorAll('.tabs__item')).find(el => el.textContent === 'Driver')?.click(); setTimeout(() => window.scrollTo(0, scrollPos), 0); }} style={{"cursor": "pointer"}}>Driver Tab</a>.

<Tabs groupid="language" queryString="lang" defaultValue="${sampleTabs[0].value}"
  values={${JSON.stringify(sampleTabs, null, 4).replace(/"([^"]+)":/g, '$1:')}}>

${sampleTabItems.join('\n')}

</Tabs>

</TabItem>`;
        }
    }

    // Check for available standalone samples and add tab if any exist
    const availableStandaloneSamples = getAvailableStandaloneSamples(product);
    const hasStandaloneSamples = Object.keys(availableStandaloneSamples).length > 0;
    let standaloneSampleContent = '';

    if (hasStandaloneSamples) {
        tabs.push({label: 'Standalone', value: 'sa-samples'});

        // Build sample tabs for each available language
        // Order: Script, Arduino
        let standaloneSampleTabs = [];
        let standaloneSampleTabItems = [];

        if (availableStandaloneSamples.script) {
            const scriptCode = loadSampleContent(availableStandaloneSamples.script);
            if (scriptCode) {
                standaloneSampleTabs.push({label: 'Script', value: 'script'});
                standaloneSampleTabItems.push(`<TabItem value="script">

                    This example runs using the default DUELink [Internal Engine](/docs/engine/intro) using its [Scripting Language](/docs/engine/scripting), and it expects the driver to be loaded first, see the <a href="?show=driver" onClick={(e) => { e.preventDefault(); const scrollPos = window.scrollY; window.history.pushState(null, '', '?show=driver'); Array.from(document.querySelectorAll('.tabs__item')).find(el => el.textContent === 'Driver')?.click(); setTimeout(() => window.scrollTo(0, scrollPos), 0); }} style={{"cursor": "pointer"}}>Driver Tab</a>.

\`\`\`py reference title="Standalone Script Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/standalone/${baseName}.txt
\`\`\`

</TabItem>`);
            }
        }

        if (availableStandaloneSamples.arduino) {
            const arduinoCode = loadSampleContent(availableStandaloneSamples.arduino);
            if (arduinoCode !== null) {
                standaloneSampleTabs.push({label: 'Arduino', value: 'arduino'});
                standaloneSampleTabItems.push(`<TabItem value="arduino">

                See [Arduino](/docs/hw/arduino) page for more info.

\`\`\`ino reference title="Standalone Arduino Sample"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/sample/standalone/${baseName}.ino
\`\`\`

</TabItem>`);
            }
        }

        if (availableStandaloneSamples.microblocks) {
            const microblocksCode = loadSampleContent(availableStandaloneSamples.microblocks);
            if (microblocksCode) {
                standaloneSampleTabs.push({label: 'MicroBlocks', value: 'microblocks'});
                standaloneSampleTabItems.push(`<TabItem value="microblocks">

                    This project runs standalone. It assumes that the [MicroBlocks](/docs/language/microblocks) firmware is already loaded on the module.

                    Click the button below to open, edit, and run the project directly on MicroBlocks' website.

                    <Button
                    style={{ color:'white' }}
                    label="Load Project"
                    link="https://microblocks.fun/run-pilot/microblocks.html?project=https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/code/sample/standalone/${baseName}.ubp"
                    />

</TabItem>`);
            }
        }

        if (standaloneSampleTabItems.length > 0) {
            standaloneSampleContent = `
<TabItem value="sa-samples">

These samples show how to run DUELink [Standalone](/docs/language/standalone).

<Tabs groupid="standalone-language" queryString="sa-lang" defaultValue="${standaloneSampleTabs[0].value}"
  values={${JSON.stringify(standaloneSampleTabs, null, 4).replace(/"([^"]+)":/g, '$1:')}}>

${standaloneSampleTabItems.join('\n')}

</Tabs>

</TabItem>`;
        }
    }

    // Generate driver tab content if driver file exists
    let driverTabContent = '';
    
    if (driverPath) {
        // Use driverApi from product JSON if available, otherwise no table
        const driverTable = product.driverApi || '';
        
        // Extract just the product name without revision
        const productBaseName = product.name.replace(/\s+[A-Z]$/i, '');
        
        // Use reference attribute for GitHub CodeBlock plugin
        driverTabContent = `
<TabItem value="driver">

See [Drivers](/docs/engine/drivers) page for further details.

${driverTable ? driverTable + '\n' : ''}<details>
<summary><strong>The Code!</strong></summary>

\`\`\`py reference title="${productBaseName} Driver"
https://github.com/ghi-electronics/duelink-website/blob/dev/static/code/driver/${baseName}.txt
\`\`\`

</details>

</TabItem>`;
    }
    
    const mdxContent = `---
sidebar_position: ${index + 1}
title: ${product.name}
description: ${product.name} - DUELink module
hide_table_of_contents: true
pagination_next: null
pagination_prev: null
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ImageSection from '@site/src/components/ImageSection';
import ProductFooter from '@site/src/components/ProductFooter';

# ${product.name}

${imagePrefix !== null ? `<ImageSection 
  product="${imagePrefix}"
  tagline="${(product.tagline || 'DUELink module').replace(/"/g, '&quot;')}"
/>` : ''}

---

<Tabs className="unique-tabs" groupid="catalog" queryString="show" defaultValue="overview"
  values={${JSON.stringify(tabs, null, 4).replace(/"([^"]+)":/g, '$1:')}}>

<TabItem value="overview">

${product.description}

<table><td width='50%'>
**Key features**

${(product.keyFeatures || []).map(f => `• ${f}<br/>`).join('\n')}
</td><td width='50%'>
${resourcesSection}${pidSection}
</td></table>

</TabItem>
${driverTabContent}
${sampleContent}
${standaloneSampleContent}

</Tabs>

---

${generateOrderSection(product)}

<ProductFooter />
`;

    return mdxContent;
}

// Process all products
console.log('Generating product pages...');
let generatedCount = 0;
let errors = [];

productData.products.forEach((product, index) => {
    try {
        const filename = generateFilename(product.name, product.partNumber);
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