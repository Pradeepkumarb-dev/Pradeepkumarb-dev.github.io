import React, { useState, useEffect } from 'react';
import { Download, FileText, Menu, X, Cpu, Terminal, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, RESUME_FILENAME, RESUME_DOWNLOAD_URL } from '../data/portfolioData';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [activeSection, setActiveSection] = useState('summary');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      const scrollPos = window.scrollY + 120;

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
      isScrolled ? 'bg-[#0B1015]/95 backdrop-blur-md border-b border-[#233039] shadow-lg shadow-black/40' : 'bg-[#0B1015]/85 backdrop-blur-sm border-b border-[#1E2933]'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        
        {/* Left ID & Status */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-6 h-6 rounded bg-[#16202A] border border-[#233039] group-hover:border-[#E8A33D] flex items-center justify-center text-[#E8A33D] transition-colors">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold text-[#E4EAEE] group-hover:text-[#E8A33D] transition-colors leading-tight">
                P. Kumar B.
              </span>
              <span className="font-mono text-[10px] text-[#8B99A3] hidden sm:inline leading-tight">
                Embedded FW Engineer
              </span>
            </div>
          </a>

          {/* Microcontroller Heartbeat indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10171E] border border-[#233039] text-[10px] font-mono text-[#8B99A3]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYS: 80MHz • CAN 500k</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                activeSection === link.id
                  ? 'text-[#E8A33D] bg-[#E8A33D]/10 font-semibold'
                  : 'text-[#8B99A3] hover:text-[#E4EAEE] hover:bg-[#16202A]'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Download & Preview Résumé) */}
        <div className="flex items-center gap-2">
          {/* Quick Preview modal button */}
          <button
            id="nav-preview-resume-btn"
            onClick={onOpenResumeModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-[#8B99A3] hover:text-[#E4EAEE] bg-[#10171E] hover:bg-[#16202A] border border-[#233039] rounded transition-colors"
            title="Preview résumé on screen"
          >
            <FileText className="w-3.5 h-3.5 text-[#E8A33D]" />
            <span>Preview CV</span>
          </button>

          {/* Primary Direct Download link */}
          <a
            id="nav-download-resume-btn"
            href={RESUME_DOWNLOAD_URL}
            download={RESUME_FILENAME}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-semibold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-all shadow-sm amber-glow-sm"
            title={`Download ${RESUME_FILENAME}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Résumé</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#8B99A3] hover:text-white bg-[#10171E] border border-[#233039] rounded"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D1319] border-b border-[#233039] px-4 py-3 space-y-2 animate-in slide-in-from-top-2">
          <div className="grid grid-cols-2 gap-1.5 font-mono text-xs pb-2 border-b border-[#233039]">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded ${
                  activeSection === link.id
                    ? 'bg-[#E8A33D]/10 text-[#E8A33D] font-semibold'
                    : 'text-[#8B99A3] hover:text-white hover:bg-[#16202A]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono text-[#E4EAEE] bg-[#16202A] border border-[#233039] rounded"
            >
              <FileText className="w-3.5 h-3.5 text-[#E8A33D]" />
              <span>Preview Résumé (Screen View)</span>
            </button>
            <a
              href={RESUME_DOWNLOAD_URL}
              download={RESUME_FILENAME}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-mono font-semibold bg-[#E8A33D] text-[#0B1015] rounded shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({RESUME_FILENAME})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
