import { useState, useCallback } from 'react';
import { productAPI } from '../api-routes/api';

export function useProductController() {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const prods = await productAPI.getAll();
      setProducts(prods || []);
    } catch {}
  }, []);

  async function createProduct(data) {
    const result = await productAPI.create(data);
    await fetchProducts();
    return result;
  }

  async function updateProduct(id, data) {
    const result = await productAPI.update(id, data);
    await fetchProducts();
    return result;
  }

  async function deleteProduct(id) {
    await productAPI.delete(id);
    await fetchProducts();
  }

  return { products, fetchProducts, createProduct, updateProduct, deleteProduct };
}