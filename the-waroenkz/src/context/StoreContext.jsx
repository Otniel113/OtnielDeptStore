import { createContext, useContext, useState } from 'react';
import { initialCategories, initialProducts, initialTransactionHistory } from '../data';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState(initialTransactionHistory);
  const [user, setUser] = useState(null); // null = guest, {username, role} = logged in

  // Cart helpers
  function getAvailableStock(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    const cartItem = cart.find(i => i.id === productId);
    const inCart = cartItem ? cartItem.qty : 0;
    return product.stock - inCart;
  }

  function addToCart(id) {
    if (getAvailableStock(id) <= 0) return;
    const product = products.find(p => p.id === id);
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function updateQty(id, change) {
    if (change > 0 && getAvailableStock(id) <= 0) return;
    setCart(prev => {
      const updated = prev.map(i => {
        if (i.id === id) return { ...i, qty: i.qty + change };
        return i;
      }).filter(i => i.qty > 0);
      return updated;
    });
  }

  function clearCart() {
    setCart([]);
  }

  function processPayment(orderId) {
    if (cart.length === 0) return false;

    // Decrease stock
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(i => i.id === p.id);
      if (cartItem) return { ...p, stock: p.stock - cartItem.qty };
      return p;
    }));

    // Add to history
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const newTransaction = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: cart.map(i => ({ name: i.name, qty: i.qty })),
      total,
    };
    setTransactionHistory(prev => [newTransaction, ...prev]);

    clearCart();
    return true;
  }

  // Admin CRUD for products
  function addProduct(data) {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts(prev => [...prev, { id: newId, ...data }]);
  }

  function updateProduct(id, data) {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
  }

  function deleteProduct(id) {
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  // Admin CRUD for categories
  function addCategory(data) {
    if (categories.some(c => c.id === data.id)) return false;
    setCategories(prev => [...prev, data]);
    return true;
  }

  function updateCategory(id, data) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id));
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const value = {
    categories,
    products,
    cart,
    cartTotal,
    transactionHistory,
    user,
    setUser,
    getAvailableStock,
    addToCart,
    updateQty,
    clearCart,
    processPayment,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
