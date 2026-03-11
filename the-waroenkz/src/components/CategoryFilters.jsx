export default function CategoryFilters({ categories, activeCategory, onSetCategory }) {
  const allCategories = [{ id: 'all', name: 'All Items' }, ...categories];

  return (
    <div className="px-6 py-4 overflow-x-auto whitespace-nowrap border-b border-border bg-sidebar shrink-0 no-scrollbar" role="tablist" aria-label="Product Categories">
      <div className="flex gap-3">
        {allCategories.map(cat => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={activeCategory === cat.id}
            onClick={() => onSetCategory(cat.id)}
            className={`px-6 py-3 rounded-full text-sm font-bold font-mono uppercase tracking-caps transition-all border-2 focus:outline-none focus:ring-4 focus:ring-black ${
              activeCategory === cat.id
                ? 'bg-foreground text-background border-foreground shadow-md'
                : 'bg-transparent text-muted border-border hover:border-foreground hover:text-foreground'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
