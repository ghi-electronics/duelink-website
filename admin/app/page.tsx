'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Container,
  Box,
  Paper,
  Typography,
  Tab,
  Tabs,
  AppBar,
  Toolbar,
  ThemeProvider,
  createTheme,
  Button,
  Chip,
  IconButton,
  PaletteMode
} from '@mui/material';
import {
  Save as SaveIcon,
  SaveAlt as SaveAltIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon
} from '@mui/icons-material';
import ProductTable from '@/components/ProductTable';
import GenerateButton from '@/components/GenerateButton';
import CategoriesManager from '@/components/CategoriesManager';

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
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState<PaletteMode>('light');

  // Load dark mode preference from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('admin-dark-mode');
    if (savedMode && (savedMode === 'dark' || savedMode === 'light')) {
      setDarkMode(savedMode as PaletteMode);
    }
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode,
          primary: {
            main: '#2980b9',
          },
          secondary: {
            main: '#f39c12',
          },
        },
      }),
    [darkMode]
  );

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('admin-dark-mode', newMode);
      return newMode;
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const setupAutoSave = useCallback(async () => {
    if (!('showSaveFilePicker' in window)) {
      alert('Auto-save requires a modern browser (Chrome/Edge)');
      return;
    }

    try {
      const handle = await (window as typeof window & { 
        showSaveFilePicker: (options: {
          suggestedName: string;
          types: Array<{
            description: string;
            accept: { [key: string]: string[] };
          }>;
        }) => Promise<FileSystemFileHandle>;
      }).showSaveFilePicker({
        suggestedName: 'duelink.json',
        types: [{
          description: 'JSON File',
          accept: { 'application/json': ['.json'] }
        }]
      });
      
      setFileHandle(handle);
      setAutoSaveEnabled(true);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Failed to set up auto-save', err);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Paper elevation={3}>
            <AppBar position="static" color="default">
              <Toolbar sx={{ py: 1 }}>
                {/* Left side - Logos and Title */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Superfly Logo */}
                  <Box sx={{ 
                    width: 50, 
                    height: 50, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'white',
                    borderRadius: 1,
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
                  <svg width="150" height="40" viewBox="0 0 400 150">
                    <g>
                      <text x="0" y="80" fontFamily="Arial, sans-serif" fontSize="60" fontWeight="bold" fill="#2980b9">GHI</text>
                      <text x="0" y="110" fontFamily="Arial, sans-serif" fontSize="24" fill="#7f8c8d">electronics</text>
                    </g>
                  </svg>
                  
                  <Typography variant="h6">
                    Product Admin Panel
                  </Typography>
                </Box>

                {/* Spacer */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Right side - Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {autoSaveEnabled ? (
                    <Chip
                      icon={<SaveIcon />}
                      label="Auto-save ON"
                      color="success"
                      onDelete={() => {
                        setAutoSaveEnabled(false);
                        setFileHandle(null);
                      }}
                    />
                  ) : (
                    <Button
                      variant="outlined"
                      startIcon={<SaveAltIcon />}
                      onClick={setupAutoSave}
                    >
                      Enable Auto-save
                    </Button>
                  )}
                  
                  <IconButton 
                    onClick={toggleDarkMode}
                    color="inherit"
                    aria-label="toggle dark mode"
                  >
                    {darkMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  
                  <GenerateButton />
                </Box>
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
              <ProductTable 
                autoSaveEnabled={autoSaveEnabled} 
                fileHandle={fileHandle} 
              />
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
                  <strong>1. Getting Started:</strong>
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  Click &quot;Import JSON&quot; to load your existing products from a duelink.json file.
                </Typography>

                <Typography variant="body1" paragraph>
                  <strong>2. Managing Products:</strong>
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  - Use the Products tab to add, edit, or delete products<br />
                  - Changes are stored in memory until exported<br />
                  - Use the search and filter options to find specific products
                </Typography>

                <Typography variant="body1" paragraph>
                  <strong>3. Saving Your Work:</strong>
                </Typography>
                <Typography variant="body2" paragraph sx={{ ml: 2 }}>
                  - Click &quot;Export JSON&quot; to save your products to a file<br />
                  - Enable &quot;Auto-save&quot; to automatically save changes to a selected file<br />
                  - Your browser will prompt you to choose where to save the file
                </Typography>

              </Box>
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}