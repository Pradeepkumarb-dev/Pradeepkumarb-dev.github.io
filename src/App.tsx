import React from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CanBusVisualizer } from './components/CanBusVisualizer';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { RegisterMapSection } from './components/RegisterMapSection';
import { EducationPublicationSection } from './components/EducationPublicationSection';
import { ContactPinoutSection } from './components/ContactPinoutSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { OwnerEditModal } from './components/OwnerEditModal';
import { FileDown, Eye, Edit3, Lock } from 'lucide-react';

function PortfolioApp() {
  const {
    isResumeModalOpen,
    setIsResumeModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    isOwner,
    resumeFileName,
    resumeDownloadUrl
  } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#0B1015] text-[#E4EAEE] flex flex-col font-sans selection:bg-[#E8A33D]/20 selection:text-[#E8A33D]">
      
      {/* Sticky Top Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Section 1: Hero & Embedded Terminal */}
        <section id="summary">
          <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        </section>

        {/* Section 2: Real-Time Digital Square Waveform & Oscilloscope Widget */}
        <CanBusVisualizer />

        {/* Section 3: Work Experience Timeline (Editable & Auto-parsable) */}
        <ExperienceSection />

        {/* Section 4: Projects & Code Vault */}
        <ProjectsSection />

        {/* Section 5: Register Map (Technical Skills) */}
        <RegisterMapSection />

        {/* Section 6: Education & Publications */}
        <EducationPublicationSection />

        {/* Section 7: Contact DIP Pinout */}
        <ContactPinoutSection onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      </main>

      {/* Footer */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Owner Management & Smart Text Parser Modal */}
      <OwnerEditModal />

      {/* Floating Quick Action Widget for Instant Resume & Owner Access */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-[#10171E]/95 backdrop-blur-md p-1.5 rounded-full border border-[#233039] shadow-xl">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
            isOwner
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
              : 'bg-[#16202A] hover:bg-[#233039] text-[#8B99A3] hover:text-[#E8A33D]'
          }`}
          title="Owner Editor: Edit work experience, paste text to auto-parse, or update website"
        >
          {isOwner ? <Edit3 className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-[#8B99A3]" />}
          <span className="hidden md:inline">{isOwner ? 'Edit Content' : 'Owner'}</span>
        </button>

        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16202A] hover:bg-[#233039] text-[#8B99A3] hover:text-white font-mono text-xs transition-colors border border-[#233039]"
          title="Preview Resume"
        >
          <Eye className="w-3.5 h-3.5 text-[#E8A33D]" />
          <span>Preview Resume</span>
        </button>

        <a
          href={resumeDownloadUrl}
          download={resumeFileName}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-mono text-xs font-semibold shadow-md amber-glow-sm transition-all"
          title={`Download ${resumeFileName}`}
        >
          <FileDown className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Download Resume</span>
          <span className="sm:hidden">PDF</span>
        </a>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioApp />
    </PortfolioProvider>
  );
}
