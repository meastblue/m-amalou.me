interface MobileNavigationProps {
  sections: Array<{
    id: string;
    label: string;
    number: string;
  }>;
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const MobileNavigation = ({ sections, activeSection, onSectionClick }: MobileNavigationProps) => {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4 border-t border-[var(--border-color)] backdrop-blur-lg bg-[var(--bg-primary)] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <nav className="flex justify-between items-center max-w-md mx-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className={`relative px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 min-w-0 flex-1 mx-1 ${
              activeSection === section.id
                ? 'transform scale-105 bg-[var(--color-accent)] text-white shadow-[0_4px_14px_0_rgba(0,121,255,0.25)]'
                : 'hover:scale-102 opacity-70 hover:opacity-90 text-[var(--text-secondary)]'
            }`}
          >
            <span className="relative z-10 truncate text-center lowercase">
              {section.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavigation;