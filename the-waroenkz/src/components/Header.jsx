import { Link } from 'react-router-dom';

export default function Header({ rightContent, middleContent, subtitle }) {
  return (
    <header className="h-16 border-b-2 border-border bg-sidebar flex items-center justify-between px-6 shrink-0 z-20">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-serif text-xl md:text-2xl font-bold tracking-tight text-foreground whitespace-nowrap" aria-label="The Waroenkz">
          The Waroenkz
        </Link>
        {subtitle && (
          <>
            <span className="h-6 w-0.5 bg-muted hidden md:block" aria-hidden="true"></span>
            <span className="font-mono text-sm font-semibold uppercase tracking-caps text-muted hidden md:block whitespace-nowrap">{subtitle}</span>
          </>
        )}
      </div>
      {middleContent && <div className="flex-1 max-w-lg mx-auto px-4">{middleContent}</div>}
      {rightContent && <div className="flex items-center gap-4">{rightContent}</div>}
    </header>
  );
}
