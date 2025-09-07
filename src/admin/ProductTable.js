import React, { useState, useEffect } from 'react';
import {
  DataGrid,
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
  IconButton,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { getProducts, addProduct, updateProduct, deleteProduct } from './productService';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    Name: '',
    PartNumber: '',
    PID: '',
    Category: '',
    Img: '',
    Code: '',
    Notes: ''
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const categories = [
    'Microcomputer', 'Display', 'Actuator', 'Communication',
    'HMI', 'Storage', 'Wireless', 'Sensor', 'LED', 'Sound',
    'Vision', 'Adapter', 'Special'
  ];

  useEffect(() => {
    loadProducts();
  }, []);

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

  const handleOpen = (product = null) => {
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
      if (editMode) {
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

  const handleDelete = async (id) => {
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

  const handleDuplicate = (product) => {
    const { id, ...productData } = product;
    setCurrentProduct({
      ...productData,
      Name: `${productData.Name} (Copy)`,
      PartNumber: `${productData.PartNumber}-COPY`
    });
    setEditMode(false);
    setOpen(true);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const columns = [
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
      field: 'Img', 
      headerName: 'Image', 
      width: 150,
      renderCell: (params) => params.value ? '✓ Has Image' : '✗ No Image'
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleOpen(params.row)}
        />,
        <GridActionsCellItem
          icon={<CopyIcon />}
          label="Duplicate"
          onClick={() => handleDuplicate(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
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
        pageSize={25}
        rowsPerPageOptions={[25, 50, 100]}
        loading={loading}
        autoHeight
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid rgba(224, 224, 224, 1)',
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