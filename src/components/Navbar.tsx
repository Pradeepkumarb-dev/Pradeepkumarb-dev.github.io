import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeSection, setActiveSection] = useState('summary');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'canbus', label: 'CAN Analyzer' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Registers' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Pinout' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = navLinks.map(l => document.getElementById(l.id));
      const scrollPos = window.scrollY + 140;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${
      isScrolled 
        ? 'bg-[#0B1015]/95 backdrop-blur-md border-b border-[#233039] shadow-lg shadow-black/40' 
        : 'bg-[#0B1015]/85 backdrop-blur-sm border-b border-[#1E2933]'
    }`}>
      <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-center">
        {/* Clean Center Navigation Headings */}
        <nav className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto py-1 scrollbar-none w-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 text-xs font-mono rounded-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-[#E8A33D] bg-[#E8A33D]/10 font-bold shadow-sm shadow-[#E8A33D]/10 border border-[#E8A33D]/30'
                    : 'text-[#8B99A3] hover:text-[#E4EAEE] hover:bg-[#16202A] border border-transparent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
