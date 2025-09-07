'use client';

import { useState, useEffect } from 'react';
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
  Snackbar,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Upload as UploadIcon,
  CloudUpload as DeployIcon
} from '@mui/icons-material';
import ProductTable from '@/components/ProductTable';
import GenerateButton from '@/components/GenerateButton';
import CategoriesManager from '@/components/CategoriesManager';
import { migrateProducts, DuelinkJSON } from '@/lib/productService';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2980b9',
    },
    secondary: {
      main: '#f39c12',
    },
  },
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

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
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' | 'info' | 'warning'
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
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
      const data: DuelinkJSON = await response.json();
      
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
        message: 'Migration failed: ' + (error as Error).message,
        severity: 'error'
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper elevation={3}>
            <AppBar position="static" color="default">
              <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  {/* Superfly Logo */}
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    mr: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white',
                    borderRadius: 2,
                    overflow: 'hidden'
                  }}>
                    <img 
                      src="/superfly.jpeg" 
                      alt="Superfly" 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </Box>
                  
                  {/* GHI Logo */}
                  <svg width="300" height="60" viewBox="0 0 800 200" style={{ marginRight: '20px' }}>
                    <g>
                      <text x="0" y="120" fontFamily="Arial, sans-serif" fontSize="100" fontWeight="bold" fill="#2980b9">GHI</text>
                      <text x="0" y="160" fontFamily="Arial, sans-serif" fontSize="40" fill="#7f8c8d">electronics</text>
                    </g>
                  </svg>
                  
                  <Typography variant="h6" sx={{ ml: 2 }}>
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
                <Tab label="Categories" />
                <Tab label="Help" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <ProductTable />
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <CategoriesManager />
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
                  - Use the Products tab to add, edit, or delete products<br />
                  - All changes are saved to Firebase in real-time<br />
                  - Use the search and filter options to find specific products
                </Typography>

                <Typography variant="body1" paragraph>
                  <strong>3. Deploying Changes:</strong>
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  - Click "Generate & Deploy" to export products from Firebase<br />
                  - This generates MDX files for each product and category<br />
                  - Updates the static/duelink.json file<br />
                  - Commits changes to Git (when server endpoint is configured)
                </Typography>

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
      </Box>
    </ThemeProvider>
  );
}