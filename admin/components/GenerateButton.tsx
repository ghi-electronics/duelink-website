'use client';

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Download as DownloadIcon,
  Upload as UploadIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { exportProductsToJSON, importProducts, DuelinkJSON } from '@/lib/productService';

const GenerateButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<{
    success: boolean;
    downloadUrl?: string;
    products: number;
    categories: number;
    jsonData?: DuelinkJSON;
    imported?: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Export from Memory',
    'Generate MDX Files',
    'Update JSON',
    'Ready to Deploy'
  ];

  const handleGenerate = async () => {
    setOpen(true);
    setLoading(true);
    setError(null);
    setResult(null);
    setActiveStep(0);

    try {
      // Step 1: Export from memory
      setActiveStep(0);
      const jsonData = await exportProductsToJSON();
      
      // Step 2: Generate MDX files (this would be done server-side)
      setActiveStep(1);
      
      // Create downloadable JSON
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      setResult({
        success: true,
        downloadUrl: url,
        products: jsonData.products.length,
        categories: [...new Set(jsonData.products.map(p => p.category))].length,
        jsonData: jsonData
      });
      
      setActiveStep(3);
      
    } catch (err) {
      console.error('Generation error:', err);
      setError((err as Error).message || 'Failed to generate files');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (result && result.jsonData) {
      try {
        const jsonString = JSON.stringify(result.jsonData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        
        // Always use standard download
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'duelink.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Close the dialog after download
        setTimeout(() => {
          handleClose();
        }, 500);
      } catch (error) {
        console.error('Export error:', error);
        setError('Error exporting products');
      }
    }
  };

  const handleImportJSON = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        
        try {
          setLoading(true);
          setError(null);
          
          const text = await file.text();
          const data = JSON.parse(text);
          
          if (!data.products || !Array.isArray(data.products)) {
            setError('Invalid JSON format: missing products array');
            setLoading(false);
            return;
          }
          
          const confirmMessage = `This will load ${data.products.length} products from the file. Continue?`;
          
          if (!window.confirm(confirmMessage)) {
            setLoading(false);
            return;
          }
          
          // Import products using the service
          await importProducts(data);
          
          setResult({
            success: true,
            imported: true,
            products: data.products.length,
            categories: [...new Set(data.products.map((p: { category: string }) => p.category))].length
          });
          
          // Close dialog after a delay to show success message
          setTimeout(() => {
            setOpen(false);
            setResult(null);
            // Trigger a page refresh by dispatching a custom event
            window.dispatchEvent(new CustomEvent('products-imported'));
          }, 2000);
          
        } catch (error) {
          console.error('Import error:', error);
          setError('Error importing products: ' + (error as Error).message);
        } finally {
          setLoading(false);
        }
      };
      
      input.click();
    } catch (error) {
      console.error('Import error:', error);
      setError('Error importing products');
    }
  };

  const handleGenerateScript = () => {
    if (result && result.jsonData) {
      // Create a script that can be run to generate MDX files
      const script = `
// Save this as generate-mdx.js and run with Node.js
const fs = require('fs');
const path = require('path');

const jsonData = ${JSON.stringify(result.jsonData, null, 2)};

// Save JSON file
fs.writeFileSync(path.join(__dirname, 'static', 'duelink.json'), JSON.stringify(jsonData, null, 2));

console.log('Generated duelink.json with ' + jsonData.products.length + ' products');
console.log('Run npm run generate-catalog to create MDX files');
`;
      
      const blob = new Blob([script], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generate-mdx.js';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setResult(null);
    setError(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<SaveIcon />}
          onClick={handleGenerate}
        >
          Export JSON
        </Button>
        <Button
          variant="outlined"
          startIcon={<UploadIcon />}
          onClick={handleImportJSON}
          disabled={loading}
        >
          Import JSON
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{result?.imported ? 'Import Products' : 'Export Products'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {loading && (
              <>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                  <CircularProgress />
                </Box>
                <Typography align="center" color="text.secondary">
                  {steps[activeStep]}...
                </Typography>
              </>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {result && result.success && (
              <>
                <Alert severity="success" sx={{ mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    {result.imported ? 'Import Successful!' : 'Export Successful!'}
                  </Typography>
                  <Typography variant="body2">
                    {result.imported 
                      ? `Successfully imported ${result.products} products from the JSON file.`
                      : 'Products have been exported. Save the file to your desired location.'}
                  </Typography>
                </Alert>
                
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Summary
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText 
                        primary="Products Exported"
                        secondary={result.products}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText 
                        primary="Categories"
                        secondary={result.categories}
                      />
                    </ListItem>
                  </List>
                </Box>

                {!result.imported && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Download JSON File:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Click the button below to download the JSON file to your Downloads folder.
                      You can then use this file to import products later or deploy to production.
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                      >
                        Download duelink.json
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {result ? 'Close' : 'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GenerateButton;