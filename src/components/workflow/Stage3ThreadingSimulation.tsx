import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Sparkles, CheckCircle2, AlertCircle, HelpCircle, Layers } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage3ThreadingSimulation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [threadProgress, setThreadProgress] = useState(0); // 0 to 100
  const [speed, setSpeed] = useState<number>(1);
  const animRef = useRef<number | null>(null);

  // 12 representative positions along threading path
  const threadingPositions = [
    { id: 1, aa: 'M1', name: 'Met', type: 'hydrophobic', targetZone: 'Buried Core', targetCoord: { x: 190, y: 110 }, isCore: true, match: 'favorable' },
    { id: 2, aa: 'K2', name: 'Lys', type: 'positive', targetZone: 'Surface Solvated', targetCoord: { x: 130, y: 55 }, isCore: false, match: 'favorable' },
    { id: 3, aa: 'T3', name: 'Thr', type: 'hydrophilic', targetZone: 'Surface Turn', targetCoord: { x: 160, y: 40 }, isCore: false, match: 'favorable' },
    { id: 4, aa: 'A4', name: 'Ala', type: 'hydrophobic', targetZone: 'Helix Interface', targetCoord: { x: 210, y: 70 }, isCore: true, match: 'favorable' },
    { id: 5, aa: 'V5', name: 'Val', type: 'hydrophobic', targetZone: 'Deep Core', targetCoord: { x: 200, y: 130 }, isCore: true, match: 'favorable' },
    { id: 6, aa: 'L6', name: 'Leu', type: 'hydrophobic', targetZone: 'Deep Core', targetCoord: { x: 230, y: 120 }, isCore: true, match: 'favorable' },
    { id: 7, aa: 'I7', name: 'Ile', type: 'hydrophobic', targetZone: 'Hydrophobic Pocket', targetCoord: { x: 250, y: 95 }, isCore: true, match: 'favorable' },
    { id: 8, aa: 'G8', name: 'Gly', type: 'special', targetZone: 'Flexible Loop Gap', targetCoord: { x: 280, y: 50 }, isCore: false, match: 'loop' },
    { id: 9, aa: 'D9', name: 'Asp', type: 'negative', targetZone: 'Polar Surface (Salt Bridge)', targetCoord: { x: 310, y: 65 }, isCore: false, match: 'favorable' },
    { id: 10, aa: 'E10', name: 'Glu', type: 'negative', targetZone: 'Exterior Solvent', targetCoord: { x: 330, y: 110 }, isCore: false, match: 'favorable' },
    { id: 11, aa: 'F11', name: 'Phe', type: 'hydrophobic', targetZone: 'Aromatic Core Lock', targetCoord: { x: 270, y: 140 }, isCore: true, match: 'favorable' },
    { id: 12, aa: 'R12', name: 'Arg', type: 'positive', targetZone: 'Hydrated Surface', targetCoord: { x: 340, y: 145 }, isCore: false, match: 'favorable' },
  ];

  const currentStep = Math.min(
    Math.floor((threadProgress / 100) * threadingPositions.length),
    threadingPositions.length - 1
  );

  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();
    const update = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      setThreadProgress((prev) => {
        const next = prev + delta * 18 * speed;
        if (next >= 100) {
          return 0; // loop
        }
        return next;
      });

      animRef.current = requestAnimationFrame(update);
    };

    animRef.current = requestAnimationFrame(update);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, speed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    sound.playClick(500);
  };

  const handleReset = () => {
    setThreadProgress(0);
    sound.playClick(400);
  };

  const activeResidue = threadingPositions[currentStep];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#FF00FF] uppercase tracking-wider glow-text-magenta">Step 3 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Thread Sequence Through Each Template</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The sequence is aligned with positions in each structural template. This is called &ldquo;threading&rdquo; because the sequence is fitted through the backbone framework of a known fold.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-2 rounded-xl glass-subtle border-[var(--glass-border-hover)] text-cyan-300 shrink-0 font-bold shadow-sm">
          Question: How well does this sequence fit this structure?
        </div>
      </div>

      {/* Main Threading Canvas & Simulation Stage */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF00FF] to-[#00FFFF] text-white font-mono text-xs font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Threading' : 'Resume Threading'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2 rounded-xl glass-subtle border-[var(--glass-border)] text-slate-300 hover:text-white transition-all"
              title="Reset Threading"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-300">Speed:</span>
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-1 rounded-lg border transition-all ${
                  speed === s
                    ? 'step-active font-bold shadow-sm'
                    : 'glass-subtle text-slate-400 border-[var(--glass-border)]'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-300">
            Residue: <strong className="text-[#00FFFF] glow-text-cyan">#{currentStep + 1} / {threadingPositions.length}</strong> ({activeResidue.name})
          </div>
        </div>

        {/* 2D Interactive Threading Canvas Graphic */}
        <div className="relative w-full h-[320px] bg-black/40 rounded-2xl border border-[var(--glass-border)] overflow-hidden flex items-center justify-center">
          
          {/* Spatial Labels */}
          <div className="absolute top-3 left-4 text-[11px] font-mono px-2.5 py-1 rounded-lg glass-subtle border border-cyan-500/40 text-cyan-300">
            Solvent Exposed Outer Shell (Hydrophilic / Charged)
          </div>
          <div className="absolute bottom-3 left-4 text-[11px] font-mono px-2.5 py-1 rounded-lg glass-subtle border border-amber-500/40 text-amber-300">
            Internal Hydrophobic Core (Buried Non-Polar)
          </div>

          <svg viewBox="0 0 500 240" className="w-full h-full">
            <defs>
              {/* Radial gradient for hydrophobic core zone */}
              <radialGradient id="coreZoneGrad" cx="50%" cy="55%" r="40%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
                <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="threadLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF00FF" />
                <stop offset="50%" stopColor="#00FFFF" />
                <stop offset="100%" stopColor="#32CD32" />
              </linearGradient>
            </defs>

            {/* Core zone highlight */}
            <ellipse cx="230" cy="115" rx="110" ry="60" fill="url(#coreZoneGrad)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />
            <text x="230" y="118" fill="#FFBF00" fontSize="10" fontFamily="monospace" textAnchor="middle" opacity="0.8">
              HYDROPHOBIC CORE
            </text>

            {/* Template backbone wireframe skeleton */}
            <path
              d="M 60,70 Q 110,20 160,40 T 230,70 T 310,65 Q 370,80 420,130 T 450,180"
              fill="none"
              stroke="#00FFFF"
              strokeWidth="3"
              opacity="0.4"
            />
            <path
              d="M 120,130 Q 180,165 240,140 T 350,150 T 430,190"
              fill="none"
              stroke="#00FFFF"
              strokeWidth="3"
              opacity="0.3"
              strokeDasharray="4 4"
            />

            {/* Woven Threading Sequence Path */}
            <path
              d="M 60,70 Q 100,50 130,55 T 160,40 T 210,70 Q 200,110 200,130 T 230,120 T 250,95 Q 270,60 280,50 T 310,65 T 330,110 T 270,140 T 340,145 T 440,160"
              fill="none"
              stroke="url(#threadLineGrad)"
              strokeWidth="3.5"
            />

            {/* Static Slot Target Points */}
            {threadingPositions.map((pos, idx) => {
              const isPassed = idx <= currentStep;
              return (
                <g key={pos.id}>
                  {/* Slot Target Ring */}
                  <circle
                    cx={pos.targetCoord.x}
                    cy={pos.targetCoord.y}
                    r={pos.isCore ? 9 : 7}
                    fill={isPassed ? (pos.isCore ? '#f59e0b' : '#00FFFF') : '#1e1b4b'}
                    stroke={pos.isCore ? '#fbbf24' : '#22d3ee'}
                    strokeWidth={idx === currentStep ? '3' : '1.5'}
                    opacity={isPassed ? 1 : 0.4}
                  />
                  <text
                    x={pos.targetCoord.x}
                    y={pos.targetCoord.y + 3.5}
                    fill="#ffffff"
                    fontSize="8"
                    fontFamily="monospace"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {pos.aa.slice(0, 1)}
                  </text>
                </g>
              );
            })}

            {/* Live Threading Leader Bead */}
            {activeResidue && (
              <g className="animate-pulse">
                <circle
                  cx={activeResidue.targetCoord.x}
                  cy={activeResidue.targetCoord.y}
                  r="14"
                  fill="none"
                  stroke="#FF00FF"
                  strokeWidth="2.5"
                />
                <circle
                  cx={activeResidue.targetCoord.x}
                  cy={activeResidue.targetCoord.y}
                  r="18"
                  fill="none"
                  stroke="#00FFFF"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              </g>
            )}
          </svg>
        </div>

        {/* Live Placement Analysis Box */}
        <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${
                activeResidue.isCore
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
              }`}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400">Active Threading Assessment</span>
              <h5 className="font-bold text-white text-base font-display">
                Residue {activeResidue.name} #{activeResidue.id} ➔ {activeResidue.targetZone}
              </h5>
            </div>
          </div>

          <div className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-lime-500/15 border border-lime-500/30 text-lime-300 font-semibold glow-text-lime">
            ✓ Physical Compatibility Satisfied
          </div>
        </div>

        {/* 4 Physical Principles in Threading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl glass-subtle border border-amber-500/30 space-y-1">
            <strong className="text-amber-300 block font-mono">1. Hydrophobic Burial</strong>
            <p className="text-slate-300 text-[11px]">Non-polar residues (Leu, Val, Ile) pack tightly inside the water-excluding core.</p>
          </div>
          <div className="p-3 rounded-xl glass-subtle border border-cyan-500/30 space-y-1">
            <strong className="text-cyan-300 block font-mono">2. Hydrophilic Exposure</strong>
            <p className="text-slate-300 text-[11px]">Polar residues (Ser, Thr, Asn) project outward to interact favorably with water.</p>
          </div>
          <div className="p-3 rounded-xl glass-subtle border border-blue-500/30 space-y-1">
            <strong className="text-blue-300 block font-mono">3. Charge Pairing</strong>
            <p className="text-slate-300 text-[11px]">Oppositely charged pairs (Lys+ / Asp-) form stabilizing salt bridges.</p>
          </div>
          <div className="p-3 rounded-xl glass-subtle border border-purple-500/30 space-y-1">
            <strong className="text-purple-300 block font-mono">4. Gap & Loop Modeling</strong>
            <p className="text-slate-300 text-[11px]">Insertions and deletions are accommodated as flexible loop extensions.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
