import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../Controller/StoreContext';
import Header from '../components/Header';
import CategoryFilters from '../components/CategoryFilters';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import HistoryModal from '../components/HistoryModal';

export default function MemberHomePage() {
  const {
    categories,
    products,
    cart,
    cartTotal,
    transactionHistory,
    user,
    loading,
    getAvailableStock,
    addToCart,
    updateQty,
    checkout,
    logout,
  } = useStore();

  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [paymentState, setPaymentState] = useState('idle'); // idle | processing | approved

  const allCategories = [{ id: 'all', name: 'All Items', description: 'All of our items across all of the categories' }, ...categories];
  const activeInfo = allCategories.find(c => c.id === activeCategory);

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category_id === activeCategory);

  const toggleCart = useCallback(() => setIsCartOpen(prev => !prev), []);

  function handleProcessPayment() {
    if (cart.length === 0 || paymentState !== 'idle') return;

    setPaymentState('processing');

    checkout()
      .then(() => {
        setPaymentState('approved');
        setTimeout(() => {
          setPaymentState('idle');
          if (window.innerWidth < 768 && isCartOpen) {
            setIsCartOpen(false);
          }
        }, 1000);
      })
      .catch(() => {
        setPaymentState('idle');
      });
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  const displayName = user?.username || 'John Doe';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="antialiased font-sans text-foreground h-screen flex flex-col overflow-hidden selection:bg-gold-start/30 selection:text-black">
      <Header
        subtitle="Member Home"
        rightContent={
          <>
            <button onClick={() => setIsHistoryOpen(true)} className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-caps text-muted hover:text-foreground transition-colors mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden md:inline">History</span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l-2 border-border/50">
              <div className="text-right hidden sm:block leading-tight">
                <span className="block font-serif font-bold text-sm text-foreground">{displayName}</span>
                <span className="block font-mono text-[10px] text-muted uppercase tracking-wider">Member</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-serif font-bold text-lg border-2 border-border shadow-sm">{initial}</div>

              <button onClick={handleLogout} className="ml-2 p-2 text-muted hover:text-danger transition-colors" title="Logout">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </>
        }
      />

      <main className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0 bg-background pb-20 md:pb-0">
          <CategoryFilters categories={categories} activeCategory={activeCategory} onSetCategory={setActiveCategory} />

          <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-background">
            <div className="mb-6">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">{activeInfo?.name}</h2>
              <p className="font-sans text-lg text-muted max-w-2xl">{activeInfo?.description}</p>
            </div>

            {loading ? (
              <div className="text-center py-12 text-muted font-mono">Loading...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filtered.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    available={getAvailableStock(p.id)}
                    onClick={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <CartSidebar
          cart={cart}
          cartTotal={cartTotal}
          isCartOpen={isCartOpen}
          onToggleCart={toggleCart}
          onUpdateQty={updateQty}
          onProcessPayment={handleProcessPayment}
          paymentState={paymentState}
        />
      </main>

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={transactionHistory}
      />
    </div>
  );
}
