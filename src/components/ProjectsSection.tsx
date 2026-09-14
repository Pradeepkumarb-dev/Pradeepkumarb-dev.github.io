import React from 'react';
import { Github, ExternalLink, ShieldAlert } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
            <span>Section 4.0</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
            <span>Firmware &amp; Repositories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
            Projects
          </h2>
          <p className="text-sm text-[#8B99A3] mt-1 font-mono">
            All my non-proprietary projects, drivers, and firmware modules are consolidated in the <span className="text-[#E8A33D]">code-vault</span> repository below.
          </p>
        </div>

        {/* IP & Confidentiality Notice Banner */}
        <div className="mb-8 p-4 rounded-lg bg-[#10171E] border border-[#233039] flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#E8A33D] shrink-0 mt-0.5" />
          <div className="text-xs text-[#B4C2CC] leading-relaxed">
            <span className="font-mono font-semibold text-white">Confidentiality &amp; IP Notice:</span>{' '}
            Workplace firmware engineered at <span className="text-[#E8A33D]">Intangles Lab</span> and <span className="text-[#E8A33D]">Nanotronics</span> is proprietary company intellectual property and protected under NDA. All of my personal and non-proprietary projects, peripheral drivers, and code are maintained in the <strong className="text-white font-mono">code-vault</strong> repository below.
          </div>
        </div>

        {/* Master Showcase: code-vault */}
        <div className="rounded-xl bg-[#10171E] border-2 border-[#E8A33D]/70 overflow-hidden shadow-2xl relative">
          
          {/* Header Bar with direct GitHub action */}
          <div className="p-6 bg-[#0B1015]/80 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D]">
                <span className="px-2 py-0.5 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/30 font-semibold">
                  MASTER REPOSITORY
                </span>
                <span>github.com/Pradeepkumarb-dev/code-vault</span>
              </div>
              <h3 className="text-3xl font-bold font-mono text-white flex items-center gap-2.5">
                <Github className="w-8 h-8 text-[#E8A33D]" />
                code-vault
              </h3>
              <p className="text-sm text-[#C2D1DC] leading-relaxed pt-1">
                Central open-source repository containing my non-proprietary embedded C/C++ firmware projects, microcontroller HAL drivers, FreeRTOS implementations, and automotive protocol tools.
              </p>
            </div>

            {/* Direct Access Action Button */}
            <div className="shrink-0">
              <a
                href={PERSONAL_INFO.codeVault}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-access-code-vault"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-mono text-sm font-bold shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Access code-vault on GitHub</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
