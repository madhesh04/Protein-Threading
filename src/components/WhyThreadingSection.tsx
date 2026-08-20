import React, { useState } from 'react';
import { Search, AlertTriangle, Sparkles, Check, ArrowRight, Dna, Layers, RotateCcw } from 'lucide-react';
import { sound } from '../utils/audio';

export const WhyThreadingSection: React.FC = () => {
  const [divergenceLevel, setDivergenceLevel] = useState<number>(65); // 0% to 100% mutation
  const [activeStep, setActiveStep] = useState<number>(4);

  const baseSequence = 'M K T A V L I G D E F R W Q N H P S C Y A L I K';
  const sequences = [
    'M K T A V L I G D E F R W Q N H P S C Y A L I K', // Ancestral (100% ID)
    'M K S A I L V G D D F K W Q N H A T C F A V I R', // 75% ID
    'L R T G V M I A E E Y R Y Q K S P S S W V L L K', // 45% ID
    'A P Q A L L T G D Q W K F K D N T G N Y I L I E', // 20% ID (Twilight Zone)
    'V N S S I V V G N N F S W R D H S A C L V A L K', // 12% ID (Extreme Divergence)
  ];

  const currentSeqIdx = Math.min(Math.floor(divergenceLevel / 25), sequences.length - 1);
  const currentSeq = sequences[currentSeqIdx];

  const steps = [
    {
      num: 1,
      title: 'Target Sequence Input',
      desc: 'Uncharacterized protein isolated from newly sequenced genome.',
      status: 'complete',
    },
    {
      num: 2,
      title: 'Direct Sequence Search (BLAST)',
      desc: 'Scanning UniProt/PDB databases for homologous sequences.',
      status: 'complete',
    },
    {
      num: 3,
      title: 'Search Result: Twilight Zone',
      desc: 'Max sequence identity is only 17.4%. No direct structural match found.',
      status: 'failed',
    },
    {
      num: 4,
      title: 'Deploy Fold Recognition',
      desc: 'Threading algorithm tests sequence compatibility across 3D scaffolds.',
      status: 'active',
    },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDivergenceLevel(Number(e.target.value));
    sound.playClick(400 + Number(e.target.value) * 3);
  };

  return (
    <section id="why-needed" className="py-20 relative border-t border-[var(--glass-border)]">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF00FF]" />
            <span className="glow-text-magenta">The Twilight Zone Challenge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Why Is Protein Threading Needed?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Sequence alignment works wonderfully when two proteins are closely related. But when evolutionary divergence obscures the sequence letters, conventional tools hit a dead end.
          </p>
        </div>

        {/* 4-Step Challenge Scenario Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
          {steps.map((step) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(step.num)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                step.status === 'failed'
                  ? 'bg-rose-950/30 border-rose-500/50 text-rose-300 shadow-md shadow-rose-500/10 backdrop-blur-md'
                  : step.status === 'active'
                  ? 'bg-cyan-950/40 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20 backdrop-blur-md'
                  : 'glass-card text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono px-2 py-0.5 rounded-md glass-subtle text-slate-300 border border-slate-700">
                  Step {step.num}
                </span>
                {step.status === 'failed' ? (
                  <span className="text-xs font-mono text-rose-400 font-bold glow-text-coral">No Match</span>
                ) : step.status === 'active' ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00FFFF] animate-ping" />
                ) : (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <h3 className="font-bold text-white text-base mb-1 font-display">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* The Twilight Zone & Sequence vs Structure Divergence Lab */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider glow-text-amber">Evolutionary Principle</span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Structure Is Far More Conserved Than Sequence
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Two proteins may share <span className="text-rose-400 font-semibold">less than 20% sequence identity</span> through millions of years of mutation, yet preserve the <span className="text-[#32CD32] font-semibold glow-text-lime">exact same 3D backbone fold</span>!
              </p>
            </div>

            {/* Glowing Action Box */}
            <div className="px-5 py-3 rounded-2xl glass-card border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-3 shadow-md shadow-cyan-500/10">
              <Sparkles className="w-4 h-4 text-[#00FFFF] animate-spin" />
              <span className="glow-text-cyan">Solution: Try Fold Recognition</span>
            </div>
          </div>

          {/* Interactive Sequence Mutation Simulator */}
          <div className="space-y-6">
            
            {/* Slider Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-300 flex items-center gap-2">
                  <Dna className="w-4 h-4 text-[#FF00FF]" />
                  Evolutionary Sequence Divergence Slider:
                </span>
                <span className="px-2.5 py-1 rounded-md glass-card text-cyan-300 font-bold border-cyan-500/30">
                  {divergenceLevel}% Diverged ({(100 - divergenceLevel).toFixed(0)}% Identity)
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={divergenceLevel}
                onChange={handleSliderChange}
                className="w-full h-2 bg-indigo-950/80 rounded-lg appearance-none cursor-pointer accent-[#00FFFF]"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>0% Divergence (Homologous Ancestor)</span>
                <span className="text-rose-400">Twilight Zone (&lt; 25% Identity)</span>
                <span>100% Divergence (Distant Phyla)</span>
              </div>
            </div>

            {/* Sequence Mutation vs Structure Stability View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Mutating Sequence Letters */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl glass-subtle space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-fuchsia-400">Amino Acid Sequence (Linear 1D):</span>
                    <span className="text-slate-400">Mutating Residues</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-black/40 font-mono text-sm border border-indigo-950/60">
                    {currentSeq.split(' ').map((char, i) => {
                      const isMutated = baseSequence.split(' ')[i] !== char;
                      return (
                        <span
                          key={i}
                          className={`w-7 h-8 flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${
                            isMutated
                              ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 scale-105 shadow-sm shadow-rose-500/20'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                    <span>
                      {currentSeqIdx >= 3 ? (
                        <span className="text-rose-400 font-semibold">❌ BLAST: 0 Significant Matches Found</span>
                      ) : (
                        <span className="text-emerald-400">✓ BLAST: Close Relatives Detected</span>
                      )}
                    </span>
                    <span className="text-slate-400">{currentSeq.replace(/ /g, '').length} Residues</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl glass-card text-xs text-slate-300 leading-relaxed">
                  <strong>The Discovery:</strong> While point mutations swap non-critical outer amino acids, the internal hydrophobic packing core (e.g. Leu, Ile, Val) and backbone hydrogen bonds keep the overall 3D fold geometry rock-solid.
                </div>
              </div>

              {/* Stabilized 3D Backbone Silhouette */}
              <div className="lg:col-span-6 p-6 rounded-2xl glass-card flex flex-col items-center justify-center relative min-h-[220px]">
                <div className="absolute top-3 left-3 text-xs font-mono text-[#32CD32] flex items-center gap-1.5 glow-text-lime">
                  <Layers className="w-3.5 h-3.5" />
                  <span>3D Backbone Fold (Conserved Topology)</span>
                </div>

                <svg viewBox="0 0 300 160" className="w-full max-w-[280px] h-auto my-2 protein-path">
                  <defs>
                    <linearGradient id="foldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#32CD32" />
                      <stop offset="50%" stopColor="#00FFFF" />
                      <stop offset="100%" stopColor="#FF00FF" />
                    </linearGradient>
                  </defs>

                  {/* Stable 4-helix bundle shape that never falls apart */}
                  <g stroke="url(#foldGlow)" strokeWidth="3" fill="none">
                    <path d="M 50,30 Q 70,80 50,130" strokeDasharray="3 3" />
                    <path d="M 110,30 Q 90,80 110,130" />
                    <path d="M 180,30 Q 200,80 180,130" strokeDasharray="3 3" />
                    <path d="M 240,30 Q 220,80 240,130" />
                    {/* Connecting loops */}
                    <path d="M 50,130 Q 80,150 110,130" stroke="#a855f7" strokeWidth="2" />
                    <path d="M 110,30 Q 145,10 180,30" stroke="#a855f7" strokeWidth="2" />
                    <path d="M 180,130 Q 210,150 240,130" stroke="#a855f7" strokeWidth="2" />
                  </g>

                  {/* Hydrophobic core dots */}
                  {[
                    { cx: 80, cy: 75 },
                    { cx: 145, cy: 65 },
                    { cx: 210, cy: 75 },
                    { cx: 145, cy: 95 },
                  ].map((p, i) => (
                    <circle key={i} cx={p.cx} cy={p.cy} r="5" fill="#FFBF00" className="animate-pulse" />
                  ))}
                </svg>

                <div className="flex items-center gap-3 text-xs font-mono mt-2">
                  <span className="text-lime-300">RMSD: 1.42 Å (Invariant Fold)</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-300">Core Pack: 96% Stable</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
