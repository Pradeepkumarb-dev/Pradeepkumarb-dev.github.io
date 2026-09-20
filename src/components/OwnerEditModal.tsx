import React, { useState } from 'react';
import {
  X, Lock, KeyRound, Check, FileText, CheckCircle2, AlertCircle,
  Save, RotateCcw, Eye, Code, AlignLeft, Sparkles, Plus, Trash2, ListOrdered
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { parseExperienceText } from '../utils/textParser';
import { WorkExperience } from '../types';

export const OwnerEditModal: React.FC = () => {
  const {
    isEditModalOpen,
    setIsEditModalOpen,
    isOwner,
    authenticateOwner,
    logoutOwner,
    personalInfo,
    updatePersonalInfo,
    workExperiences,
    setWorkExperiences,
    education,
    setEducation,
    registerMap,
    setRegisterMap,
    publication,
    updatePublication,
    resetToDefaults,
    setIsResumeModalOpen,
    saveAllContent
  } = usePortfolio();

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Tabs: 'document' (Full Word-like document editor) | 'smartParse' (Paste & parse) | 'quickEdit' (Card-by-card)
  const [editorMode, setEditorMode] = useState<'document' | 'smartParse' | 'quickEdit'>('document');
  const [saveBanner, setSaveBanner] = useState(false);

  // Document (Word-like) state
  const [docSummary, setDocSummary] = useState(personalInfo.summary);
  const [docName, setDocName] = useState(personalInfo.fullName);
  const [docTitle, setDocTitle] = useState(personalInfo.title);
  const [docSpecialization, setDocSpecialization] = useState(personalInfo.specialization);
  const [docLocation, setDocLocation] = useState(personalInfo.location);
  const [docEmail, setDocEmail] = useState(personalInfo.email);
  const [docPhone, setDocPhone] = useState(personalInfo.phone);
  const [docWebsite, setDocWebsite] = useState(personalInfo.website);
  const [docLinkedin, setDocLinkedin] = useState(personalInfo.linkedin);
  const [docGithub, setDocGithub] = useState(personalInfo.github);
  const [docCodeVault, setDocCodeVault] = useState(personalInfo.codeVault);

  // Smart parser state
  const [rawPasteText, setRawPasteText] = useState('');
  const [showParseSuccess, setShowParseSuccess] = useState(false);

  if (!isEditModalOpen) return null;

  const handleUnlock = (pwdToTest?: string) => {
    const pwd = pwdToTest || passwordInput;
    if (authenticateOwner(pwd)) {
      setAuthError('');
      setPasswordInput('');
      // Sync initial document fields
      setDocSummary(personalInfo.summary);
      setDocName(personalInfo.fullName);
      setDocTitle(personalInfo.title);
      setDocSpecialization(personalInfo.specialization);
      setDocLocation(personalInfo.location);
      setDocEmail(personalInfo.email);
      setDocPhone(personalInfo.phone);
      setDocWebsite(personalInfo.website);
      setDocLinkedin(personalInfo.linkedin);
      setDocGithub(personalInfo.github);
      setDocCodeVault(personalInfo.codeVault);
    } else {
      setAuthError('Incorrect password. Please enter the authorized password.');
    }
  };

  const triggerSaveBanner = () => {
    setSaveBanner(true);
    setTimeout(() => setSaveBanner(false), 3000);
  };

  // Save the entire Word-like document content back to the live site & state
  const handleSaveDocument = () => {
    updatePersonalInfo({
      fullName: docName,
      title: docTitle,
      specialization: docSpecialization,
      location: docLocation,
      email: docEmail,
      phone: docPhone,
      website: docWebsite,
      linkedin: docLinkedin,
      github: docGithub,
      codeVault: docCodeVault,
      summary: docSummary
    });
    triggerSaveBanner();
  };

  // Auto-parse text and prepend to work experiences
  const handleParseAndAddExperience = () => {
    if (!rawPasteText.trim()) return;
    const parsed = parseExperienceText(rawPasteText);
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      role: parsed.role || 'Embedded Software Engineer',
      company: parsed.company || 'Company Name',
      location: parsed.location || 'Pune, India',
      period: parsed.period || '2024 – Present',
      current: parsed.current || false,
      summary: parsed.summary || '',
      bullets: parsed.bullets && parsed.bullets.length > 0 ? parsed.bullets : ['Engineered production embedded systems firmware.'],
      techStack: parsed.techStack && parsed.techStack.length > 0 ? parsed.techStack : ['Embedded C', 'FreeRTOS'],
      mcu: parsed.mcu || ''
    };

    setWorkExperiences(prev => [newExp, ...prev]);
    setRawPasteText('');
    setShowParseSuccess(true);
    setTimeout(() => setShowParseSuccess(false), 3000);
    triggerSaveBanner();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-5xl bg-[#10171E] border border-[#233039] shadow-2xl rounded-xl my-auto overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 py-3 bg-[#0B1015] border-b border-[#233039] gap-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded bg-[#E8A33D]/10 text-[#E8A33D]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2 font-mono">
                <span>Site &amp; Content Editor</span>
                {isOwner && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    Unlocked
                  </span>
                )}
              </div>
              <p className="text-[11px] font-mono text-[#8B99A3]">
                Edit live website text in a document format • Protected
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            {isOwner && (
              <>
                <button
                  onClick={handleSaveDocument}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-bold shadow-md transition-all"
                  title="Save changes to website"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save to Website</span>
                </button>

                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setIsResumeModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#16202A] hover:bg-[#233039] text-[#E4EAEE] border border-[#233039] transition-colors"
                  title="Preview CV"
                >
                  <Eye className="w-3.5 h-3.5 text-[#E8A33D]" />
                  <span className="hidden sm:inline">Preview CV</span>
                </button>
              </>
            )}

            <button
              onClick={() => setIsEditModalOpen(false)}
              className="p-1.5 text-[#8B99A3] hover:text-white bg-[#16202A] hover:bg-red-500/20 hover:text-red-400 border border-[#233039] rounded transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Save confirmation toast */}
        {saveBanner && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-5 py-2 text-xs font-mono text-emerald-400 flex items-center gap-2 animate-in slide-in-from-top-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>Success! Website and resume content have been updated and saved.</span>
          </div>
        )}

        {/* PASSWORD SCREEN - REQUIRES "vijayboss" */}
        {!isOwner ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#E8A33D]/10 text-[#E8A33D] mx-auto flex items-center justify-center border border-[#E8A33D]/20 shadow-inner">
              <KeyRound className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold font-mono text-white">
                Enter Password
              </h3>
              <p className="text-xs text-[#8B99A3] font-mono leading-relaxed">
                Content editing is protected. Enter your password to view and edit all website content.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                placeholder="Enter password..."
                className="w-full px-4 py-3 rounded bg-[#0D1319] border border-[#233039] text-center font-mono text-white text-sm focus:border-[#E8A33D] focus:outline-none shadow-sm"
                autoFocus
              />

              {authError && (
                <p className="text-xs text-red-400 font-mono flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{authError}</span>
                </p>
              )}

              <button
                onClick={() => handleUnlock()}
                className="w-full py-2.5 rounded bg-[#E8A33D] hover:bg-[#F59E0B] text-xs font-mono font-bold text-[#0B1015] shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock &amp; Edit Content</span>
              </button>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED CONTENT EDITOR */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0D1319]">
            
            {/* Word-like Editor Toolbar & Format Bar */}
            <div className="flex flex-wrap items-center justify-between px-5 py-2.5 bg-[#080D11] border-b border-[#233039] gap-3 text-xs font-mono">
              <div className="flex items-center gap-1 bg-[#10171E] p-1 rounded-lg border border-[#233039]">
                <button
                  onClick={() => setEditorMode('document')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                    editorMode === 'document'
                      ? 'bg-[#E8A33D] text-[#0B1015] font-bold shadow-sm'
                      : 'text-[#8B99A3] hover:text-white'
                  }`}
                >
                  <AlignLeft className="w-3.5 h-3.5" />
                  <span>Word Document View</span>
                </button>

                <button
                  onClick={() => setEditorMode('smartParse')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                    editorMode === 'smartParse'
                      ? 'bg-[#E8A33D] text-[#0B1015] font-bold shadow-sm'
                      : 'text-[#8B99A3] hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Auto-Parse Text</span>
                </button>

                <button
                  onClick={() => setEditorMode('quickEdit')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                    editorMode === 'quickEdit'
                      ? 'bg-[#E8A33D] text-[#0B1015] font-bold shadow-sm'
                      : 'text-[#8B99A3] hover:text-white'
                  }`}
                >
                  <ListOrdered className="w-3.5 h-3.5" />
                  <span>Roles &amp; Skills Cards</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={resetToDefaults}
                  className="px-2.5 py-1.5 rounded bg-[#16202A] hover:bg-red-500/20 text-red-300 hover:text-red-200 border border-[#233039] text-[11px] transition-colors"
                  title="Reset content to initial defaults"
                >
                  Reset Defaults
                </button>
                <button
                  onClick={logoutOwner}
                  className="px-2.5 py-1.5 rounded bg-[#16202A] hover:bg-[#233039] text-[#8B99A3] hover:text-white border border-[#233039] text-[11px] transition-colors"
                  title="Lock editor session"
                >
                  Lock
                </button>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-7 space-y-6">

              {/* ------------------------------------------------------------- */}
              {/* MODE 1: WORD-LIKE FULL DOCUMENT VIEW (ALL CONTENT LISTED)   */}
              {/* ------------------------------------------------------------- */}
              {editorMode === 'document' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Document Page Canvas */}
                  <div className="bg-[#10171E] border border-[#233039] rounded-xl p-6 sm:p-9 space-y-8 shadow-xl">
                    
                    {/* DOC HEADER: NAME, TITLE, CONTACT */}
                    <div className="pb-6 border-b border-[#233039] space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#E8A33D] uppercase tracking-wider font-semibold">
                          Document Header &bull; Identity &amp; Contact
                        </span>
                        <span className="text-[11px] font-mono text-[#8B99A3]">
                          Edits update website and CV output
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                        <div>
                          <label className="text-[#8B99A3] block mb-1">Full Legal Name</label>
                          <input
                            type="text"
                            value={docName}
                            onChange={(e) => setDocName(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">Professional Title</label>
                          <input
                            type="text"
                            value={docTitle}
                            onChange={(e) => setDocTitle(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-[#E8A33D] focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">Specialization Focus</label>
                          <input
                            type="text"
                            value={docSpecialization}
                            onChange={(e) => setDocSpecialization(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">Location &amp; Relocation</label>
                          <input
                            type="text"
                            value={docLocation}
                            onChange={(e) => setDocLocation(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">Primary Email</label>
                          <input
                            type="email"
                            value={docEmail}
                            onChange={(e) => setDocEmail(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">Phone Number</label>
                          <input
                            type="text"
                            value={docPhone}
                            onChange={(e) => setDocPhone(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-[#8B99A3] block mb-1">
                            Portfolio Website (Shown in Header &amp; CV)
                          </label>
                          <input
                            type="url"
                            value={docWebsite}
                            onChange={(e) => setDocWebsite(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-emerald-500/40 text-emerald-400 font-bold focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">LinkedIn URL</label>
                          <input
                            type="url"
                            value={docLinkedin}
                            onChange={(e) => setDocLinkedin(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="text-[#8B99A3] block mb-1">GitHub Profile URL</label>
                          <input
                            type="url"
                            value={docGithub}
                            onChange={(e) => setDocGithub(e.target.value)}
                            className="w-full p-2.5 rounded bg-[#0D1319] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* DOC SECTION 1: PROFESSIONAL SUMMARY (WORD FORMAT) */}
                    <div className="space-y-3 pb-6 border-b border-[#233039]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E8A33D]"></span>
                          <span>Section 1 &bull; Executive Summary</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#8B99A3]">Paragraph text</span>
                      </div>

                      <textarea
                        rows={5}
                        value={docSummary}
                        onChange={(e) => setDocSummary(e.target.value)}
                        className="w-full p-3.5 rounded-lg bg-[#0D1319] border border-[#233039] text-[#E4EAEE] text-xs font-mono leading-relaxed focus:border-[#E8A33D] focus:outline-none shadow-inner"
                      />
                    </div>

                    {/* DOC SECTION 2: WORK EXPERIENCES (ALL EXPANDED IN FULL) */}
                    <div className="space-y-6 pb-6 border-b border-[#233039]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E8A33D]"></span>
                          <span>Section 2 &bull; Work Experience Details</span>
                        </h4>
                        <button
                          onClick={() => {
                            const newExp: WorkExperience = {
                              id: `exp-${Date.now()}`,
                              role: 'New Engineering Role',
                              company: 'Company / Organization',
                              location: 'Location',
                              period: '2024 – Present',
                              current: true,
                              bullets: ['Engineered firmware deliverable or protocol implementation.'],
                              techStack: ['Embedded C', 'FreeRTOS']
                            };
                            setWorkExperiences(prev => [newExp, ...prev]);
                            triggerSaveBanner();
                          }}
                          className="text-xs font-mono text-[#E8A33D] hover:underline flex items-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add New Role</span>
                        </button>
                      </div>

                      <div className="space-y-6">
                        {workExperiences.map((job, jobIdx) => (
                          <div
                            key={job.id}
                            className="p-5 rounded-lg bg-[#0D1319] border border-[#233039] space-y-4 text-xs font-mono"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-[#1C2731]">
                              <span className="font-bold text-[#E8A33D]">
                                Role #{jobIdx + 1}: {job.role || 'Untitled'}
                              </span>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${job.role} at ${job.company}"?`)) {
                                    setWorkExperiences(prev => prev.filter(item => item.id !== job.id));
                                    triggerSaveBanner();
                                  }
                                }}
                                className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px]"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Delete Role</span>
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="text-[#8B99A3] block mb-1">Job Title / Role</label>
                                <input
                                  type="text"
                                  value={job.role}
                                  onChange={(e) => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id ? { ...item, role: e.target.value } : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[#8B99A3] block mb-1">Company / Org</label>
                                <input
                                  type="text"
                                  value={job.company}
                                  onChange={(e) => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id ? { ...item, company: e.target.value } : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[#8B99A3] block mb-1">Period (e.g. Aug 2024 – Present)</label>
                                <input
                                  type="text"
                                  value={job.period}
                                  onChange={(e) => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id ? { ...item, period: e.target.value } : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[#8B99A3] block mb-1">Location</label>
                                <input
                                  type="text"
                                  value={job.location}
                                  onChange={(e) => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id ? { ...item, location: e.target.value } : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="text-[#8B99A3] block mb-1">MCU / Hardware Architecture</label>
                                <input
                                  type="text"
                                  value={job.mcu || ''}
                                  placeholder="e.g. Renesas RA Series (ARM Cortex-M33) & Quectel EC200"
                                  onChange={(e) => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id ? { ...item, mcu: e.target.value } : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Tech Stack tags */}
                            <div>
                              <label className="text-[#8B99A3] block mb-1">Tech Stack (comma separated)</label>
                              <input
                                type="text"
                                value={job.techStack.join(', ')}
                                onChange={(e) => {
                                  const tags = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                  const updated = workExperiences.map(item =>
                                    item.id === job.id ? { ...item, techStack: tags } : item
                                  );
                                  setWorkExperiences(updated);
                                }}
                                className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                              />
                            </div>

                            {/* Bullet points */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <label className="text-[#8B99A3]">Bullet Deliverables / Achievements</label>
                                <button
                                  onClick={() => {
                                    const updated = workExperiences.map(item =>
                                      item.id === job.id
                                        ? { ...item, bullets: [...item.bullets, 'Engineered new firmware solution.'] }
                                        : item
                                    );
                                    setWorkExperiences(updated);
                                  }}
                                  className="text-[11px] text-[#E8A33D] hover:underline flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Bullet</span>
                                </button>
                              </div>

                              {job.bullets.map((b, bIdx) => (
                                <div key={bIdx} className="flex items-start gap-2">
                                  <span className="text-[#E8A33D] mt-2">&bull;</span>
                                  <textarea
                                    rows={2}
                                    value={b}
                                    onChange={(e) => {
                                      const newBullets = [...job.bullets];
                                      newBullets[bIdx] = e.target.value;
                                      const updated = workExperiences.map(item =>
                                        item.id === job.id ? { ...item, bullets: newBullets } : item
                                      );
                                      setWorkExperiences(updated);
                                    }}
                                    className="flex-1 p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none leading-relaxed"
                                  />
                                  <button
                                    onClick={() => {
                                      const newBullets = job.bullets.filter((_, i) => i !== bIdx);
                                      const updated = workExperiences.map(item =>
                                        item.id === job.id ? { ...item, bullets: newBullets } : item
                                      );
                                      setWorkExperiences(updated);
                                    }}
                                    className="p-1 text-red-400 hover:bg-red-500/10 rounded mt-1"
                                    title="Delete bullet"
                                  >
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>

                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DOC SECTION 3: TECHNICAL REGISTERS & SKILLS */}
                    <div className="space-y-4 pb-6 border-b border-[#233039]">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E8A33D]"></span>
                          <span>Section 3 &bull; Technical Skills (Register Map)</span>
                        </h4>
                        <span className="text-[11px] font-mono text-[#8B99A3]">Comma-separated skills list</span>
                      </div>

                      <div className="space-y-3 text-xs font-mono">
                        {registerMap.map((reg, regIdx) => (
                          <div key={reg.address} className="p-3 rounded bg-[#0D1319] border border-[#233039] space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-white">
                                {reg.address} &bull; {reg.name.replace(/_REG$/, '').replace(/_/g, ' ')}
                              </span>
                              <span className="text-[10px] text-[#8B99A3]">{reg.description}</span>
                            </div>
                            <input
                              type="text"
                              value={reg.bits.join(', ')}
                              onChange={(e) => {
                                const newBits = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                const updated = [...registerMap];
                                updated[regIdx] = { ...updated[regIdx], bits: newBits };
                                setRegisterMap(updated);
                              }}
                              className="w-full p-2 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DOC SECTION 4: EDUCATION & CREDENTIALS */}
                    <div className="space-y-4 pb-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#E8A33D]"></span>
                          <span>Section 4 &bull; Academic Education</span>
                        </h4>
                      </div>

                      <div className="space-y-3 text-xs font-mono">
                        {education.map((edu, eduIdx) => (
                          <div key={eduIdx} className="p-4 rounded bg-[#0D1319] border border-[#233039] space-y-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="text-[#8B99A3] block text-[11px]">Degree / Qualification</label>
                                <input
                                  type="text"
                                  value={edu.degree}
                                  onChange={(e) => {
                                    const updated = [...education];
                                    updated[eduIdx] = { ...updated[eduIdx], degree: e.target.value };
                                    setEducation(updated);
                                  }}
                                  className="w-full p-1.5 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-[#8B99A3] block text-[11px]">Institution &amp; Location</label>
                                <input
                                  type="text"
                                  value={`${edu.institution}, ${edu.location}`}
                                  onChange={(e) => {
                                    const updated = [...education];
                                    updated[eduIdx] = { ...updated[eduIdx], institution: e.target.value };
                                    setEducation(updated);
                                  }}
                                  className="w-full p-1.5 rounded bg-[#10171E] border border-[#233039] text-white focus:border-[#E8A33D] focus:outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Save Bar */}
                    <div className="pt-4 border-t border-[#233039] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#8B99A3]">
                        Clicking save will instantly synchronize both your public website and CV output.
                      </span>
                      <button
                        onClick={handleSaveDocument}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] font-mono text-xs font-bold shadow-lg transition-all"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save All Changes to Website</span>
                      </button>
                    </div>

                  </div>

                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* MODE 2: SMART PASTE & AUTO-PARSER                            */}
              {/* ------------------------------------------------------------- */}
              {editorMode === 'smartParse' && (
                <div className="max-w-3xl mx-auto space-y-4 font-mono">
                  <div className="p-4 rounded-lg bg-[#10171E] border-2 border-[#E8A33D]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#E8A33D]">
                        <Sparkles className="w-4 h-4" />
                        <span>Smart Paste &amp; Auto-Extract</span>
                      </div>
                      <span className="text-[11px] text-[#8B99A3]">
                        Paste text from LinkedIn or resume &rarr; automatically parsed
                      </span>
                    </div>

                    <textarea
                      rows={7}
                      value={rawPasteText}
                      onChange={(e) => setRawPasteText(e.target.value)}
                      placeholder="Paste any unformatted experience block here:
Example:
Senior Embedded Engineer
Bosch Mobility - Bengaluru, India
2022 - Present
- Designed AUTOSAR CAN gateway firmware for automotive microcontrollers...
- Reduced interrupt latency by 35% with FreeRTOS optimizations...
Tech Stack: Embedded C, FreeRTOS, CAN, UDS, STM32"
                      className="w-full p-3 rounded bg-[#0D1319] border border-[#233039] text-xs text-[#E4EAEE] focus:border-[#E8A33D] focus:outline-none placeholder:text-[#566470] leading-relaxed"
                    />

                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={handleParseAndAddExperience}
                        disabled={!rawPasteText.trim()}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-[#E8A33D] hover:bg-[#F59E0B] text-[#0B1015] text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Parse &amp; Add to Experience</span>
                      </button>

                      {showParseSuccess && (
                        <span className="text-xs text-emerald-400 flex items-center gap-1 animate-pulse">
                          <Check className="w-3.5 h-3.5" />
                          <span>Extracted and added to website!</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* MODE 3: QUICK CARDS OVERVIEW                                  */}
              {/* ------------------------------------------------------------- */}
              {editorMode === 'quickEdit' && (
                <div className="max-w-3xl mx-auto space-y-4 font-mono text-xs">
                  <div className="p-3 rounded bg-[#10171E] border border-[#233039] text-[#8B99A3]">
                    Quick reorder and removal of your current {workExperiences.length} work experience cards.
                  </div>

                  <div className="space-y-3">
                    {workExperiences.map((job, idx) => (
                      <div key={job.id} className="p-4 rounded bg-[#10171E] border border-[#233039] flex items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <div className="font-bold text-white text-sm">
                            {job.role} <span className="text-[#E8A33D] font-normal">&bull; {job.company}</span>
                          </div>
                          <div className="text-[11px] text-[#8B99A3]">
                            {job.period} &bull; {job.location}
                          </div>
                          <div className="text-[10px] text-[#566470] line-clamp-1">
                            {job.bullets[0]}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${job.role}"?`)) {
                                setWorkExperiences(prev => prev.filter(item => item.id !== job.id));
                                triggerSaveBanner();
                              }
                            }}
                            className="p-1.5 rounded text-red-400 hover:bg-red-500/10 border border-[#233039]"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
