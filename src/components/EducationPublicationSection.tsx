import React from 'react';
import { GraduationCap, BookOpen, Globe2, Award, Calendar, MapPin } from 'lucide-react';
import { EDUCATION, PUBLICATION } from '../data/portfolioData';

export const EducationPublicationSection: React.FC = () => {
  return (
    <section id="education" className="py-16 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
              <span>Section 6.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
              <span>Academics &amp; Research</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
              Education &amp; Publications
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Education Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Credentials</span>
            </h3>

            <div className="space-y-4">
              {EDUCATION.map((edu, idx) => (
                <div
                  key={idx}
                  className="bg-[#10171E] border border-[#233039] hover:border-[#354550] rounded-lg p-5 transition-all"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#8B99A3] mb-1.5">
                    <span className="text-[#E8A33D] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {edu.location}
                    </span>
                  </div>

                  <h4 className="text-base font-bold font-mono text-white mb-1">
                    {edu.degree}
                  </h4>
                  <div className="text-xs text-[#E8A33D] font-mono mb-2">
                    {edu.institution}
                  </div>

                  <p className="text-xs text-[#8B99A3] leading-relaxed mb-3">
                    {edu.details}
                  </p>

                  {edu.highlights && (
                    <div className="pt-2 border-t border-[#1C2731] space-y-1 text-xs text-[#A4B3BF]">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#E8A33D]"></span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Research Publication & Languages Column */}
          <div className="space-y-6">
            
            {/* Research Paper */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Peer-Reviewed Research</span>
              </h3>

              <div className="bg-[#10171E] border border-[#233039] hover:border-[#354550] rounded-lg p-5 transition-all">
                <div className="flex items-center gap-2 text-xs font-mono text-[#E8A33D] mb-2">
                  <Award className="w-4 h-4 text-[#E8A33D]" />
                  <span>IJERT — {PUBLICATION.conference} ({PUBLICATION.year})</span>
                </div>

                <h4 className="text-sm font-bold font-mono text-white mb-2 leading-snug">
                  "{PUBLICATION.title}"
                </h4>

                <p className="text-xs text-[#8B99A3] leading-relaxed mb-3">
                  {PUBLICATION.description}
                </p>

                <div className="p-2.5 rounded bg-[#0D1319] border border-[#1C2731] text-[11px] font-mono text-[#A4B3BF]">
                  <strong>Citation: </strong>
                  {PUBLICATION.journal}, {PUBLICATION.volume}.
                </div>
              </div>
            </div>

            {/* Languages & Interests */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#E8A33D] font-semibold flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                <span>Languages &amp; Domains</span>
              </h3>

              <div className="bg-[#10171E] border border-[#233039] rounded-lg p-4 font-mono text-xs">
                <div className="grid grid-cols-2 gap-2 text-[#E4EAEE] pb-3 border-b border-[#1C2731]">
                  <div className="flex justify-between p-1.5 rounded bg-[#0D1319]">
                    <span>English</span>
                    <span className="text-[#E8A33D]">Professional</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-[#0D1319]">
                    <span>Tamil</span>
                    <span className="text-[#E8A33D]">Native</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-[#0D1319]">
                    <span>Hindi</span>
                    <span className="text-[#E8A33D]">Professional</span>
                  </div>
                  <div className="flex justify-between p-1.5 rounded bg-[#0D1319]">
                    <span>Japanese</span>
                    <span className="text-[#8B99A3]">Beginner</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#8B99A3] mt-3 leading-relaxed">
                  Focus: Automotive telematics edge processing, deterministic RTOS task modeling, FOTA cryptographic integrity, and industrial controller fault tolerance.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
