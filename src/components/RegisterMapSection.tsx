import React, { useState } from 'react';
import { Search, Binary, Check, Cpu } from 'lucide-react';
import { REGISTER_MAP } from '../data/portfolioData';

export const RegisterMapSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBit, setActiveBit] = useState<string | null>(null);

  const query = (searchTerm || '').toLowerCase();
  const filteredMap = REGISTER_MAP.filter(reg => 
    (reg.name || '').toLowerCase().includes(query) ||
    (reg.description || '').toLowerCase().includes(query) ||
    (reg.bits || []).some(b => (b || '').toLowerCase().includes(query))
  );

  return (
    <section id="skills" className="py-16 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
              <span>Section 5.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
              <span>Memory-Mapped I/O Skillset</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
              Register Map — Technical Skills
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#566470] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search registers or protocols..."
              className="w-full pl-9 pr-3 py-1.5 text-xs font-mono bg-[#10171E] text-[#E4EAEE] border border-[#233039] focus:border-[#E8A33D] focus:outline-none rounded transition-colors placeholder:text-[#566470]"
            />
          </div>
        </div>

        {/* Register Blocks */}
        <div className="space-y-4 font-mono">
          {filteredMap.map((reg) => (
            <div
              key={reg.address}
              className="bg-[#10171E] border border-[#233039] hover:border-[#354550] rounded-lg overflow-hidden transition-all"
            >
              {/* Register Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0D1319] border-b border-[#233039]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-[#E8A33D] px-2 py-0.5 rounded bg-[#E8A33D]/10 border border-[#E8A33D]/20">
                    ADDR: {reg.address}
                  </span>
                  <span className="text-sm font-bold text-white tracking-wide">
                    {reg.name}
                  </span>
                </div>
                <span className="text-xs text-[#8B99A3]">
                  {reg.description}
                </span>
              </div>

              {/* Bit fields */}
              <div className="p-4 flex flex-wrap gap-2">
                {reg.bits.map((bit, bitIdx) => {
                  const isSelected = activeBit === bit;

                  return (
                    <button
                      key={bit}
                      onClick={() => setActiveBit(isSelected ? null : bit)}
                      className={`px-3 py-1.5 rounded text-xs transition-all flex items-center gap-2 ${
                        isSelected
                          ? 'bg-[#E8A33D] text-[#0B1015] font-semibold ring-2 ring-[#E8A33D]/50 shadow'
                          : 'bg-[#0B1015] text-[#A4B3BF] hover:text-white border border-[#233039] hover:border-[#E8A33D]/50'
                      }`}
                    >
                      <span className="text-[10px] opacity-70">
                        BIT[{bitIdx}]:
                      </span>
                      <span>{bit}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredMap.length === 0 && (
            <div className="text-center py-8 text-xs font-mono text-[#8B99A3] bg-[#10171E] border border-dashed border-[#233039] rounded-lg">
              No register entries found matching "{searchTerm}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
