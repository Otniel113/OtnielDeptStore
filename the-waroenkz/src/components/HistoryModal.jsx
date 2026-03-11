import { formatIDR } from '../data';

export default function HistoryModal({ isOpen, onClose, history }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className="bg-card w-full max-w-2xl max-h-[80vh] flex flex-col rounded-xl border-2 border-border shadow-elevated transform transition-all scale-100">
        <div className="p-6 border-b-2 border-border flex justify-between items-center bg-sidebar rounded-t-xl shrink-0">
          <h3 className="font-serif text-2xl font-bold">Transaction History</h3>
          <button onClick={onClose} className="px-2 text-muted hover:text-foreground transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 bg-background space-y-4">
          {history.map((t, idx) => (
            <div key={idx} className="border-2 border-border rounded-lg p-4 bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2 border-b border-dashed border-border pb-2">
                <div>
                  <span className="font-mono font-bold text-lg text-foreground">{t.id}</span>
                  <span className="block text-xs font-mono text-muted uppercase tracking-wide">{t.date}</span>
                </div>
                <span className="font-serif font-bold text-xl text-foreground">{formatIDR(t.total)}</span>
              </div>
              <ul className="space-y-1">
                {t.items.map((i, j) => (
                  <li key={j} className="flex justify-between text-sm font-sans font-semibold text-muted">
                    <span>{i.qty}x {i.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
