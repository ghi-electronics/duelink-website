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
  CloudUpload as DeployIcon,
  Download as DownloadIcon
} from '@mui/icons-material';
import { exportProductsToJSON } from '@/lib/productService';

const GenerateButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Export from Firebase',
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
      // Step 1: Export from Firebase
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
        products: jsonData.boards.length,
        categories: [...new Set(jsonData.boards.map(b => b.Category))].length,
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

  const handleDownload = () => {
    if (result && result.downloadUrl) {
      const a = document.createElement('a');
      a.href = result.downloadUrl;
      a.download = 'duelink.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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

console.log('Generated duelink.json with ' + jsonData.boards.length + ' products');
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
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<DeployIcon />}
        onClick={handleGenerate}
      >
        Generate
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Generate Catalog</DialogTitle>
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
                    Export Successful!
                  </Typography>
                  <Typography variant="body2">
                    Products have been exported from Firebase. Download the files below and run the generation script.
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

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Next Steps:
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    1. Download the generated JSON file<br />
                    2. Copy it to your main project's /static folder<br />
                    3. Run: <code>npm run generate-catalog</code><br />
                    4. Commit and push the changes
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<DownloadIcon />}
                      onClick={handleDownload}
                    >
                      Download duelink.json
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={handleGenerateScript}
                    >
                      Download Script
                    </Button>
                  </Box>
                </Box>
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