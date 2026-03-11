import { useState } from 'react';
import { checkoutAPI } from '../api-routes/api';

export function useCartController(products, fetchLatestData) {
  const [cart, setCart] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

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
    if (!product) return;
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
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: i.qty + change } : i).filter(i => i.qty > 0)
    );
  }

  function clearCart() { setCart([]); }

  async function checkout() {
    if (cart.length === 0) return null;
    const items = cart.map(i => ({ product_id: i.id, quantity: i.qty }));
    const result = await checkoutAPI.checkout(items);
    setTransactionHistory(prev => [result, ...prev]);
    setCart([]);
    if (fetchLatestData) {
      await fetchLatestData();
    }
    return result;
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return { cart, setCart, transactionHistory, getAvailableStock, addToCart, updateQty, clearCart, checkout, cartTotal };
}