'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
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
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';
import { getProducts, addProduct, updateProduct, deleteProduct, Product, ProductVariation, exportProductsToJSON } from '@/lib/productService';

// Dynamic import to avoid SSR issues
const MDEditor = dynamic(
  () => import('@uiw/react-md-editor'),
  { ssr: false }
);

interface ProductTableProps {
  autoSaveEnabled?: boolean;
  fileHandle?: FileSystemFileHandle | null;
}

// Simplified product interface for admin
interface SimpleProduct {
  id?: string;
  name: string;
  description: string;
  partNumber: string;
  category: string;
  price: number;
  variations?: ProductVariation[];
}

const ProductTable: React.FC<ProductTableProps> = ({ autoSaveEnabled = false, fileHandle = null }) => {
  const [products, setProducts] = useState<SimpleProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [hasVariations, setHasVariations] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<SimpleProduct>({
    name: '',
    description: '',
    partNumber: '',
    category: '',
    price: 0,
    variations: undefined
  });
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: '', 
    severity: 'success' as 'success' | 'error' 
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      // Convert to simplified format
      const simpleProducts = data.map((p: Product) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        partNumber: p.partNumber,
        category: p.category,
        price: p.price,
        variations: p.variations
      }));
      setProducts(simpleProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      setSnackbar({ 
        open: true, 
        message: 'Failed to load products', 
        severity: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const categorySet = new Set(products.map(p => p.category));
    return Array.from(categorySet).sort();
  }, [products]);

  const fuse = useMemo(
    () => new Fuse(products, {
      keys: ['name', 'partNumber', 'description', 'category'],
      threshold: 0.3,
    }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products;
    
    if (searchTerm) {
      result = fuse.search(searchTerm).map(r => r.item);
    }
    
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    return result;
  }, [products, searchTerm, selectedCategory, fuse]);

  const handleOpen = () => {
    setEditMode(false);
    setHasVariations(false);
    setCurrentProduct({
      name: '',
      description: '',
      partNumber: '',
      category: '',
      price: 0,
      variations: undefined
    });
    setOpen(true);
  };

  const handleEdit = (product: SimpleProduct) => {
    setEditMode(true);
    setCurrentProduct(product);
    setHasVariations(!!product.variations && product.variations.length > 0);
    setOpen(true);
  };

  const handleDuplicate = (product: SimpleProduct) => {
    setEditMode(false);
    const newProduct = {
      ...product,
      id: undefined,
      name: `${product.name} (Copy)`,
      partNumber: `${product.partNumber}-COPY`,
      variations: product.variations ? [...product.variations] : undefined
    };
    setCurrentProduct(newProduct);
    setHasVariations(!!newProduct.variations && newProduct.variations.length > 0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleVariationToggle = (checked: boolean) => {
    setHasVariations(checked);
    if (checked && (!currentProduct.variations || currentProduct.variations.length === 0)) {
      setCurrentProduct({
        ...currentProduct,
        variations: [{ name: '', partCode: '', price: 0 }]
      });
    } else if (!checked) {
      setCurrentProduct({
        ...currentProduct,
        variations: undefined
      });
    }
  };

  const handleAddVariation = () => {
    const newVariations = [...(currentProduct.variations || []), { name: '', partCode: '', price: 0 }];
    setCurrentProduct({ ...currentProduct, variations: newVariations });
  };

  const handleRemoveVariation = (index: number) => {
    const newVariations = currentProduct.variations?.filter((_, i) => i !== index);
    setCurrentProduct({ ...currentProduct, variations: newVariations });
    if (!newVariations || newVariations.length === 0) {
      setHasVariations(false);
    }
  };

  const handleVariationChange = (index: number, field: keyof ProductVariation, value: string | number) => {
    if (!currentProduct.variations) return;
    const newVariations = [...currentProduct.variations];
    newVariations[index] = { ...newVariations[index], [field]: value };
    setCurrentProduct({ ...currentProduct, variations: newVariations });
  };

  const handleSave = async () => {
    try {
      // Convert back to full product format for saving
      const fullProduct: Product = {
        ...currentProduct,
        variations: currentProduct.variations,
        images: {
          front: '',
          pencil: '',
          back: '',
          front45: '',
          back45: ''
        },
        overviewText: '',
        keyFeatures: [],
        resources: {
          model3d: '',
          schematic: ''
        },
        driverCode: '',
        samples: {
          script: '',
          python: '',
          javascript: '',
          dotnet: '',
          micropython: '',
          arduino: ''
        }
      };

      if (editMode && currentProduct.id) {
        await updateProduct(currentProduct.id, fullProduct);
        setSnackbar({ 
          open: true, 
          message: 'Product updated successfully', 
          severity: 'success' 
        });
      } else {
        await addProduct(fullProduct);
        setSnackbar({ 
          open: true, 
          message: 'Product added successfully', 
          severity: 'success' 
        });
      }
      
      loadProducts();
      handleClose();
      
      if (autoSaveEnabled) {
        setTimeout(() => handleExport(), 500);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      setSnackbar({ 
        open: true, 
        message: 'Failed to save product', 
        severity: 'error' 
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setSnackbar({ 
          open: true, 
          message: 'Product deleted successfully', 
          severity: 'success' 
        });
        loadProducts();
        
        if (autoSaveEnabled) {
          setTimeout(() => handleExport(), 500);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        setSnackbar({ 
          open: true, 
          message: 'Failed to delete product', 
          severity: 'error' 
        });
      }
    }
  };

  const handleExport = useCallback(async () => {
    try {
      const jsonContent = await exportProductsToJSON();
      
      if (fileHandle) {
        const writable = await fileHandle.createWritable();
        await writable.write(JSON.stringify(jsonContent, null, 2));
        await writable.close();
        console.log('Auto-saved to file');
      } else {
        const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'duelink-v3.json';
        a.click();
        URL.revokeObjectURL(url);
      }
      
      setSnackbar({ 
        open: true, 
        message: 'Products exported successfully', 
        severity: 'success' 
      });
    } catch (error) {
      console.error('Error exporting products:', error);
      setSnackbar({ 
        open: true, 
        message: 'Failed to export products', 
        severity: 'error' 
      });
    }
  }, [fileHandle]);

  const columns: GridColDef[] = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 200
    },
    { 
      field: 'partNumber', 
      headerName: 'Part Number', 
      width: 150
    },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" />
      )
    },
    { 
      field: 'variations',
      headerName: 'Variations',
      width: 120,
      renderCell: (params) => {
        const variations = params.value as ProductVariation[] | undefined;
        if (!variations || variations.length === 0) {
          return <Typography variant="body2" color="text.secondary">-</Typography>;
        }
        return <Chip label={`${variations.length} variants`} size="small" color="primary" />;
      }
    },
    { 
      field: 'price', 
      headerName: 'Price', 
      width: 100,
      valueFormatter: (value: number) => `$${value?.toFixed(2) || '0.00'}`
    },
    { 
      field: 'description', 
      headerName: 'Description', 
      flex: 1,
      minWidth: 250
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="duplicate"
          icon={<CopyIcon />}
          label="Duplicate"
          onClick={() => handleDuplicate(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.row.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            label="Category"
          >
            <MenuItem value="">All</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
        >
          Add Product
        </Button>
      </Box>

      <DataGrid
        rows={filteredProducts}
        columns={columns}
        loading={loading}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 25, page: 0 },
          },
        }}
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        sx={{ height: 600 }}
      />

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Product Name"
              value={currentProduct.name}
              onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
              fullWidth
              required
            />
            
            <TextField
              label="Part Number"
              value={currentProduct.partNumber}
              onChange={(e) => setCurrentProduct({ ...currentProduct, partNumber: e.target.value })}
              fullWidth
              required
              helperText="Format: GDL-XXXX-X (will be used for resource paths)"
            />
            
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={currentProduct.category}
                onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                label="Category"
              >
                <MenuItem value="Microcomputer">Microcomputer</MenuItem>
                <MenuItem value="Special">Special</MenuItem>
                <MenuItem value="Display">Display</MenuItem>
                <MenuItem value="Actuator">Actuator</MenuItem>
                <MenuItem value="Communication">Communication</MenuItem>
                <MenuItem value="HMI">HMI</MenuItem>
                <MenuItem value="Storage">Storage</MenuItem>
                <MenuItem value="Wireless">Wireless</MenuItem>
                <MenuItem value="Sensor">Sensor</MenuItem>
                <MenuItem value="LED">LED</MenuItem>
                <MenuItem value="Sound">Sound</MenuItem>
                <MenuItem value="Vision">Vision</MenuItem>
                <MenuItem value="Adapter">Adapter</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Price"
              type="number"
              value={currentProduct.price}
              onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
              fullWidth
              required
              InputProps={{
                startAdornment: '$',
              }}
              inputProps={{
                step: 0.01,
                min: 0
              }}
            />
            
            <Box sx={{ mt: 2, mb: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={hasVariations}
                    onChange={(e) => handleVariationToggle(e.target.checked)}
                  />
                }
                label="Product has variations"
              />
            </Box>

            {hasVariations && (
              <Box sx={{ mt: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2">Variations</Typography>
                  <Button
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={handleAddVariation}
                  >
                    Add Variation
                  </Button>
                </Box>
                <TableContainer component={Paper} variant="outlined">
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Part Code</TableCell>
                        <TableCell>Price Diff</TableCell>
                        <TableCell>Full Part Number</TableCell>
                        <TableCell width={50}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentProduct.variations?.map((variation, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              size="small"
                              value={variation.name}
                              onChange={(e) => handleVariationChange(index, 'name', e.target.value)}
                              placeholder="e.g., Red"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              value={variation.partCode}
                              onChange={(e) => handleVariationChange(index, 'partCode', e.target.value)}
                              placeholder="e.g., R"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              size="small"
                              type="number"
                              value={variation.price}
                              onChange={(e) => handleVariationChange(index, 'price', parseFloat(e.target.value) || 0)}
                              InputProps={{
                                startAdornment: '$',
                              }}
                              inputProps={{
                                step: 0.01
                              }}
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                              {currentProduct.partNumber}{variation.partCode ? `:${variation.partCode}` : ''}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleRemoveVariation(index)}
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Description (Markdown supported)
              </Typography>
              <MDEditor
                value={currentProduct.description}
                onChange={(value) => setCurrentProduct({ ...currentProduct, description: value || '' })}
                preview="live"
                height={200}
                data-color-mode="light"
              />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                You can use markdown to add images: ![alt text](/img/filename.webp)
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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