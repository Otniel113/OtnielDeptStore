import { formatIDR } from '../data';

export default function ProductCard({ product, available, onClick, disabled }) {
  const isOutOfStock = available <= 0;

  const Tag = onClick ? 'button' : 'div';

  return (
    <Tag
      onClick={onClick && !isOutOfStock ? () => onClick(product.id) : undefined}
      disabled={disabled || isOutOfStock}
      aria-disabled={isOutOfStock || undefined}
      className={`group relative flex flex-col text-left h-full rounded-xl border-2 p-5 shadow-card transition-all duration-200 ${
        onClick ? 'focus:outline-none focus:ring-4 focus:ring-black' : ''
      } ${
        isOutOfStock
          ? 'border-border bg-gray-100 opacity-80 cursor-not-allowed sold-out-pattern'
          : onClick
            ? 'bg-card border-border hover:border-gold-dark hover:shadow-elevated active:scale-[0.98]'
            : 'bg-card border-border'
      }`}
    >
      <div className="flex justify-between w-full mb-3">
        <span className="font-mono text-xs font-bold text-muted uppercase tracking-caps bg-sidebar px-2 py-0.5 rounded">{product.category}</span>
        <span className={`font-mono text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded ${
          isOutOfStock ? 'bg-danger text-white' : 'bg-gold-start text-black'
        }`}>
          {isOutOfStock ? 'SOLD OUT' : `Left: ${available}`}
        </span>
      </div>
      <h3 className={`font-serif text-xl md:text-2xl font-bold text-foreground mb-3 leading-tight ${
        isOutOfStock ? 'line-through decoration-2 decoration-danger' : ''
      }`}>{product.name}</h3>
      <span className="font-sans font-bold text-lg text-foreground mt-auto">{formatIDR(product.price)}</span>
    </Tag>
  );
}
