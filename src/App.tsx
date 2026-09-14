import React, { useState } from 'react';
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
import { RESUME_FILENAME, RESUME_DOWNLOAD_URL } from './data/portfolioData';
import { FileDown, Eye } from 'lucide-react';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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

        {/* Section 2: Interactive CAN Bus & Logic Analyzer Widget */}
        <CanBusVisualizer />

        {/* Section 3: Work Experience Timeline */}
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

      {/* Interactive Résumé Screen Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Floating Quick Action Widget for Instant Resume Access */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-[#10171E]/90 backdrop-blur-md p-1.5 rounded-full border border-[#233039] shadow-xl">
        <button
          onClick={() => setIsResumeModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#16202A] hover:bg-[#233039] text-[#8B99A3] hover:text-white font-mono text-xs transition-colors"
          title="Preview Résumé"
        >
          <Eye className="w-3.5 h-3.5 text-[#E8A33D]" />
          <span className="hidden sm:inline">Preview CV</span>
        </button>

        <a
          href={RESUME_DOWNLOAD_URL}
          download={RESUME_FILENAME}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-mono text-xs font-semibold shadow-md amber-glow-sm transition-all"
          title={`Download ${RESUME_FILENAME}`}
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Download PDF</span>
        </a>
      </div>

    </div>
  );
}
