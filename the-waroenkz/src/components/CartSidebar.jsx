import { formatIDR } from '../data';

export default function CartSidebar({ cart, cartTotal, orderId, isCartOpen, onToggleCart, onUpdateQty, onProcessPayment, paymentState }) {
  return (
    <>
      {/* Cart Sidebar */}
      <aside
        id="cart-sidebar"
        className={`fixed inset-0 z-50 bg-paper md:relative md:w-96 md:border-l-2 md:border-border flex flex-col shrink-0 shadow-elevated transform ${
          isCartOpen ? 'translate-y-0' : 'translate-y-full'
        } md:translate-y-0 md:inset-auto`}
        aria-labelledby="cart-heading"
      >
        {/* Mobile Header */}
        <div className="md:hidden p-4 bg-paper border-b-2 border-border flex items-center justify-between">
          <h2 id="mobile-cart-heading" className="font-serif text-xl font-bold">Current Order</h2>
          <button onClick={onToggleCart} className="p-3 text-foreground hover:bg-sidebar rounded-md focus:ring-4 focus:ring-black outline-none" aria-label="Close Cart">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex p-6 border-b-2 border-dashed border-border justify-between items-baseline bg-paper">
          <h2 id="cart-heading" className="font-serif text-2xl font-bold">Current Order</h2>
          <span className="font-mono text-sm font-bold text-muted">{orderId}</span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-paper" role="list">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-muted opacity-80" role="alert">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <p className="font-serif font-bold text-xl">Order is Empty</p>
              <p className="text-sm font-semibold mt-2">Add items from the menu.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center justify-between group py-2 border-b border-dashed border-border last:border-0" role="listitem">
                <div className="flex-1 pr-4">
                  <h4 className="font-serif text-lg font-bold text-foreground">{item.name}</h4>
                  <p className="text-sm font-mono font-semibold text-muted">{formatIDR(item.price)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border-2 border-border rounded-lg overflow-hidden bg-background">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl text-foreground hover:bg-sidebar focus:bg-gold-start focus:outline-none" aria-label="Decrease quantity">-</button>
                    <span className="w-10 text-center font-mono text-base font-bold text-foreground bg-white" aria-label="Quantity">{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center font-bold text-xl text-foreground hover:bg-sidebar focus:bg-gold-start focus:outline-none" aria-label="Increase quantity">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Receipt Footer */}
        <div className="p-6 bg-sidebar border-t-2 border-border space-y-4 mt-auto">
          <div className="pt-2 flex justify-between items-baseline">
            <span className="font-serif text-xl font-bold">Total</span>
            <span className="font-serif text-2xl md:text-3xl font-bold text-foreground">{formatIDR(cartTotal)}</span>
          </div>
          <button
            onClick={onProcessPayment}
            className={`w-full h-14 rounded-lg shadow-card flex items-center justify-center gap-2 text-lg font-bold tracking-wide transition-transform active:scale-[0.98] ${
              paymentState === 'approved'
                ? 'bg-foreground text-background'
                : 'btn-gold'
            }`}
          >
            {paymentState === 'processing' ? (
              <span className="animate-pulse">PROCESSING...</span>
            ) : paymentState === 'approved' ? (
              'APPROVED'
            ) : (
              'Process Payment'
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-paper border-t-2 border-border p-4 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button onClick={onToggleCart} className="w-full h-14 btn-gold rounded-lg flex items-center justify-between px-6 font-bold shadow-card active:scale-[0.98]">
          <span className="font-serif">View Order</span>
          <span className="font-mono bg-white/40 px-3 py-1 rounded text-sm text-black border border-black/10">{formatIDR(cartTotal)}</span>
        </button>
      </div>
    </>
  );
}
