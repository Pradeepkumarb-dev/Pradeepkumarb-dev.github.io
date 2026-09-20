import React, { useState, useEffect } from 'react';
import { FileText, Lock, KeyRound } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenResumeModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const { setIsResumeModalOpen, setIsEditModalOpen, isOwner } = usePortfolio();
  const [activeSection, setActiveSection] = useState('summary');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'waveforms', label: 'Waveforms' },
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
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between gap-2">
        {/* Navigation Headings */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-2.5 py-1 text-xs font-mono rounded-md whitespace-nowrap transition-all ${
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

        {/* Right utility buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-bold transition-all shadow-sm"
            title="Preview Resume"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview Resume</span>
            <span className="sm:hidden">Resume</span>
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded border transition-colors ${
              isOwner 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-[#16202A] text-[#8B99A3] hover:text-[#E8A33D] border-[#233039]'
            }`}
            title="Owner Editor: Edit work experience, paste text to parse, or update website"
          >
            {isOwner ? <KeyRound className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3" />}
            <span className="hidden md:inline">{isOwner ? 'Owner Mode' : 'Edit'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
