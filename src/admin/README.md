# DUELink Admin Panel

Firebase-based admin panel for managing DUELink product catalog.

## Features

- ✅ **Product Management**: Add, edit, delete products with MUI DataGrid
- ✅ **Firebase Integration**: Real-time sync with Firestore database
- ✅ **MDX Generation**: Auto-generate product pages and catalog
- ✅ **Git Integration**: Commit and deploy with one click
- ✅ **GHI Electronics Branding**: Official logo and styling

## Setup

1. **Firebase Configuration**
   - Using GHI Electronics Firebase project
   - Update `.env` with your Firebase credentials if needed

2. **Start Development Server**
   ```bash
   npm start
   ```
   Server runs on port 3005 by default

3. **Access Admin Panel**
   Navigate to: http://localhost:3005/admin

## Usage

### First Time Setup
1. Click "Migrate from JSON" to import existing products from `/static/duelink.json`
2. This will populate Firebase with your current product data

### Managing Products
- **Add Product**: Click "Add Product" button
- **Edit**: Click edit icon in the actions column
- **Delete**: Click delete icon (with confirmation)
- **Duplicate**: Click copy icon to duplicate a product

### Deploying Changes
1. Make your changes in the admin panel
2. Click "Generate & Deploy" button
3. This will:
   - Export products from Firebase
   - Generate MDX files for each product
   - Update `/static/duelink.json`
   - Create category pages

### Manual Generation
You can also run generation scripts manually:

```bash
# Generate catalog files only
npm run generate-catalog

# Generate and commit
npm run generate-catalog:commit

# Generate, commit, and push
npm run generate-catalog:deploy
```

## File Structure

```
/src/admin/
├── firebase-config.js    # Firebase configuration
├── productService.js     # CRUD operations for products
├── ProductTable.js       # MUI DataGrid component
├── GenerateButton.js     # Deploy button component
├── mdxGenerator.js       # MDX file generation
└── api-handler.js        # API endpoint for server-side generation

/scripts/
└── generate-catalog.js   # Node script for generating catalog

/docs/catalog/
├── products/            # Individual product MDX pages
└── [category].mdx       # Category listing pages
```

## Product Fields

- **Name**: Product name
- **PartNumber**: Unique part number (e.g., GDL-MCCINCOBIT-E)
- **PID**: Product ID in hex format (e.g., 0x000001)
- **Category**: Product category (Microcomputer, Display, etc.)
- **Img**: Image filename in `/static/img/catalog/`
- **Code**: Path to driver code file
- **Notes**: Optional product notes

## Environment Variables

```env
PORT=3005
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=ghi-electronics.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ghi-electronics
REACT_APP_FIREBASE_STORAGE_BUCKET=ghi-electronics.appspot.com
```

## Troubleshooting

- **Port conflicts**: Change port in `package.json` start script
- **Firebase errors**: Check `.env` file and Firebase console
- **Build errors**: Run `npm run clear` and rebuild

## Development Notes

- Admin panel uses Material-UI (MUI) for consistent UI
- Firebase Firestore for real-time data sync
- MDX files generated for better SEO and static site benefits
- Git integration for CI/CD pipeline compatibility