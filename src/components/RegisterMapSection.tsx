import React, { useState } from 'react';
import { Search, Binary, Check, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const RegisterMapSection: React.FC = () => {
  const { registerMap } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeBit, setActiveBit] = useState<string | null>(null);

  const query = (searchTerm || '').toLowerCase();
  const filteredMap = registerMap.filter(reg => 
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

              {/* Bitfield Grid */}
              <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {reg.bits.map((bit, bIdx) => {
                  const isSelected = activeBit === `${reg.address}-${bIdx}`;
                  return (
                    <button
                      key={bIdx}
                      onClick={() => setActiveBit(isSelected ? null : `${reg.address}-${bIdx}`)}
                      className={`text-left p-2.5 rounded border transition-all ${
                        isSelected
                          ? 'bg-[#E8A33D]/15 border-[#E8A33D] text-[#E8A33D]'
                          : 'bg-[#0D1319] border-[#1E2C38] hover:border-[#354550] text-[#E4EAEE]'
                      }`}
                    >
                      <div className="text-[10px] text-[#566470] mb-0.5 flex justify-between">
                        <span>bit[{bIdx}]</span>
                        {isSelected && <Check className="w-2.5 h-2.5 text-[#E8A33D]" />}
                      </div>
                      <div className="text-xs font-semibold truncate" title={bit}>
                        {bit}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bit detail drawer if selected */}
              {activeBit && activeBit.startsWith(reg.address) && (
                <div className="px-4 py-2.5 bg-[#080D11] border-t border-[#1E2C38] text-xs flex items-center justify-between text-[#8B99A3]">
                  <div className="flex items-center gap-2">
                    <Binary className="w-3.5 h-3.5 text-[#E8A33D]" />
                    <span>Selected Bit: <strong className="text-white">{reg.bits[parseInt(activeBit.split('-')[1])] || ''}</strong></span>
                  </div>
                  <span className="text-[#566470] text-[11px]">Hardware Verified • Production Validated</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
