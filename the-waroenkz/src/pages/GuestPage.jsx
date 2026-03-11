import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import ProductCard from '../components/ProductCard';

export default function GuestPage() {
  const { categories, products } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const allCategories = [{ id: 'all', label: 'All Items', description: 'All of our items across all of the categories' }, ...categories];
  const activeInfo = allCategories.find(c => c.id === activeCategory);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

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
            <div className="mb-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{activeInfo?.label}</h2>
              <p className="font-sans text-lg text-muted max-w-2xl">{activeInfo?.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filtered.map(p => (
                <ProductCard key={p.id} product={p} available={p.stock} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
