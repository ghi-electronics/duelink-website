'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Fuse from 'fuse.js';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  Chip,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { getProducts, addProduct, updateProduct, deleteProduct, Product, exportProductsToJSON } from '@/lib/productService';

interface ProductTableProps {
  autoSaveEnabled?: boolean;
  fileHandle?: any;
}

const ProductTable: React.FC<ProductTableProps> = ({ autoSaveEnabled = false, fileHandle = null }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    Name: '',
    PartNumber: '',
    PID: '',
    Category: '',
    Img: '',
    Code: '',
    Notes: ''
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadProducts();
    loadCategories();
    
    // Listen for import events
    const handleImport = () => {
      loadProducts();
    };
    
    window.addEventListener('products-imported', handleImport);
    
    return () => {
      window.removeEventListener('products-imported', handleImport);
    };
  }, []);

  const loadCategories = async () => {
    // Use default categories
    const defaultCategories = [
      'Microcomputer', 'Display', 'Actuator', 'Communication',
      'HMI', 'Storage', 'Wireless', 'Sensor', 'LED', 'Sound',
      'Vision', 'Adapter', 'Special'
    ];
    setCategories(defaultCategories);
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      showSnackbar('Error loading products', 'error');
    }
    setLoading(false);
  };

  const handleOpen = useCallback((product: Product | null = null) => {
    if (product) {
      setCurrentProduct(product);
      setEditMode(true);
    } else {
      setCurrentProduct({
        Name: '',
        PartNumber: '',
        PID: '',
        Category: '',
        Img: '',
        Code: '',
        Notes: ''
      });
      setEditMode(false);
    }
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setCurrentProduct({
      Name: '',
      PartNumber: '',
      PID: '',
      Category: '',
      Img: '',
      Code: '',
      Notes: ''
    });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      if (editMode && currentProduct.id) {
        await updateProduct(currentProduct.id, currentProduct);
        showSnackbar('Product updated successfully');
      } else {
        await addProduct(currentProduct);
        showSnackbar('Product added successfully');
      }
      await loadProducts();
      handleClose();
      
      // Auto-save if enabled
      if (autoSaveEnabled) {
        await autoSaveJSON();
      }
    } catch (error) {
      showSnackbar('Error saving product', 'error');
    }
  }, [editMode, currentProduct, autoSaveEnabled]);

  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        showSnackbar('Product deleted successfully');
        await loadProducts();
        
        // Auto-save if enabled
        if (autoSaveEnabled) {
          await autoSaveJSON();
        }
      } catch (error) {
        showSnackbar('Error deleting product', 'error');
      }
    }
  }, [autoSaveEnabled]);

  const handleDuplicate = useCallback((product: Product) => {
    const { id, ...productData } = product;
    setCurrentProduct({
      ...productData,
      Name: `${productData.Name} (Copy)`,
      PartNumber: `${productData.PartNumber}-COPY`
    });
    setEditMode(false);
    setOpen(true);
  }, []);

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const autoSaveJSON = async () => {
    const saveHandle = fileHandle;
    if (!saveHandle) return;
    
    try {
      // Export current data from localStorage
      const jsonData = await exportProductsToJSON();
      const jsonString = JSON.stringify(jsonData, null, 2);
      
      // Write to the file
      const writable = await saveHandle.createWritable();
      await writable.write(jsonString);
      await writable.close();
      
      console.log('Auto-saved to duelink.json');
    } catch (error) {
      console.error('Auto-save error:', error);
      // If permission was revoked, show error
      if (error instanceof Error && error.name === 'NotAllowedError') {
        showSnackbar('Auto-save failed: File access permission lost', 'error');
      }
    }
  };

  // Fuzzy search configuration
  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: [
        { name: 'Name', weight: 0.4 },
        { name: 'PartNumber', weight: 0.3 },
        { name: 'Category', weight: 0.2 },
        { name: 'PID', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      shouldSort: true,
      findAllMatches: true,
      minMatchCharLength: 2
    });
  }, [products]);

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    const results = fuse.search(searchTerm);
    return results.map(result => result.item);
  }, [searchTerm, fuse, products]);

  const columns: GridColDef[] = useMemo(() => [
    { 
      field: 'Img', 
      headerName: 'Image', 
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const [imgError, setImgError] = useState(false);
        
        if (!params.value || imgError) {
          return (
            <Box sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1
            }}>
              <span style={{ fontSize: '12px', color: '#999' }}>No Image</span>
            </Box>
          );
        }
        
        return (
          <Box sx={{ 
            width: 80, 
            height: 80, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 0.5
          }}>
            <img 
              loading="lazy"
              src={`https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/img/catalog/${params.value}`}
              alt={params.row.Name}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }}
              onError={() => setImgError(true)}
            />
          </Box>
        );
      }
    },
    { 
      field: 'Name', 
      headerName: 'Product Name', 
      flex: 1,
      minWidth: 200
    },
    { 
      field: 'PartNumber', 
      headerName: 'Part Number', 
      width: 180
    },
    { 
      field: 'PID', 
      headerName: 'PID', 
      width: 100
    },
    { 
      field: 'Category', 
      headerName: 'Category',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" variant="outlined" />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={
            <Tooltip title="Edit product">
              <EditIcon />
            </Tooltip>
          }
          label="Edit"
          onClick={() => handleOpen(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key="copy"
          icon={
            <Tooltip title="Duplicate product">
              <CopyIcon />
            </Tooltip>
          }
          label="Duplicate"
          onClick={() => handleDuplicate(params.row)}
          showInMenu={false}
        />,
        <GridActionsCellItem
          key="delete"
          icon={
            <Tooltip title="Delete product">
              <DeleteIcon />
            </Tooltip>
          }
          label="Delete"
          onClick={() => handleDelete(params.row.id!)}
          showInMenu={false}
        />,
      ],
    },
  ], [handleOpen, handleDuplicate, handleDelete]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
        <h2 style={{ margin: 0 }}>Product Management</h2>
        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: 400 }}
          InputProps={{
            startAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                🔍
              </Box>
            ),
            endAdornment: searchTerm && (
              <Button
                size="small"
                onClick={() => setSearchTerm('')}
                sx={{ minWidth: 'auto', p: 0.5 }}
              >
                ✕
              </Button>
            )
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>
      {searchTerm && (
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Found {filteredProducts.length} products matching "{searchTerm}"
          </Typography>
        </Box>
      )}

      <Box sx={{ height: 'calc(100vh - 300px)', minHeight: 600 }}>
        <DataGrid
          rows={filteredProducts}
          columns={columns}
          pageSizeOptions={[25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          loading={loading}
          disableRowSelectionOnClick
          rowHeight={90}
          columnBuffer={2}
          rowBuffer={10}
          disableVirtualization={false}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid rgba(224, 224, 224, 1)',
              display: 'flex',
              alignItems: 'center'
            },
            '& .MuiDataGrid-virtualScroller': {
              minHeight: 400,
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              minHeight: 400,
            }
          }}
          getRowId={(row) => row.id || `${row.PartNumber}-${row.PID}`}
        />
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Product Name"
              value={currentProduct.Name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Part Number"
              value={currentProduct.PartNumber}
              onChange={(e) => setCurrentProduct({ ...currentProduct, PartNumber: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="PID"
              value={currentProduct.PID}
              onChange={(e) => setCurrentProduct({ ...currentProduct, PID: e.target.value })}
              fullWidth
              required
              placeholder="e.g., 0x000001"
            />
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={currentProduct.Category}
                onChange={(e) => setCurrentProduct({ ...currentProduct, Category: e.target.value })}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Image Filename"
              value={currentProduct.Img}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Img: e.target.value })}
              fullWidth
              placeholder="e.g., product-name-front.png"
            />
            <TextField
              label="Code Path"
              value={currentProduct.Code}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Code: e.target.value })}
              fullWidth
              placeholder="e.g., microcomputer/product.txt"
            />
            <TextField
              label="Notes"
              value={currentProduct.Notes || ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, Notes: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default ProductTable;