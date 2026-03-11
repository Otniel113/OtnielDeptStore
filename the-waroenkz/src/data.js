export const initialCategories = [
  { id: 'coffee', label: 'Coffee', description: "Our premium coffee selection" },
  { id: 'bakery', label: 'Bakery', description: "Freshly baked goods" },
  { id: 'tea', label: 'Tea', description: "A variety of teas" },
];

export const initialProducts = [
  { id: 1, name: "Espresso", category: "coffee", price: 25000, stock: 15 },
  { id: 2, name: "Cappuccino", category: "coffee", price: 35000, stock: 8 },
  { id: 3, name: "Pour Over", category: "coffee", price: 38000, stock: 5 },
  { id: 4, name: "Cold Brew", category: "coffee", price: 35000, stock: 12 },
  { id: 5, name: "Croissant", category: "bakery", price: 28000, stock: 0 },
  { id: 6, name: "Pain au Choc", category: "bakery", price: 32000, stock: 6 },
  { id: 7, name: "Almond Tart", category: "bakery", price: 40000, stock: 3 },
  { id: 8, name: "Earl Grey", category: "tea", price: 25000, stock: 20 },
  { id: 9, name: "Matcha Latte", category: "tea", price: 40000, stock: 4 },
  { id: 10, name: "Sourdough", category: "bakery", price: 45000, stock: 2 },
  { id: 11, name: "Cinnamon Roll", category: "bakery", price: 30000, stock: 8 },
  { id: 12, name: "Long Black", category: "coffee", price: 30000, stock: 15 },
];

export const initialTransactionHistory = [
  { id: '#005', date: '2023-10-25', items: [{ name: 'Espresso', qty: 2 }, { name: 'Croissant', qty: 1 }], total: 78000 },
  { id: '#004', date: '2023-10-24', items: [{ name: 'Cappuccino', qty: 1 }], total: 35000 },
  { id: '#003', date: '2023-10-24', items: [{ name: 'Earl Grey', qty: 1 }, { name: 'Almond Tart', qty: 2 }], total: 105000 },
];

export const formatIDR = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
