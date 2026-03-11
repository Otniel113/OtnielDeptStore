import { useState, useCallback } from 'react';
import { categoryAPI } from '../api-routes/api';

export function useCategoryController() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await categoryAPI.getAll();
      setCategories(cats || []);
    } catch {}
  }, []);

  async function createCategory(data) {
    const result = await categoryAPI.create(data);
    await fetchCategories();
    return result;
  }

  async function updateCategory(id, data) {
    const result = await categoryAPI.update(id, data);
    await fetchCategories();
    return result;
  }

  async function deleteCategory(id) {
    await categoryAPI.delete(id);
    await fetchCategories();
  }

  return { categories, fetchCategories, createCategory, updateCategory, deleteCategory };
}