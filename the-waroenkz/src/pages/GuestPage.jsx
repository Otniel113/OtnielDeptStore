import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../Controller/StoreContext';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import ProductCard from '../components/ProductCard';

export default function GuestPage() {
  const { categories, products, fetchProducts, loading } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchProducts(e.target.value);
  };

  const allCategories = [{ id: 'all', name: 'All Items', description: 'All of our items across all of the categories' }, ...categories];
  const activeInfo = allCategories.find(c => c.id === activeCategory);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category_id === activeCategory);

  return (
    <div className="antialiased font-sans text-foreground h-screen flex flex-col overflow-hidden selection:bg-gold-start/30 selection:text-black">
      <Header
        subtitle="Guest View"
        rightContent={
          <>
            <Link to="/login" className="font-mono text-sm font-bold uppercase tracking-caps text-foreground hover:text-gold-dark transition-colors">Login</Link>
            <Link to="/register" className="px-4 py-2 btn-gold rounded-md font-mono text-sm font-bold uppercase tracking-caps shadow-sm">Register</Link>
          </>
        }
      />

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 bg-background pb-0">
          <CategoryFilters categories={categories} activeCategory={activeCategory} onSetCategory={setActiveCategory} />

          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
            <div className="mb-6 relative max-w-lg">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-background border-2 border-border rounded-full py-2.5 px-4 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-3 h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="mb-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{activeInfo?.name}</h2>
              <p className="font-sans text-lg text-muted max-w-2xl">{activeInfo?.description}</p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted font-mono">Loading...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} available={p.stock} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
