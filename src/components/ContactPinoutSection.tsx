import React, { useState } from 'react';
import { Mail, Phone, Linkedin, Github, MapPin, Copy, Check, ExternalLink, Cpu, Download, Globe } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactPinoutProps {
  onOpenResumeModal: () => void;
}

export const ContactPinoutSection: React.FC<ContactPinoutProps> = ({ onOpenResumeModal }) => {
  const { personalInfo, resumeFileName, resumeDownloadUrl, downloadResumePdf } = usePortfolio();
  const [copiedPin, setCopiedPin] = useState<string | null>(null);

  const copyToClipboard = (text: string, pinLabel: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPin(pinLabel);
    setTimeout(() => setCopiedPin(null), 2200);
  };

  const pins = [
    {
      num: 'PIN 1',
      label: 'EMAIL_PRIMARY',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      copyable: true,
      description: 'Official recruiter & business communications'
    },
    {
      num: 'PIN 2',
      label: 'PHONE_VOICE',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\s+/g, '')}`,
      copyable: true,
      description: 'Direct mobile line (IST / UTC+5:30)'
    },
    {
      num: 'PIN 3',
      label: 'PORTFOLIO_WEB',
      value: personalInfo.website,
      href: personalInfo.website,
      external: true,
      copyable: true,
      highlight: true,
      description: 'Live production portfolio & interactive terminals'
    },
    {
      num: 'PIN 4',
      label: 'LINKEDIN_BUS',
      value: 'linkedin.com/in/pradeepkumarbofficial',
      href: personalInfo.linkedin,
      external: true,
      description: 'Professional networking & endorsements'
    },
    {
      num: 'PIN 5',
      label: 'GITHUB_VCS',
      value: 'github.com/Pradeepkumarb-dev',
      href: personalInfo.github,
      external: true,
      description: 'Public repositories, drivers & code-vault'
    },
    {
      num: 'PIN 6',
      label: 'GEO_LOCATION',
      value: `${personalInfo.location} (${personalInfo.relocation})`,
      description: 'Current base & mobility readiness'
    },
    {
      num: 'PIN 7',
      label: 'SYS_STATUS',
      value: 'AVAILABLE / INTERVIEW READY',
      highlight: true,
      description: 'Notice period: Standard / Flexible'
    }
  ];

  return (
    <section id="contact" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
              <span>Section 7.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
              <span>I/O Interface &amp; Direct Connection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
              Contact Pinout — DIP Package
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8B99A3]">
            Hardware package pin assignment for immediate communication.
          </p>
        </div>

        {/* Pinout IC Package Representation */}
        <div className="bg-[#10171E] border-2 border-[#233039] rounded-lg overflow-hidden shadow-2xl relative">
          
          {/* IC Top Notch */}
          <div className="bg-[#0B1015] border-b border-[#233039] py-3 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-4 h-2 rounded-b-full bg-[#E8A33D]/60 border border-[#E8A33D]"></div>
              <span className="font-mono text-xs font-bold text-white tracking-widest">
                IC_PKB_EMBEDDED_2026
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#8B99A3]">
              PACKAGE: QFP-6PIN • PITCH: 2.54mm
            </div>
          </div>

          {/* Pin List Rows */}
          <div className="divide-y divide-[#1C2731]">
            {pins.map((pin) => (
              <div
                key={pin.num}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#0D1319] transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Pin identifier badge */}
                  <span className="font-mono text-xs font-bold text-[#E8A33D] px-2.5 py-1 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/20 shrink-0">
                    {pin.num}
                  </span>

                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-[#566470]">
                      <span>{pin.label}</span>
                      <span>—</span>
                      <span className="text-[11px] text-[#8B99A3] hidden md:inline">{pin.description}</span>
                    </div>

                    <div className="mt-0.5 font-mono text-sm sm:text-base font-semibold text-white">
                      {pin.href ? (
                        <a
                          href={pin.href}
                          target={pin.external ? '_blank' : undefined}
                          rel={pin.external ? 'noopener noreferrer' : undefined}
                          className="hover:text-[#E8A33D] hover:underline transition-colors flex items-center gap-1.5"
                        >
                          <span>{pin.value}</span>
                          {pin.external && <ExternalLink className="w-3.5 h-3.5 text-[#566470]" />}
                        </a>
                      ) : (
                        <span className={pin.highlight ? 'text-emerald-400 font-bold' : ''}>
                          {pin.value}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
                  {pin.copyable && (
                    <button
                      onClick={() => copyToClipboard(pin.value, pin.label)}
                      className="px-3 py-1.5 rounded bg-[#16202A] hover:bg-[#233039] text-[#8B99A3] hover:text-white border border-[#233039] flex items-center gap-1.5 transition-colors"
                    >
                      {copiedPin === pin.label ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}

                  {pin.href && !pin.external && (
                    <a
                      href={pin.href}
                      className="px-3 py-1.5 rounded bg-[#E8A33D]/10 hover:bg-[#E8A33D] text-[#E8A33D] hover:text-[#0B1015] border border-[#E8A33D]/30 font-semibold transition-all"
                    >
                      Connect
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout banner */}
          <div className="p-4 bg-[#0B1015] border-t border-[#233039] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-[#8B99A3]">
              Need a copy of Pradeep's full Curriculum Vitae?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenResumeModal}
                className="px-3 py-1.5 rounded bg-[#16202A] text-[#E4EAEE] hover:text-white border border-[#233039] hover:border-[#E8A33D] text-xs font-mono transition-colors"
              >
                Preview Resume
              </button>
              <button
                onClick={downloadResumePdf}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#E8A33D] text-[#0B1015] font-semibold hover:bg-[#F59E0B] transition-colors"
                title={`Download LaTeX PDF ${resumeFileName}`}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
