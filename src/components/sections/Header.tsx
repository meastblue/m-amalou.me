import { usePortfolio } from '../../hooks/usePortfolio';
import ThemeToggle from '../ui/ThemeToggle';
import Container from '../ui/Container';

const Header = () => {
  const { personal } = usePortfolio();

  return (
    <header 
      className="sticky top-0 z-[var(--z-sticky)] border-b transition-all duration-[var(--duration-base)] backdrop-blur-md safe-top"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--border-color)'
      }}
    >
      <Container className="py-4 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-fluid-sm flex-1 min-w-0">
            <h1 
              className="text-fluid-3xl font-bold leading-tight truncate"
              style={{ color: 'var(--text-primary)' }}
            >
              {personal.name}
            </h1>
            <div className="space-y-1" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-fluid-sm font-medium line-clamp-1">{personal.title_one}</p>
              <p className="text-fluid-sm line-clamp-1">{personal.title_two}</p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header
