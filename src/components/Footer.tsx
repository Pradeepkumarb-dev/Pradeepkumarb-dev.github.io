import React from 'react';
import { ChevronUp, Github, Linkedin, Mail, Download } from 'lucide-react';
import { PERSONAL_INFO, RESUME_FILENAME, RESUME_DOWNLOAD_URL } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#233039] bg-[#070B0E] py-12 text-xs font-mono text-[#8B99A3]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-1 text-center md:text-left">
          <div className="text-white font-semibold">
            {PERSONAL_INFO.fullName}
          </div>
          <div className="text-[#566470]">
            Embedded Software Engineer • Automotive Telematics &amp; RTOS Firmware
          </div>
          <div className="text-[11px] text-[#566470]">
            Firmware build checksum: <span className="text-[#E8A33D]">0xPKB_2026_CRC32_OK</span> • Production Build v1.0.1
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href={PERSONAL_INFO.codeVault}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors flex items-center gap-1 text-white font-semibold"
          >
            <Github className="w-3.5 h-3.5 text-[#E8A33D]" />
            <span>code-vault</span>
          </a>
          <span>•</span>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors flex items-center gap-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a>
          <span>•</span>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#E8A33D] transition-colors flex items-center gap-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <span>•</span>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-[#E8A33D] transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <span>•</span>
          <a
            href={RESUME_DOWNLOAD_URL}
            download={RESUME_FILENAME}
            className="hover:text-[#E8A33D] transition-colors flex items-center gap-1 text-[#E8A33D]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{RESUME_FILENAME}</span>
          </a>
        </div>

        <div>
          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-[#10171E] hover:bg-[#16202A] text-[#8B99A3] hover:text-[#E8A33D] border border-[#233039] flex items-center gap-1.5 transition-colors"
            title="Scroll to top"
          >
            <span>Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
