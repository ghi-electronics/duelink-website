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
  Check as CheckIcon
} from '@mui/icons-material';
import { exportProductsToJSON } from './productService';

const GenerateButton = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    'Export from Firebase',
    'Generate MDX Files',
    'Update JSON',
    'Commit to Git',
    'Deploy'
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
      
      // For now, we'll create a downloadable JSON and instruction
      // In production, this would call a server endpoint
      const response = await fetch('/api/admin/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData)
      }).catch(() => null);

      if (!response || !response.ok) {
        // Fallback: Create downloadable files
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        setResult({
          success: true,
          downloadUrl: url,
          products: jsonData.boards.length,
          categories: [...new Set(jsonData.boards.map(b => b.Category))].length,
          message: 'Files generated successfully. Download and commit manually.'
        });
        
        setActiveStep(4);
      } else {
        // Server-side generation successful
        const data = await response.json();
        setResult(data);
        setActiveStep(4);
      }
      
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate files');
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
        sx={{ ml: 2 }}
      >
        Generate & Deploy
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Generate and Deploy Catalog</DialogTitle>
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
                    Generation Successful!
                  </Typography>
                  <Typography variant="body2">
                    {result.message}
                  </Typography>
                </Alert>
                
                <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
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

                {result.downloadUrl && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Download the generated JSON and commit it to your repository:
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleDownload}
                      sx={{ mt: 1 }}
                    >
                      Download duelink.json
                    </Button>
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