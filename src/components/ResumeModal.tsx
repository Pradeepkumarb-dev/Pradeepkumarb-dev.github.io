import React, { useState } from 'react';
import { Download, Printer, X, FileText, Check, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCES, REGISTER_MAP, EDUCATION, PUBLICATION, RESUME_FILENAME, RESUME_DOWNLOAD_URL } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyFileName = () => {
    navigator.clipboard.writeText(RESUME_FILENAME);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#10171E] border border-[#233039] shadow-2xl rounded-lg my-auto overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#0B1015] border-b border-[#233039]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#E8A33D]/10 text-[#E8A33D]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#E4EAEE] flex items-center gap-2">
                <span>{RESUME_FILENAME}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#8B99A3]">
                Embedded Software Engineer • 4+ Years Experience
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Download Button */}
            <a
              id="modal-download-resume-btn"
              href={RESUME_DOWNLOAD_URL}
              download={RESUME_FILENAME}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-mono font-semibold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-colors shadow-sm"
              title={`Download ${RESUME_FILENAME}`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-[#E4EAEE] bg-[#16202A] hover:bg-[#1E2C38] border border-[#233039] rounded transition-colors"
              title="Print or Save as PDF using browser dialog"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            {/* Help Toggle */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-1.5 text-[#8B99A3] hover:text-[#E8A33D] bg-[#16202A] border border-[#233039] rounded transition-colors"
              title="How GitHub PDF download works"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-[#8B99A3] hover:text-white bg-[#16202A] hover:bg-red-500/20 hover:text-red-400 border border-[#233039] rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* GitHub / Repo Deployment Guide (Collapsible Banner) */}
        {showHelp && (
          <div className="bg-[#0D1319] border-b border-[#E8A33D]/30 px-5 py-3 text-xs text-[#8B99A3] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in slide-in-from-top-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Why your download wasn't working before & how it is resolved:</p>
                <p className="mt-0.5 text-[#A0B0BC]">
                  1. Your previous HTML had <code className="text-[#E8A33D] bg-[#10171E] px-1 py-0.5 rounded">href="resume.pdf"</code>, but the actual file is <code className="text-[#E8A33D] bg-[#10171E] px-1 py-0.5 rounded">{RESUME_FILENAME}</code>.<br />
                  2. We generated and placed <code className="text-[#E8A33D] bg-[#10171E] px-1 py-0.5 rounded">{RESUME_FILENAME}</code> in the <code className="text-white">public/</code> directory and repository root. In Vite and GitHub Pages, files in <code className="text-white">public/</code> or root are served directly at <code className="text-[#E8A33D] bg-[#10171E] px-1 py-0.5 rounded">/{RESUME_FILENAME}</code>.
                </p>
              </div>
            </div>
            <button 
              onClick={handleCopyFileName}
              className="px-2.5 py-1 text-[11px] font-mono text-[#E8A33D] border border-[#E8A33D]/40 rounded hover:bg-[#E8A33D]/10 shrink-0 flex items-center gap-1.5"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : null}
              {copiedLink ? 'Copied name' : 'Copy exact file name'}
            </button>
          </div>
        )}

        {/* Formatted CV Content (Clean, Printable & Responsive) */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0B1015] text-[#E4EAEE] font-sans selection:bg-[#E8A33D]/20">
          
          {/* Header */}
          <div className="border-b border-[#233039] pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                  {PERSONAL_INFO.fullName}
                </h1>
                <p className="text-base text-[#E8A33D] font-mono mt-1 font-medium">
                  {PERSONAL_INFO.title} — {PERSONAL_INFO.specialization}
                </p>
              </div>
              <div className="text-xs font-mono text-[#8B99A3] space-y-1 sm:text-right">
                <div>{PERSONAL_INFO.location} ({PERSONAL_INFO.relocation})</div>
                <div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[#E8A33D] hover:underline">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
                <div>{PERSONAL_INFO.phone}</div>
                <div>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-[#8B99A3] hover:text-[#E8A33D] underline">
                    linkedin.com/in/pradeepkumarbofficial
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
              <span>01.</span> Professional Summary
              <span className="h-px bg-[#233039] flex-1"></span>
            </h2>
            <p className="text-sm leading-relaxed text-[#B4C2CC]">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Technical Skills Register */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
              <span>02.</span> Technical Skills & Hardware Register Map
              <span className="h-px bg-[#233039] flex-1"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {REGISTER_MAP.slice(0, 6).map((reg) => (
                <div key={reg.address} className="p-2.5 rounded bg-[#10171E] border border-[#233039]">
                  <div className="flex items-center gap-2 font-mono text-[#E8A33D] mb-1 font-medium">
                    <span className="text-[10px] opacity-70">[{reg.address}]</span>
                    <span>{reg.name}</span>
                  </div>
                  <div className="text-[#8B99A3] leading-normal">
                    {reg.bits.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
              <span>03.</span> Work Experience
              <span className="h-px bg-[#233039] flex-1"></span>
            </h2>
            <div className="space-y-5">
              {WORK_EXPERIENCES.map((job) => (
                <div key={job.id} className="border-l-2 border-[#233039] hover:border-[#E8A33D] pl-4 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-sm font-semibold text-white">
                      {job.role} <span className="text-[#E8A33D]">@ {job.company}</span>
                    </h3>
                    <span className="text-xs font-mono text-[#8B99A3]">
                      {job.period} • {job.location}
                    </span>
                  </div>
                  {job.mcu && (
                    <div className="text-xs font-mono text-[#E8A33D]/80 mb-2">
                      Target Silicon: {job.mcu}
                    </div>
                  )}
                  <ul className="space-y-1.5 text-xs text-[#B4C2CC] list-disc list-outside ml-3">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {job.techStack.map((tech) => (
                      <span key={tech} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#16202A] text-[#8B99A3] border border-[#233039]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Publications */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
              <span>04.</span> Education & Publications
              <span className="h-px bg-[#233039] flex-1"></span>
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="p-3 rounded bg-[#10171E] border border-[#233039]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs font-semibold text-white">{edu.degree}</span>
                    <span className="text-[11px] font-mono text-[#8B99A3]">{edu.period}</span>
                  </div>
                  <div className="text-xs text-[#E8A33D] font-mono">{edu.institution} — {edu.location}</div>
                  <p className="text-xs text-[#8B99A3] mt-1">{edu.details}</p>
                </div>
              ))}

              <div className="p-3 rounded bg-[#10171E] border border-[#233039]">
                <span className="text-[11px] font-mono text-[#E8A33D] uppercase tracking-wider block mb-1">
                  Peer-Reviewed Publication ({PUBLICATION.year})
                </span>
                <p className="text-xs font-semibold text-white italic">
                  "{PUBLICATION.title}"
                </p>
                <p className="text-xs text-[#8B99A3] mt-1">
                  {PUBLICATION.journal}, {PUBLICATION.conference}, {PUBLICATION.volume}.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Sticky Actions */}
        <div className="px-5 py-3 bg-[#0B1015] border-t border-[#233039] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="text-[#8B99A3] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Download link directly targets <code className="text-[#E8A33D]">/{RESUME_FILENAME}</code></span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-[#8B99A3] hover:text-white transition-colors"
            >
              Close
            </button>
            <a
              href={RESUME_DOWNLOAD_URL}
              download={RESUME_FILENAME}
              className="inline-flex items-center gap-2 px-4 py-1.5 font-semibold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-all shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download File ({RESUME_FILENAME})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
