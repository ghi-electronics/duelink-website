import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Alert,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  CircularProgress,
  IconButton,
  Snackbar
} from '@mui/material';
import {
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import ProductTable from '../admin/ProductTable';
import GenerateButton from '../admin/GenerateButton';
import { migrateProducts } from '../admin/productService';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [tabValue, setTabValue] = useState(0);
  const [migrating, setMigrating] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleMigration = async () => {
    if (!window.confirm('This will migrate all products from static/duelink.json to Firebase. Continue?')) {
      return;
    }

    setMigrating(true);
    try {
      // Fetch the existing JSON data
      const response = await fetch('/duelink.json');
      const data = await response.json();
      
      // Migrate to Firebase
      await migrateProducts(data);
      
      setSnackbar({
        open: true,
        message: `Successfully migrated ${data.boards.length} products to Firebase!`,
        severity: 'success'
      });
      
      // Refresh the page to show new data
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Migration error:', error);
      setSnackbar({
        open: true,
        message: 'Migration failed: ' + error.message,
        severity: 'error'
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <Layout title="Admin Panel" description="DUELink Product Administration">
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3}>
          <AppBar position="static" color="default">
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <svg width="200" height="50" viewBox="0 0 800 300" style={{ marginRight: '20px' }}>
                  {/* GHI Logo simplified */}
                  <g transform="scale(0.25)">
                    {/* S-shaped connectors in blue/orange */}
                    <path d="M100 50 Q100 20 70 20 L30 20 Q0 20 0 50 L0 80 L30 80 Q60 80 60 110 L60 150 Q60 180 90 180 L120 180 L120 150 Q120 120 90 120 L60 120" fill="#2980b9"/>
                    <path d="M150 20 Q150 50 180 50 L220 50 Q250 50 250 20 L250 0 L220 0 Q190 0 190 30 L190 20" fill="#7f8c8d"/>
                    <rect x="150" y="80" width="50" height="50" rx="10" fill="#f39c12"/>
                    <path d="M250 80 Q280 80 280 110 L280 150 Q280 180 250 180 L220 180 L220 150 Q220 120 250 120 L280 120" fill="#7f8c8d"/>
                    <path d="M120 200 Q120 230 150 230 L180 230 Q210 230 210 200 L210 180 L180 180 Q150 180 150 210 L150 230" fill="#f39c12"/>
                    {/* GHI Text */}
                    <text x="320" y="180" fontFamily="Arial, sans-serif" fontSize="120" fontWeight="bold" fill="#2980b9">GHI</text>
                    <text x="320" y="220" fontFamily="Arial, sans-serif" fontSize="48" fill="#7f8c8d">electronics</text>
                  </g>
                </svg>
                <Typography variant="h6">
                  Product Admin Panel
                </Typography>
              </Box>
              <Button
                variant="outlined"
                startIcon={migrating ? <CircularProgress size={20} /> : <UploadIcon />}
                onClick={handleMigration}
                disabled={migrating}
                sx={{ mr: 2 }}
              >
                {migrating ? 'Migrating...' : 'Migrate from JSON'}
              </Button>
              <GenerateButton />
            </Toolbar>
          </AppBar>

          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin tabs">
              <Tab label="Products" />
              <Tab label="Settings" />
              <Tab label="Help" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <ProductTable />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom>
              Settings
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              Firebase project: ghi-electronics
            </Alert>
            <Typography variant="body1" paragraph>
              Configure your Firebase settings and deployment options here.
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Environment Configuration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Make sure to set the following environment variables:
              </Typography>
              <Box component="pre" sx={{ 
                bgcolor: 'grey.100', 
                p: 2, 
                borderRadius: 1,
                overflow: 'auto',
                mt: 1
              }}>
                {`REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=ghi-electronics.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=ghi-electronics
REACT_APP_FIREBASE_STORAGE_BUCKET=ghi-electronics.appspot.com`}
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom>
              How to Use
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Start Guide
              </Typography>
              
              <Typography variant="body1" paragraph>
                <strong>1. First Time Setup:</strong>
              </Typography>
              <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                Click "Migrate from JSON" to import your existing products from static/duelink.json into Firebase.
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>2. Managing Products:</strong>
              </Typography>
              <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                - Use the Products tab to add, edit, or delete products
                - All changes are saved to Firebase in real-time
                - Use the search and filter options to find specific products
              </Typography>

              <Typography variant="body1" paragraph>
                <strong>3. Deploying Changes:</strong>
              </Typography>
              <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                - Click "Generate & Deploy" to export products from Firebase
                - This generates MDX files for each product and category
                - Updates the static/duelink.json file
                - Commits changes to Git (when server endpoint is configured)
              </Typography>

              <Alert severity="warning" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Note:</strong> For full automation, you'll need to set up a server endpoint at /api/admin/generate 
                  that can write files and commit to Git. Until then, download the generated JSON and commit manually.
                </Typography>
              </Alert>
            </Box>
          </TabPanel>
        </Paper>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}