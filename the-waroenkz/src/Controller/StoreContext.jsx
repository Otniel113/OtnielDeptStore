import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuthController } from './AuthController';
import { useCategoryController } from './CategoryController';
import { useProductController } from './ProductController';
import { useCartController } from './CartController';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const authDesc = useAuthController();
  const categoryDesc = useCategoryController();
  const productDesc = useProductController();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        categoryDesc.fetchCategories(),
        productDesc.fetchProducts(),
      ]);
    } catch {
      // Ignore
    } finally {
      setLoading(false);
    }
  }, [categoryDesc.fetchCategories, productDesc.fetchProducts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cartDesc = useCartController(productDesc.products, fetchData);

  // Override logout to clear cart as well
  const logout = () => {
    authDesc.logout();
    cartDesc.clearCart();
  };

  const value = {
    loading,
    fetchData,
    ...authDesc,
    logout, // overriding logout
    ...categoryDesc,
    ...productDesc,
    ...cartDesc,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}