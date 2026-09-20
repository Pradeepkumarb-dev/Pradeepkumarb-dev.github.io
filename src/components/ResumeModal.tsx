import React, { useState } from 'react';
import {
  X, Download, Printer, Copy, Check, FileText, Globe, Code2
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { generateLatexResume } from '../utils/latexGenerator';

interface ResumeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose
}) => {
  const {
    isResumeModalOpen,
    setIsResumeModalOpen,
    setIsEditModalOpen,
    personalInfo,
    workExperiences,
    registerMap,
    education,
    publication,
    resumeFileName,
    resumeDownloadUrl,
    downloadResumePdf
  } = usePortfolio();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isResumeModalOpen;
  const onClose = propOnClose || (() => setIsResumeModalOpen(false));

  const [copiedTex, setCopiedTex] = useState(false);
  const [viewMode, setViewMode] = useState<'paper' | 'dark'>('paper');
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const latexCode = generateLatexResume({
    ...personalInfo,
    workExperiences,
    registerMap,
    education,
    publication
  });

  const handleCopyLatex = async () => {
    try {
      await navigator.clipboard.writeText(latexCode);
      setCopiedTex(true);
      setTimeout(() => setCopiedTex(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      await downloadResumePdf();
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadTex = () => {
    const blob = new Blob([latexCode], { type: 'text/x-tex;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PradeepkumarB_Resume.tex`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#10171E] border border-[#233039] shadow-2xl rounded-xl overflow-hidden flex flex-col h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[#0B1015] border-b border-[#233039] gap-2 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#E8A33D]/10 text-[#E8A33D]">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#E4EAEE] flex items-center gap-2 font-mono">
                <span>Resume Preview</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#8B99A3]">
                Professional typography with live portfolio URL
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center rounded bg-[#16202A] p-0.5 border border-[#233039]">
              <button
                onClick={() => setViewMode('paper')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  viewMode === 'paper' ? 'bg-[#E8A33D] text-[#0B1015] font-bold' : 'text-[#8B99A3] hover:text-white'
                }`}
              >
                Paper Preview
              </button>
              <button
                onClick={() => setViewMode('dark')}
                className={`px-2.5 py-1 rounded text-[11px] transition-colors ${
                  viewMode === 'dark' ? 'bg-[#233039] text-white font-bold' : 'text-[#8B99A3] hover:text-white'
                }`}
              >
                Dark Terminal
              </button>
            </div>

            {/* Print / Save as PDF Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-semibold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            {/* Download .tex Source */}
            <button
              onClick={handleDownloadTex}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-[#E4EAEE] bg-[#16202A] hover:bg-[#1E2C38] border border-[#233039] rounded transition-colors"
              title="Download LaTeX .tex source"
            >
              <Code2 className="w-3.5 h-3.5 text-[#E8A33D]" />
              <span>.tex Source</span>
            </button>

            {/* Copy LaTeX code */}
            <button
              onClick={handleCopyLatex}
              className="p-1.5 text-[#8B99A3] hover:text-[#E8A33D] bg-[#16202A] border border-[#233039] rounded transition-colors"
              title="Copy LaTeX source code"
            >
              {copiedTex ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
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

        {/* Informative Sub-bar */}
        <div className="px-5 py-2 bg-[#0D1319] border-b border-[#1C2731] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#8B99A3] shrink-0">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Portfolio Included: <strong className="text-white">{personalInfo.website}</strong></span>
          </div>
          <button
            onClick={() => {
              onClose();
              setIsEditModalOpen(true);
            }}
            className="text-[#E8A33D] hover:underline flex items-center gap-1"
          >
            <span>Need to adjust experience or content? Open Editor</span>
            <span>&rsaquo;</span>
          </button>
        </div>

        {/* RENDERED RESUME CANVAS (Full page continuous background) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#182028] flex justify-center selection:bg-amber-500/20">
          
          <div 
            id="resume-document-sheet"
            className={`w-full max-w-[800px] h-fit min-h-full shadow-2xl transition-all ${
              viewMode === 'paper' 
                ? 'bg-white text-[#111827] p-8 sm:p-12 font-serif rounded-sm' 
                : 'bg-[#0B1015] text-[#E4EAEE] p-6 sm:p-9 font-mono rounded-lg border border-[#233039]'
            }`}
            style={{
              fontFamily: viewMode === 'paper' 
                ? '"EB Garamond", "Computer Modern", "CMU Serif", Georgia, serif' 
                : 'inherit'
            }}
          >
            
            {/* HEADER */}
            <div className="text-center pb-3 border-b border-gray-300">
              <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight uppercase ${
                viewMode === 'paper' ? 'text-black' : 'text-white'
              }`}>
                {personalInfo.fullName}
              </h1>

              <div className={`text-xs mt-1 space-x-1.5 ${
                viewMode === 'paper' ? 'text-[#374151]' : 'text-[#A4B3BF]'
              }`}>
                <span>{personalInfo.title}</span>
                <span>•</span>
                <span>{personalInfo.specialization}</span>
              </div>

              {/* Contact Row 1 (Clean text, no dollar signs) */}
              <div className={`text-[11.5px] mt-1.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 ${
                viewMode === 'paper' ? 'text-[#1F2937]' : 'text-[#8B99A3]'
              }`}>
                <span>{personalInfo.location}</span>
                <span className="opacity-40">•</span>
                <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">
                  {personalInfo.email}
                </a>
                <span className="opacity-40">•</span>
                <span>{personalInfo.phone}</span>
              </div>

              {/* Contact Row 2 (Portfolio Link + LinkedIn + GitHub) */}
              <div className={`text-[11.5px] mt-1 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 ${
                viewMode === 'paper' ? 'text-[#1F2937]' : 'text-[#8B99A3]'
              }`}>
                <a 
                  href={personalInfo.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-bold text-blue-800 hover:underline flex items-center gap-0.5"
                >
                  <span>Portfolio: {personalInfo.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                </a>
                <span className="opacity-40">•</span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  LinkedIn
                </a>
                <span className="opacity-40">•</span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                  GitHub
                </a>
              </div>
            </div>

            {/* SECTION 1: PROFESSIONAL SUMMARY */}
            <div className="mt-4">
              <div className="mb-2">
                <h2 className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${
                  viewMode === 'paper' ? 'text-black' : 'text-[#E8A33D]'
                }`}>
                  Professional Summary
                </h2>
                <div className={`h-[1.5px] w-full ${viewMode === 'paper' ? 'bg-[#1F2937]' : 'bg-[#233039]'}`} />
              </div>
              <p className={`text-[11.5px] leading-relaxed text-justify ${
                viewMode === 'paper' ? 'text-[#1F2937]' : 'text-[#B4C2CC]'
              }`}>
                {personalInfo.summary}
              </p>
            </div>

            {/* SECTION 2: TECHNICAL SKILLS */}
            <div className="mt-4">
              <div className="mb-2">
                <h2 className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${
                  viewMode === 'paper' ? 'text-black' : 'text-[#E8A33D]'
                }`}>
                  Technical Skills
                </h2>
                <div className={`h-[1.5px] w-full ${viewMode === 'paper' ? 'bg-[#1F2937]' : 'bg-[#233039]'}`} />
              </div>

              <div className="space-y-1 text-[11.5px] leading-tight">
                {registerMap.map((reg) => (
                  <div key={reg.address} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className={`font-bold shrink-0 min-w-[170px] ${
                      viewMode === 'paper' ? 'text-black' : 'text-[#E8A33D]'
                    }`}>
                      {reg.name.replace(/_REG$/, '').replace(/_/g, ' ')}:
                    </span>
                    <span className={viewMode === 'paper' ? 'text-[#374151]' : 'text-[#8B99A3]'}>
                      {reg.bits.join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: WORK EXPERIENCE */}
            <div className="mt-4">
              <div className="mb-2">
                <h2 className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${
                  viewMode === 'paper' ? 'text-black' : 'text-[#E8A33D]'
                }`}>
                  Work Experience
                </h2>
                <div className={`h-[1.5px] w-full ${viewMode === 'paper' ? 'bg-[#1F2937]' : 'bg-[#233039]'}`} />
              </div>

              <div className="space-y-3.5">
                {workExperiences.map((job) => (
                  <div key={job.id} className="text-[11.5px] break-inside-avoid">
                    {/* Role & Company Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <span className={`font-bold ${viewMode === 'paper' ? 'text-black' : 'text-white'}`}>
                          {job.role}
                        </span>
                        <span className={`italic ml-1 ${viewMode === 'paper' ? 'text-[#374151]' : 'text-[#E8A33D]'}`}>
                          -- {job.company}
                        </span>
                      </div>
                      <span className={`font-semibold shrink-0 ${viewMode === 'paper' ? 'text-black' : 'text-[#8B99A3]'}`}>
                        {job.period}
                      </span>
                    </div>

                    {/* Subline: Location & Target Hardware */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-[11px] text-[#4B5563] mb-1">
                      <span className="italic">{job.location}</span>
                      {job.mcu && (
                        <span className="italic">
                          Target Silicon: <strong className="font-semibold text-black">{job.mcu}</strong>
                        </span>
                      )}
                    </div>

                    {/* Bullets */}
                    <ul className={`list-disc list-outside ml-4 space-y-1 text-justify ${
                      viewMode === 'paper' ? 'text-[#1F2937]' : 'text-[#B4C2CC]'
                    }`}>
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="leading-snug">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: EDUCATION & PUBLICATIONS */}
            <div className="mt-4">
              <div className="mb-2">
                <h2 className={`text-[13px] font-bold tracking-wider uppercase mb-1 ${
                  viewMode === 'paper' ? 'text-black' : 'text-[#E8A33D]'
                }`}>
                  Education &amp; Research Publication
                </h2>
                <div className={`h-[1.5px] w-full ${viewMode === 'paper' ? 'bg-[#1F2937]' : 'bg-[#233039]'}`} />
              </div>

              <div className="space-y-2 text-[11.5px]">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold">{edu.institution}</span>
                      <span className="font-semibold">{edu.period}</span>
                    </div>
                    <div className="flex items-baseline justify-between text-[11px] text-[#4B5563]">
                      <span className="italic">{edu.degree}</span>
                      <span className="italic">{edu.location}</span>
                    </div>
                  </div>
                ))}

                <div className="pt-1 text-[11px]">
                  <div className="font-bold">
                    Peer-Reviewed Publication: <span className="italic font-normal">"{publication.title}" ({publication.year})</span>
                  </div>
                  <div className="text-[#4B5563]">
                    {publication.journal}, {publication.conference}, {publication.volume}.
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-5 py-3 bg-[#0B1015] border-t border-[#233039] flex flex-wrap items-center justify-between gap-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 text-[#8B99A3]">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Resume ready &bull; Print to save as PDF or download original asset</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#16202A] hover:bg-[#233039] text-[#E4EAEE] border border-[#233039] font-medium transition-colors disabled:opacity-50"
              title="Download exact preview layout as PDF"
            >
              <Download className={`w-3.5 h-3.5 text-[#E8A33D] ${isDownloading ? 'animate-bounce' : ''}`} />
              <span>{isDownloading ? 'Generating PDF...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-1.5 font-bold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-all shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
