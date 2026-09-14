import React, { useState, useEffect, useRef } from 'react';
import { Activity, Play, Pause, RefreshCw, Cpu, Layers, Info, CheckCircle2 } from 'lucide-react';
import { CAN_FRAMES_DEMO } from '../data/portfolioData';
import { CanFrame } from '../types';

export const CanBusVisualizer: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<CanFrame>(CAN_FRAMES_DEMO[0]);
  const [isRunning, setIsRunning] = useState(true);
  const [activeByteIndex, setActiveByteIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  // Draw oscilloscope waveform on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 700;
    canvas.width = width;
    canvas.height = 140;

    const render = () => {
      ctx.fillStyle = '#0B1015';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = '#1C2731';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 35) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Volt scale markings
      ctx.fillStyle = '#566470';
      ctx.font = '10px monospace';
      ctx.fillText('3.5V (CAN_H Dominant)', 10, 25);
      ctx.fillText('2.5V (Recessive Bus Idle)', 10, 68);
      ctx.fillText('1.5V (CAN_L Dominant)', 10, 115);

      if (isRunning) {
        offsetRef.current = (offsetRef.current + 2) % 40;
      }

      // Generate realistic square digital pulse pattern based on the selected frame's bytes
      const bitString = selectedFrame.dataBytes.map(b => parseInt(b, 16).toString(2).padStart(8, '0')).join('');
      const bitWidth = 24;

      // Draw CAN_H line (Gold/Amber)
      ctx.strokeStyle = '#E8A33D';
      ctx.lineWidth = 2;
      ctx.beginPath();

      let startX = -(offsetRef.current);
      let bitIdx = 0;

      while (startX < canvas.width + 40) {
        const bit = bitString[bitIdx % bitString.length] === '0'; // 0 is dominant in CAN
        const yVal = bit ? 30 : 65; // Dominant 3.5V vs Recessive 2.5V
        
        if (startX === -(offsetRef.current)) {
          ctx.moveTo(startX, yVal);
        } else {
          ctx.lineTo(startX, yVal);
        }
        ctx.lineTo(startX + bitWidth, yVal);
        startX += bitWidth;
        bitIdx++;
      }
      ctx.stroke();

      // Draw CAN_L line (Teal/Cyan)
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      ctx.beginPath();

      startX = -(offsetRef.current);
      bitIdx = 0;

      while (startX < canvas.width + 40) {
        const bit = bitString[bitIdx % bitString.length] === '0';
        const yVal = bit ? 105 : 65; // Dominant 1.5V vs Recessive 2.5V

        if (startX === -(offsetRef.current)) {
          ctx.moveTo(startX, yVal);
        } else {
          ctx.lineTo(startX, yVal);
        }
        ctx.lineTo(startX + bitWidth, yVal);
        startX += bitWidth;
        bitIdx++;
      }
      ctx.stroke();

      if (isRunning) {
        animFrameId.current = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedFrame, isRunning]);

  return (
    <section id="canbus" className="py-16 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#E8A33D] uppercase tracking-wider mb-1">
              <span>Section 2.0</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D]"></span>
              <span>Interactive Telematics Demonstration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white">
              CAN Bus &amp; Logic Protocol Analyzer
            </h2>
          </div>
          <p className="text-xs font-mono text-[#8B99A3] max-w-md">
            Simulated differential signal transceiver and byte-level frame unpacker designed for automotive ECU diagnostics.
          </p>
        </div>

        {/* Protocol Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CAN_FRAMES_DEMO.map((frame) => (
            <button
              key={frame.id}
              onClick={() => {
                setSelectedFrame(frame);
                setActiveByteIndex(null);
              }}
              className={`px-3 py-2 rounded text-xs font-mono transition-all text-left flex flex-col ${
                selectedFrame.id === frame.id
                  ? 'bg-[#E8A33D] text-[#0B1015] font-semibold shadow-md'
                  : 'bg-[#10171E] text-[#8B99A3] hover:text-[#E4EAEE] border border-[#233039] hover:border-[#354550]'
              }`}
            >
              <span className="text-[11px] opacity-90">{frame.protocol}</span>
              <span className="text-xs font-medium truncate max-w-[200px]">{frame.name}</span>
            </button>
          ))}
        </div>

        {/* Live Oscilloscope / Logic Canvas */}
        <div className="bg-[#10171E] border border-[#233039] rounded-lg overflow-hidden shadow-xl mb-6">
          
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0D1319] border-b border-[#233039] text-xs font-mono gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[#E8A33D]">
                <Activity className="w-4 h-4 animate-pulse" />
                <span className="font-semibold">CH1: CAN_H (3.5V)</span>
              </div>
              <span className="text-[#354550]">|</span>
              <div className="flex items-center gap-1.5 text-[#38BDF8]">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
                <span className="font-semibold">CH2: CAN_L (1.5V)</span>
              </div>
              <span className="text-[#354550] hidden sm:inline">|</span>
              <span className="text-[#8B99A3] hidden sm:inline">Diff: 2.0V Dominant</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16202A] hover:bg-[#233039] text-xs text-[#E4EAEE] border border-[#233039] transition-colors"
              >
                {isRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isRunning ? 'Pause Sweep' : 'Resume Sweep'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 bg-[#0B1015]">
            <canvas ref={canvasRef} className="w-full block rounded bg-[#0B1015] border border-[#16202A]" />
          </div>

          <div className="px-4 py-2 bg-[#0D1319] border-t border-[#1C2731] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8B99A3]">
            <span>Timebase: 2.0µs/div • CAN 2.0B Differential Transceiver Mode</span>
            <span>Sample Rate: 50MS/s • Active Bit rate: 500 kbit/s</span>
          </div>
        </div>

        {/* Frame Dissection & Byte Inspector */}
        <div className="bg-[#10171E] border border-[#233039] rounded-lg p-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-[#233039]">
            <div>
              <span className="text-[11px] font-mono text-[#E8A33D] block uppercase">
                Active Protocol Dissection
              </span>
              <h3 className="text-lg font-bold font-mono text-white">
                {selectedFrame.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#16202A] text-[#E8A33D] border border-[#233039]">
                ID: {selectedFrame.arbitrationId}
              </span>
              <span className="px-2 py-1 rounded bg-[#16202A] text-[#8B99A3] border border-[#233039]">
                DLC: {selectedFrame.dlc} Bytes
              </span>
            </div>
          </div>

          {/* Hex Byte Stream Buttons */}
          <div className="mb-4">
            <label className="block text-xs font-mono text-[#8B99A3] mb-2">
              Payload Bytes (Click any byte to inspect raw bit decoding):
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {selectedFrame.dataBytes.map((hexByte, idx) => {
                const isSelected = activeByteIndex === idx;
                const decimalVal = parseInt(hexByte, 16);
                const binaryVal = decimalVal.toString(2).padStart(8, '0');

                return (
                  <button
                    key={idx}
                    onClick={() => setActiveByteIndex(isSelected ? null : idx)}
                    className={`p-2.5 rounded border font-mono text-center transition-all ${
                      isSelected
                        ? 'bg-[#E8A33D]/20 border-[#E8A33D] text-white ring-1 ring-[#E8A33D]'
                        : 'bg-[#0D1319] border-[#233039] text-[#E4EAEE] hover:border-[#354550]'
                    }`}
                  >
                    <div className="text-[10px] text-[#566470] mb-0.5">BYTE {idx}</div>
                    <div className="text-base font-bold text-[#E8A33D]">0x{hexByte}</div>
                    <div className="text-[10px] text-[#8B99A3] font-mono">{decimalVal}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interpretation Details Card */}
          <div className="p-3.5 rounded bg-[#0D1319] border border-[#233039] font-mono text-xs">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#E8A33D] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#E8A33D] font-semibold">ECU Diagnostic Interpretation:</span>
                <p className="text-[#B4C2CC] mt-1 leading-relaxed">
                  {selectedFrame.interpretation}
                </p>
                {activeByteIndex !== null && (
                  <div className="mt-2.5 pt-2 border-t border-[#1C2731] text-[11px] text-[#8B99A3]">
                    <span className="text-white font-medium">Selected Byte {activeByteIndex}: </span>
                    <code className="text-[#E8A33D]">0x{selectedFrame.dataBytes[activeByteIndex]}</code> = 
                    <span className="text-[#38BDF8]"> {parseInt(selectedFrame.dataBytes[activeByteIndex], 16).toString(2).padStart(8, '0')}b </span>
                    (Dec: {parseInt(selectedFrame.dataBytes[activeByteIndex], 16)})
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
