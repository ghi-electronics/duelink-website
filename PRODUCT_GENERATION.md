# Product Generation Documentation

This document explains how the DueLink product pages are generated from JSON data.

## Overview

Product pages are automatically generated from JSON files containing product metadata. The generation process creates MDX files in the `docs/products/` directory for Docusaurus to render.

## Scripts

### Generate Products
```bash
npm run generate-products
```

This script runs automatically before `npm start` and `npm run build`.

### Manual Generation
```bash
node generate-product-pages-v4.js
```

## JSON Structure

Product data is stored in `static/duelink.json` with the following structure:

### Metadata Section
```json
{
    "metadata": {
        "author": "GHI Electronics",
        "version": "0.2",
        "timestamp": "2025-09-05",
        "image_url_base": "https://raw.githubusercontent.com/.../static/img/catalog/",
        "code_url_base": "https://raw.githubusercontent.com/.../static/code/driver/",
        "fw_url_base": "https://raw.githubusercontent.com/.../static/bin/fw/"
    }
}
```

### Product Entry Structure
```json
{
    "name": "Product Name Rev A",
    "partNumber": "GDL-XXPRODUCT-A",
    "category": "Microcomputer",
    "price": 19.99,
    "shortDescription": "Brief description of the product"
}
```

## Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `name` | Yes | Display name with revision | "CincoBit Rev E" |
| `partNumber` | Yes | Unique part identifier | "GDL-MCCINCOBIT-E" |
| `category` | Yes | Product category | "Microcomputer" |
| `price` | Yes | Product price in USD | 19.99 |
| `shortDescription` | Yes | Brief product description | "CincoBit Rev E - High-quality DUELink module" |

**Note:** The simplified structure uses camelCase field names and resources (images, code, schematics) are resolved by convention from the part number.


## File Naming Conventions

### Part Numbers
Format: `GDL-[CATEGORY][PRODUCT]-[REVISION]`
- Category: 2-letter code (MC, SE, DI, SP)
- Product: Product name (uppercase, no spaces)
- Revision: Single letter (A, B, C, etc.)

### Generated Files
MDX files are created as: `[product-name]-rev-[revision].mdx`
- Example: `cincobit-rev-e.mdx`
- All lowercase with hyphens

### Image Files (Convention-Based)
Located in `static/img/catalog/`:
- Images are resolved from part number (removing GDL- prefix, lowercase)
- Format: `[product]-[1-5].webp`
- Example for GDL-MCCINCOBIT-E:
  - `mccincobit-e-1.webp` (front view)
  - `mccincobit-e-2.webp` (back view)
  - `mccincobit-e-3.webp` (pencil/size reference)
  - `mccincobit-e-4.webp` (front 45° angle)
  - `mccincobit-e-5.webp` (back 45° angle)

### Other Resource Files (Convention-Based)
- **Schematic PDFs**: `static/sch/[product].pdf`
- **3D STEP files**: `static/3d/[product].step`
- Resolved automatically from part number

## Directory Structure

```
duelink/
├── static/
│   ├── duelink.json         # Product data source
│   ├── img/
│   │   └── catalog/         # Product images
│   ├── code/
│   │   ├── driver/          # Driver code files (flat structure) 
│   │   └── sample/          # Sample code files (flat structure)
│   ├── sch/                 # Schematic PDFs
│   └── 3d/                  # 3D STEP files
├── docs/
│   └── products/            # Generated MDX files
└── generate-product-pages-v4.js  # Generation script
```

## Generated MDX Format

Each product page includes:
1. **Frontmatter** - Metadata for Docusaurus
2. **Product Image** - Interactive image selector
3. **Tabs** - Overview, Drivers, Samples sections
4. **Resources** - Links to schematics and 3D files

### Example Generated MDX
```mdx
---
sidebar_position: 1
title: Product Name Rev A
description: Product Name Rev A - High-quality DUELink module
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ProductImageSelector from '@site/src/components/ProductImageSelector';

# Product Name Rev A

<ProductImageSelector 
  partNumber="seproduct-a"
  productName="Product Name Rev A"
/>

...
```

## Adding New Products

1. Add product entry to `static/duelink.json`
2. Place product image in `static/img/catalog/`
3. Add driver code to `static/code/driver/`
4. Add schematic PDF to `static/sch/` (optional)
5. Add 3D STEP file to `static/3d/` (optional)
6. Run `npm run generate-products`

## Validation Rules

The generation script validates:
- Required fields are present (name, partNumber, category, price, shortDescription)
- Part numbers are unique
- Category is valid
- All fields use camelCase naming

## Troubleshooting

### Common Issues

1. **Missing generate script error**
   - Ensure `generate-product-pages-v4.js` exists in root
   - Check file permissions

2. **Image not found**
   - Verify image exists in `static/img/catalog/`
   - Check filename matches JSON entry

3. **MDX not generated**
   - Check JSON syntax is valid
   - Verify all required fields are present
   - Look for console errors during generation

### Regenerating Pages

To force regeneration:
```bash
# Clear existing pages
rm -rf docs/products/*.mdx

# Regenerate
npm run generate-products
```

## Notes

- The generation script runs automatically with `prestart` and `prebuild` hooks
- Generated files should not be edited manually (changes will be lost)
- Keep product images optimized for web (< 500KB)
- Use consistent naming conventions for maintainability