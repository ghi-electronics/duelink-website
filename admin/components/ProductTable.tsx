'use client';

import React, { useState, useEffect } from 'react';
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
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { getProducts, addProduct, updateProduct, deleteProduct, Product } from '@/lib/productService';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
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
  }, []);

  const loadCategories = async () => {
    try {
      const docRef = doc(db, 'settings', 'categories');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setCategories(docSnap.data().list || []);
      } else {
        // Default categories
        const defaultCategories = [
          'Microcomputer', 'Display', 'Actuator', 'Communication',
          'HMI', 'Storage', 'Wireless', 'Sensor', 'LED', 'Sound',
          'Vision', 'Adapter', 'Special'
        ];
        setCategories(defaultCategories);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback to default categories
      setCategories([
        'Microcomputer', 'Display', 'Actuator', 'Communication',
        'HMI', 'Storage', 'Wireless', 'Sensor', 'LED', 'Sound',
        'Vision', 'Adapter', 'Special'
      ]);
    }
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

  const handleOpen = (product: Product | null = null) => {
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
  };

  const handleClose = () => {
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
  };

  const handleSave = async () => {
    try {
      if (editMode && currentProduct.id) {
        await updateProduct(currentProduct.id, currentProduct);
        showSnackbar('Product updated successfully');
      } else {
        await addProduct(currentProduct);
        showSnackbar('Product added successfully');
      }
      loadProducts();
      handleClose();
    } catch (error) {
      showSnackbar('Error saving product', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        showSnackbar('Product deleted successfully');
        loadProducts();
      } catch (error) {
        showSnackbar('Error deleting product', 'error');
      }
    }
  };

  const handleDuplicate = (product: Product) => {
    const { id, ...productData } = product;
    setCurrentProduct({
      ...productData,
      Name: `${productData.Name} (Copy)`,
      PartNumber: `${productData.PartNumber}-COPY`
    });
    setEditMode(false);
    setOpen(true);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const columns: GridColDef[] = [
    { 
      field: 'Img', 
      headerName: 'Image', 
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <Box sx={{ 
            width: 80, 
            height: 80, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            p: 0.5
          }}>
            <img 
              src={`https://raw.githubusercontent.com/ghi-electronics/duelink-website/refs/heads/dev/static/img/catalog/${params.value}`}
              alt={params.row.Name}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '100%', 
                objectFit: 'contain' 
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRTBFMEUwIi8+CjxwYXRoIGQ9Ik0yOCA0NUw0MCAzM0w1MiA0NU0zNCAxOUgzNEMzNS42NTY5IDE5IDM3IDE3LjY1NjkgMzcgMTZWMTZDMzcgMTQuMzQzMSAzNS42NTY5IDEzIDM0IDEzVjEzQzMyLjM0MzEgMTMgMzEgMTQuMzQzMSAzMSAxNlYxNkMzMSAxNy42NTY5IDMyLjM0MzEgMTkgMzQgMTlaIiBzdHJva2U9IiM5RTlFOUUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==';
              }}
            />
          </Box>
        ) : (
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
        )
      )
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
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpen(params.row)}
        />,
        <GridActionsCellItem
          key="copy"
          icon={<CopyIcon />}
          label="Duplicate"
          onClick={() => handleDuplicate(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id!)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Product Management</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Product
        </Button>
      </Box>

      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[25, 50, 100]}
        loading={loading}
        autoHeight
        disableRowSelectionOnClick
        rowHeight={90}
        slots={{
          toolbar: GridToolbar,
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
            display: 'flex',
            alignItems: 'center'
          }
        }}
      />

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