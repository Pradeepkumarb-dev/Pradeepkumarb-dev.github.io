import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export const CanBusVisualizer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [sweepSpeed, setSweepSpeed] = useState<number>(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const offsetRef = useRef<number>(0);

  // Pure CAN Differential Bitstream:
  // In CAN 2.0B / High-Speed CAN:
  // - Recessive bit '1': CAN High and CAN Low both stay at 2.5V (Vdiff = 0V)
  // - Dominant bit '0': CAN High drives to 3.5V, CAN Low drives to 1.5V (Vdiff = 2.0V)
  const canBitStream = '0011111011110001000000000100000001110000000000000000000010101101100101111111111';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = 140;
      }
    };
    updateDimensions();

    const render = () => {
      ctx.fillStyle = '#0B1015';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Oscilloscope background grid
      ctx.strokeStyle = '#16202A';
      ctx.lineWidth = 1;
      const stepX = 40;
      const stepY = 28;

      for (let x = 0; x < canvas.width; x += stepX) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += stepY) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Clear voltage levels on scope
      ctx.fillStyle = '#6E7C87';
      ctx.font = '10px monospace';
      ctx.fillText('CAN High (3.5V Dominant)', 10, 22);
      ctx.fillText('Recessive Baseline (2.5V)', 10, 70);
      ctx.fillText('CAN Low (1.5V Dominant)', 10, 122);

      // Center baseline reference line at 2.5V
      ctx.strokeStyle = '#233039';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, 68);
      ctx.lineTo(canvas.width, 68);
      ctx.stroke();
      ctx.setLineDash([]);

      if (isRunning) {
        offsetRef.current = (offsetRef.current + sweepSpeed) % 1200;
      }

      const bitWidth = 28;
      const totalStreamLen = canBitStream.length;

      // ----------------------------------------------------
      // WAVEFORM 1: CAN High (Amber / Orange)
      // Dominant ('0') -> pulls up to 3.5V (Y = 28)
      // Recessive ('1') -> stays at 2.5V (Y = 68)
      // ----------------------------------------------------
      ctx.strokeStyle = '#E8A33D';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      let startX = -(offsetRef.current % (bitWidth * totalStreamLen));
      let bitIdx = 0;

      while (startX < canvas.width + bitWidth * 2) {
        const bit = canBitStream[bitIdx % totalStreamLen];
        const isDominant = bit === '0';
        const y = isDominant ? 28 : 68;

        if (startX === -(offsetRef.current % (bitWidth * totalStreamLen))) {
          ctx.moveTo(startX, y);
        } else {
          ctx.lineTo(startX, y);
        }
        ctx.lineTo(startX + bitWidth, y);

        const nextBit = canBitStream[(bitIdx + 1) % totalStreamLen];
        const nextIsDominant = nextBit === '0';
        if (isDominant !== nextIsDominant) {
          ctx.lineTo(startX + bitWidth, nextIsDominant ? 28 : 68);
        }

        startX += bitWidth;
        bitIdx++;
      }
      ctx.stroke();

      // ----------------------------------------------------
      // WAVEFORM 2: CAN Low (Sky Blue)
      // Dominant ('0') -> pulls down to 1.5V (Y = 108)
      // Recessive ('1') -> stays at 2.5V (Y = 68)
      // ----------------------------------------------------
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      startX = -(offsetRef.current % (bitWidth * totalStreamLen));
      bitIdx = 0;

      while (startX < canvas.width + bitWidth * 2) {
        const bit = canBitStream[bitIdx % totalStreamLen];
        const isDominant = bit === '0';
        const y = isDominant ? 108 : 68;

        if (startX === -(offsetRef.current % (bitWidth * totalStreamLen))) {
          ctx.moveTo(startX, y);
        } else {
          ctx.lineTo(startX, y);
        }
        ctx.lineTo(startX + bitWidth, y);

        const nextBit = canBitStream[(bitIdx + 1) % totalStreamLen];
        const nextIsDominant = nextBit === '0';
        if (isDominant !== nextIsDominant) {
          ctx.lineTo(startX + bitWidth, nextIsDominant ? 108 : 68);
        }

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
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRunning, sweepSpeed]);

  return (
    <section id="waveforms" className="py-8 border-b border-[#233039]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Oscilloscope Container */}
        <div className="bg-[#10171E] border border-[#233039] rounded-xl overflow-hidden shadow-2xl">
          
          {/* Top Scope Control Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-[#0D1319] border-b border-[#233039] text-xs font-mono gap-3">
            
            {/* The 2 CAN Waveforms: CAN High & CAN Low */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#E8A33D]/10 text-[#E8A33D] font-bold border border-[#E8A33D]/30">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D] shadow-sm"></span>
                <span>CAN High (CAN_H)</span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] font-bold border border-[#38BDF8]/30">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8] shadow-sm"></span>
                <span>CAN Low (CAN_L)</span>
              </div>
            </div>

            {/* Sweep & Speed Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[11px] text-[#8B99A3] mr-1">
                <span>Speed:</span>
                {[1, 2, 4].map(spd => (
                  <button
                    key={spd}
                    onClick={() => setSweepSpeed(spd)}
                    className={`px-2 py-0.5 rounded transition-all ${
                      sweepSpeed === spd ? 'bg-[#E8A33D] text-[#0B1015] font-bold' : 'bg-[#16202A] text-[#8B99A3] hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#16202A] hover:bg-[#233039] text-[#E4EAEE] border border-[#233039] transition-colors"
                title={isRunning ? 'Pause waveform' : 'Run waveform'}
              >
                {isRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isRunning ? 'Pause' : 'Run'}</span>
              </button>
            </div>
          </div>

          {/* Canvas Waveform Display */}
          <div className="p-3 bg-[#0B1015]">
            <canvas ref={canvasRef} className="w-full block rounded bg-[#0B1015] border border-[#16202A]" />
          </div>

          {/* Bottom Differential Waveform Telemetry */}
          <div className="px-4 py-2 bg-[#0D1319] border-t border-[#1C2731] flex flex-wrap items-center justify-between text-[11px] font-mono text-[#8B99A3] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CAN Differential Waveform • Dominant: CAN High = 3.5V, CAN Low = 1.5V • Recessive: 2.5V Baseline</span>
            </div>
            <span>Vdiff = CAN_H - CAN_L = 2.0V</span>
          </div>

        </div>

      </div>
    </section>
  );
};
