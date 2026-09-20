import React, { useState, useEffect } from 'react';
import { Download, FileText, Github, Mail, Terminal, Cpu, ShieldCheck, ArrowRight, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { personalInfo, resumeFileName, resumeDownloadUrl, downloadResumePdf, setIsResumeModalOpen, setIsEditModalOpen } = usePortfolio();
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [cmdInput, setCmdInput] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const initialBootLogs = [
    '> POST: ARM Cortex-M33 / Renesas RA Series ... [PASS]',
    '> Flash Vector Table: 0x0000_0000 -> Active App Bank ... [OK]',
    '> QL_RTOS / FreeRTOS Kernel Scheduler Initialized ... [OK]',
    '> Peripheral Bringup: CAN0 (500k), SPI1, UART2 (115200) ... [SYNC]',
    '> Profile: Pradeep Kumar Balasubramanian [READY]'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < initialBootLogs.length) {
        const nextLog = initialBootLogs[index];
        if (typeof nextLog === 'string') {
          setTerminalLines(prev => [...prev, nextLog]);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 280);

    return () => clearInterval(interval);
  }, []);

  const runCommand = (cmd: string) => {
    if (!cmd || !cmd.trim()) return;
    const trimmed = cmd.trim().toLowerCase();
    let response = '';

    if (trimmed === 'help') {
      response = '> commands: sysinfo, cat resume, canbus, whoami, clear';
    } else if (trimmed === 'sysinfo') {
      response = `> MCU: Renesas RA / STM32 | RTOS: FreeRTOS | Stack: C/C++/Python | CAN 2.0B & J1939`;
    } else if (trimmed === 'cat resume' || trimmed === 'resume') {
      response = `> Opening resume preview for ${resumeFileName} ...`;
      onOpenResumeModal();
    } else if (trimmed === 'canbus') {
      response = `> CAN Bus: Baud=500kbps, Arbitration ID=0x7DF, Diagnostic UDS Session Active`;
      const canElement = document.getElementById('canbus');
      if (canElement) canElement.scrollIntoView({ behavior: 'smooth' });
    } else if (trimmed === 'whoami') {
      response = `> Pradeep Kumar Balasubramanian — Embedded Software Engineer (Pune, India)`;
    } else if (trimmed === 'clear') {
      setTerminalLines(['> terminal cleared. type "help" for commands.']);
      setCmdInput('');
      return;
    } else {
      response = `> unknown command: "${cmd}". type "help" for options.`;
    }

    setTerminalLines(prev => [...prev, `$ ${cmd}`, response]);
    setCmdInput('');
  };

  const handleDownloadClick = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section className="relative pt-8 pb-16 border-b border-[#233039] overflow-hidden bg-pcb-grid">
      
      {/* Background Circuit SVG Traces */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 z-0" 
        viewBox="0 0 1200 450" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#354550" strokeWidth="1.2" fill="none">
          <path d="M0 45 H320 V110 H680 V160 H1200" />
          <path d="M0 160 H180 V220 H490 V280 H900 V340 H1200" />
          <path d="M1200 70 H920 V130 H640 V200 H320" />
          <path d="M420 0 V110" />
          <path d="M780 0 V60" />
          <path d="M260 450 V340" />
          <path d="M850 450 V280" />
        </g>
        <g fill="#E8A33D" opacity="0.8">
          <circle cx="320" cy="45" r="3.5" className="animate-pulse" />
          <circle cx="680" cy="110" r="3.5" />
          <circle cx="180" cy="160" r="3.5" />
          <circle cx="490" cy="220" r="3.5" className="animate-pulse" />
          <circle cx="920" cy="70" r="3.5" />
          <circle cx="640" cy="130" r="3.5" />
        </g>
      </svg>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Terminal Boot Log Box */}
        <div className="max-w-2xl mx-auto mb-8 bg-[#0D1319] border border-[#233039] rounded-lg shadow-xl overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between px-3.5 py-2 bg-[#10171E] border-b border-[#233039]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="text-[11px] text-[#8B99A3] ml-1.5 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-[#E8A33D]" />
                firmware_bootloader.log
              </span>
            </div>
            <div className="text-[10px] text-[#566470] hidden sm:block">
              UART0 @ 115200 baud
            </div>
          </div>

          <div className="p-3.5 space-y-1 text-[#8B99A3] max-h-40 overflow-y-auto">
            {terminalLines.filter((l): l is string => Boolean(l && typeof l === 'string')).map((line, idx) => {
              const safeLine = line || '';
              const isCommand = safeLine.startsWith('$');
              const isPass = safeLine.includes('[PASS]') || safeLine.includes('[OK]');
              return (
                <div 
                  key={idx} 
                  className={isCommand ? 'text-[#E8A33D] font-semibold' : isPass ? 'text-[#A4B3BF]' : 'text-[#8B99A3]'}
                >
                  {safeLine}
                </div>
              );
            })}
            <div className="flex items-center gap-1 text-[#E8A33D] pt-0.5">
              <span>$</span>
              <input
                type="text"
                value={cmdInput}
                onChange={(e) => setCmdInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runCommand(cmdInput)}
                placeholder="type command (e.g. sysinfo, resume, canbus, help) & hit enter..."
                className="bg-transparent text-[#E4EAEE] focus:outline-none w-full text-xs placeholder:text-[#566470]"
              />
              <span className="w-1.5 h-3.5 bg-[#E8A33D] animate-pulse"></span>
            </div>
          </div>

          {/* Quick command buttons */}
          <div className="px-3.5 py-1.5 bg-[#0B1015] border-t border-[#1C2731] flex flex-wrap items-center gap-2 text-[10px] text-[#566470]">
            <span className="text-[#8B99A3]">Quick Commands:</span>
            {['sysinfo', 'canbus', 'cat resume', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => runCommand(cmd)}
                className="px-1.5 py-0.5 rounded bg-[#16202A] hover:bg-[#233039] hover:text-[#E8A33D] text-[#8B99A3] transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Title & Core Banner */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16202A] border border-[#233039] text-xs font-mono text-[#E8A33D] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-ping"></span>
            <span>AUTOMOTIVE TELEMATICS • RTOS • FIRMWARE ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tight text-white mb-3">
            {personalInfo.fullName}
          </h1>

          <p className="text-lg sm:text-xl font-mono text-[#E8A33D] font-medium mb-2">
            {personalInfo.title}
          </p>

          <p className="text-xs sm:text-sm font-mono text-[#8B99A3]">
            {personalInfo.location} — <span className="text-emerald-400 font-semibold">{personalInfo.relocation}</span>
          </p>
        </div>

        {/* Capability Tags / Flags */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-8">
          <span className="font-mono text-xs text-[#E4EAEE] px-3 py-1.5 rounded bg-[#10171E] border border-[#354550] flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#E8A33D]" /> Automotive Telematics
          </span>
          <span className="font-mono text-xs text-[#E4EAEE] px-3 py-1.5 rounded bg-[#10171E] border border-[#354550] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E8A33D]" /> RTOS &amp; Bootloaders
          </span>
          <span className="font-mono text-xs text-[#E4EAEE] px-3 py-1.5 rounded bg-[#10171E] border border-[#354550]">
            CAN 2.0B / UDS / J1939
          </span>
          <span className="font-mono text-xs text-[#E4EAEE] px-3 py-1.5 rounded bg-[#10171E] border border-[#354550]">
            Embedded C / C++ / Python
          </span>
          <span className="font-mono text-xs text-[#E4EAEE] px-3 py-1.5 rounded bg-[#10171E] border border-[#354550]">
            Renesas RA &amp; STM32
          </span>
        </div>

        {/* Action CTAs: Direct Download, Preview, and GitHub Code-vault */}
        <div className="flex flex-wrap justify-center items-center gap-3.5 mb-10">
          
          {/* Main Download Button */}
          <button
            id="hero-download-resume-btn"
            onClick={() => {
              handleDownloadClick();
              downloadResumePdf();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3 font-mono text-sm font-semibold bg-[#E8A33D] text-[#0B1015] hover:bg-[#F59E0B] rounded transition-all shadow-lg amber-glow transform active:scale-95"
            title={`Download LaTeX PDF ${resumeFileName}`}
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#0B1015]" />
                <span>Downloading {resumeFileName}...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </>
            )}
          </button>

          {/* Preview Resume Modal Button */}
          <button
            id="hero-preview-resume-btn"
            onClick={onOpenResumeModal}
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-sm text-[#E4EAEE] bg-[#10171E] hover:bg-[#16202A] border border-[#354550] hover:border-[#E8A33D] rounded transition-all shadow-sm"
          >
            <FileText className="w-4 h-4 text-[#E8A33D]" />
            <span>Preview Resume</span>
          </button>

          {/* GitHub Code-Vault */}
          <a
            href={personalInfo.codeVault}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 font-mono text-sm text-[#8B99A3] hover:text-[#E4EAEE] bg-[#10171E] hover:bg-[#16202A] border border-[#233039] hover:border-[#354550] rounded transition-all"
          >
            <Github className="w-4 h-4 text-[#E8A33D]" />
            <span>Browse code-vault</span>
          </a>

          {/* Contact Jump */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-3 font-mono text-sm text-[#8B99A3] hover:text-[#E8A33D] transition-colors"
          >
            <span>Pinout Contact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Hardware & Engineering Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 border-t border-[#233039]">
          <div className="p-4 rounded bg-[#10171E] border border-[#233039] text-center font-mono">
            <span className="block text-2xl sm:text-3xl font-bold text-[#E8A33D] mb-1">
              {personalInfo.experienceYears}
            </span>
            <span className="block text-xs text-[#8B99A3]">
              Years Engineering Exp
            </span>
          </div>

          <div className="p-4 rounded bg-[#10171E] border border-[#233039] text-center font-mono">
            <span className="block text-2xl sm:text-3xl font-bold text-[#E8A33D] mb-1">
              {personalInfo.protocolsCount}
            </span>
            <span className="block text-xs text-[#8B99A3]">
              Protocols Mastered
            </span>
          </div>

          <div className="p-4 rounded bg-[#10171E] border border-[#233039] text-center font-mono">
            <span className="block text-2xl sm:text-3xl font-bold text-[#E8A33D] mb-1">
              {personalInfo.platformsCount}
            </span>
            <span className="block text-xs text-[#8B99A3]">
              MCU / SoC Architectures
            </span>
          </div>

          <div className="p-4 rounded bg-[#10171E] border border-[#233039] text-center font-mono">
            <span className="block text-2xl sm:text-3xl font-bold text-[#E8A33D] mb-1">
              100%
            </span>
            <span className="block text-xs text-[#8B99A3]">
              Production Grade Firmware
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
