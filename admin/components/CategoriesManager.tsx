'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Paper,
  Typography,
  Alert,
  Chip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { getProducts } from '@/lib/productService';

interface Category {
  name: string;
  productCount?: number;
}

// In-memory storage for categories
let categoriesData: string[] = [
  'Microcomputer', 'Display', 'Actuator', 'Communication',
  'HMI', 'Storage', 'Wireless', 'Sensor', 'LED', 'Sound',
  'Vision', 'Adapter', 'Special', 'Accessories'
];

const CategoriesManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      // Get product counts
      const products = await getProducts();
      const categoryData: Category[] = categoriesData.map(name => ({
        name,
        productCount: products.filter(p => p.category === name).length
      }));

      setCategories(categoryData);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const saveCategoriesToStorage = async (categoryList: string[]) => {
    // Save to in-memory storage
    categoriesData = [...categoryList];
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      setError('Category already exists');
      return;
    }

    try {
      const updatedCategories = [...categories, { name: newCategory.trim(), productCount: 0 }];
      const categoryNames = updatedCategories.map(c => c.name);
      await saveCategoriesToStorage(categoryNames);
      setCategories(updatedCategories);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleEditCategory = (index: number) => {
    setEditingIndex(index);
    setEditValue(categories[index].name);
  };

  const handleSaveEdit = async () => {
    if (editingIndex === null || !editValue.trim()) return;

    if (categories.some((cat, idx) => 
      idx !== editingIndex && cat.name.toLowerCase() === editValue.toLowerCase()
    )) {
      setError('Category already exists');
      return;
    }

    try {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = { 
        ...updatedCategories[editingIndex], 
        name: editValue.trim() 
      };
      const categoryNames = updatedCategories.map(c => c.name);
      await saveCategoriesToStorage(categoryNames);
      setCategories(updatedCategories);
      setEditingIndex(null);
      setEditValue('');
    } catch (err) {
      setError('Failed to update category');
    }
  };

  const handleDeleteCategory = async (index: number) => {
    const category = categories[index];
    
    if (category.productCount && category.productCount > 0) {
      setError(`Cannot delete category "${category.name}" - it has ${category.productCount} products`);
      return;
    }

    if (window.confirm(`Are you sure you want to delete category "${category.name}"?`)) {
      try {
        const updatedCategories = categories.filter((_, i) => i !== index);
        const categoryNames = updatedCategories.map(c => c.name);
        await saveCategoriesToStorage(categoryNames);
        setCategories(updatedCategories);
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditValue('');
  };

  if (loading) {
    return <Typography>Loading categories...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Category Management
      </Typography>
      
      {error && (
        <Alert severity="error" onClose={() => setError('')} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            label="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCategory}
            disabled={!newCategory.trim()}
          >
            Add Category
          </Button>
        </Box>
      </Paper>

      <Paper>
        <List>
          {categories.map((category, index) => (
            <ListItem key={index} divider>
              {editingIndex === index ? (
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                  <TextField
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    autoFocus
                  />
                  <IconButton onClick={handleSaveEdit} color="primary">
                    <SaveIcon />
                  </IconButton>
                  <IconButton onClick={handleCancelEdit}>
                    <CancelIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <ListItemText 
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography>{category.name}</Typography>
                        {category.productCount ? (
                          <Chip 
                            label={`${category.productCount} products`} 
                            size="small" 
                            variant="outlined"
                          />
                        ) : null}
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleEditCategory(index)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      onClick={() => handleDeleteCategory(index)}
                      disabled={(category.productCount || 0) > 0}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>

      <Alert severity="info" sx={{ mt: 2 }}>
        Categories with products cannot be deleted. Remove or reassign products first.
      </Alert>
    </Box>
  );
};

export default CategoriesManager;