import React, { useState } from 'react';
import { Briefcase, Calendar, MapPin, Cpu, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { WORK_EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(WORK_EXPERIENCES[0].id);

  return (
    <section id="experience" className="py-16 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
              <span>Section 3.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
              <span>Career History &amp; Impact</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
              Work Experience
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8B99A3]">
            Production firmware architecture across automotive tier-1 telematics &amp; industrial IoT.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {WORK_EXPERIENCES.map((job) => {
            const isExpanded = expandedId === job.id;

            return (
              <div
                key={job.id}
                className={`bg-[#10171E] border transition-all rounded-lg overflow-hidden ${
                  isExpanded ? 'border-[#E8A33D]/60 shadow-lg' : 'border-[#233039] hover:border-[#354550]'
                }`}
              >
                {/* Header / Clickable summary row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : job.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-lg font-bold font-mono text-white">
                        {job.role}
                      </h3>
                      <span className="text-sm font-mono text-[#E8A33D] font-semibold">
                        @ {job.company}
                      </span>
                      {job.current && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Active Role
                        </span>
                      )}
                    </div>
                    {job.summary && (
                      <p className="text-xs text-[#8B99A3] max-w-2xl">
                        {job.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 font-mono text-xs text-[#8B99A3]">
                    <div className="flex flex-col md:items-end">
                      <span className="flex items-center gap-1.5 text-[#E4EAEE]">
                        <Calendar className="w-3.5 h-3.5 text-[#E8A33D]" />
                        {job.period}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-[#566470] mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded bg-[#16202A] text-[#8B99A3] transition-transform ${
                      isExpanded ? 'rotate-90 text-[#E8A33D]' : ''
                    }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Target Hardware Tag Bar */}
                {job.mcu && (
                  <div className="px-5 sm:px-6 py-2 bg-[#0D1319] border-t border-b border-[#1C2731] flex items-center gap-2 text-xs font-mono text-[#8B99A3]">
                    <Cpu className="w-3.5 h-3.5 text-[#E8A33D]" />
                    <span className="text-[#566470]">Hardware Platform:</span>
                    <span className="text-white font-medium">{job.mcu}</span>
                  </div>
                )}

                {/* Detailed Bullets (Shown when expanded or always clear) */}
                <div className={`px-5 sm:px-6 py-4 space-y-3 bg-[#0B1015]/60 ${isExpanded ? 'block' : 'hidden'}`}>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D]">
                    Key Deliverables &amp; Technical Achievements:
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#B4C2CC] leading-relaxed">
                    {job.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-[#E8A33D] font-mono text-sm leading-none mt-0.5">›</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Chips */}
                  <div className="pt-3 border-t border-[#1C2731] flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-[#566470] mr-1">Stack:</span>
                    {job.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#10171E] text-[#8B99A3] border border-[#233039]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
