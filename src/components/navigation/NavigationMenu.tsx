interface NavigationMenuProps {
  sections: Array<{
    id: string;
    label: string;
    number: string;
  }>;
  activeSection: string;
  scrollProgress: { [key: string]: number };
  onSectionClick: (sectionId: string) => void;
}

const NavigationMenu = ({ 
  sections, 
  activeSection, 
  scrollProgress, 
  onSectionClick 
}: NavigationMenuProps) => {
  return (
    <nav className="space-y-8 flex-1 flex flex-col justify-center">
      {sections.map((section) => (
        <div key={section.id} className="group cursor-pointer" onClick={() => onSectionClick(section.id)}>
          <button
            className={`text-left transition-all duration-300 w-full ${
              activeSection === section.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
            }`}
          >
            <div className="text-2xl font-normal lowercase tracking-normal mb-2">
              {section.label.toLowerCase()}
            </div>
            <div className="relative w-full">
              <div className="h-1 w-full rounded-full bg-[var(--border-color)]" />
              <div
                className="absolute top-0 left-0 h-1 rounded-full transition-all duration-300 bg-[var(--text-primary)]"
                style={{ width: `${scrollProgress[section.id] || 0}%` }}
              />
            </div>
          </button>
        </div>
      ))}
    </nav>
  );
};

export default NavigationMenu;