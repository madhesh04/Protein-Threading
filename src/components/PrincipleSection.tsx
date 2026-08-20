import React, { useState } from 'react';
import { Dna, Layers, Sparkles, RefreshCw, GitCompare, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audio';

export const PrincipleSection: React.FC = () => {
  const [morphStep, setMorphStep] = useState<number>(0); // 0: 1D sequences separate, 1: folding into 3D, 2: superimposition

  const seqA = 'V L S P A D K T N V K A A W G K V G A H A G E Y G A E A L E R M F L S F';
  const seqB = 'G L S D G E W Q L V L N V W G K V E A D I P G H G Q E V L I R L F K G H';

  const handleStepChange = (step: number) => {
    setMorphStep(step);
    sound.playClick(500 + step * 80);
  };

  return (
    <section id="principle" className="py-20 relative border-t border-[var(--glass-border)]">
      
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <GitCompare className="w-3.5 h-3.5 text-[#00FFFF]" />
            <span className="glow-text-cyan">Evolutionary Biophysics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            The Principle: Structure Changes More Slowly Than Sequence
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            During evolution, amino-acid sequences can change considerably. However, the overall 3D fold needed for protein function is often preserved. Threading uses this principle to detect distant structural relationships that sequence alignment may miss.
          </p>
        </div>

        {/* Visual Morphing Comparison Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-8">
          
          {/* Top Subtitle & Mode Stepper */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-6">
            <div>
              <span className="text-xs font-mono text-[#FF00FF] uppercase tracking-wider glow-text-magenta">Superposition Case Study</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                Sperm Whale Myoglobin vs. Human Hemoglobin Alpha
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Only 24% sequence identity after ~450 million years of divergence, yet their 3D globin folds superimpose with an astonishing RMSD of 1.4 Å!
              </p>
            </div>

            <div className="flex items-center gap-2 glass-card p-1.5 rounded-2xl border-[var(--glass-border)] shrink-0">
              {['1. Divergent Sequences', '2. Fold 3D Backbones', '3. Superimposed Globin Fold'].map((label, idx) => (
                <button
                  key={idx}
                  onClick={() => handleStepChange(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    morphStep === idx
                      ? 'step-active font-bold shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Morphing Graphic Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Canvas Area */}
            <div className="lg:col-span-7 p-6 rounded-2xl glass-subtle flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
              
              <svg viewBox="0 0 500 240" className="w-full max-w-[460px] h-auto protein-path">
                <defs>
                  <linearGradient id="gradProteinA" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF00FF" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                  <linearGradient id="gradProteinB" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FFFF" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>

                {/* State 0: 1D Separate Lines */}
                {morphStep === 0 && (
                  <g>
                    {/* Sequence A Linear Path */}
                    <g transform="translate(0, 40)">
                      <text x="30" y="25" fill="#FF00FF" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        Protein A (Sequence Identity: 24%)
                      </text>
                      <path d="M 30,50 L 470,50" stroke="url(#gradProteinA)" strokeWidth="4" />
                      {Array.from({ length: 18 }).map((_, i) => (
                        <circle key={i} cx={30 + i * 25} cy={50} r="5" fill="#FF00FF" />
                      ))}
                    </g>

                    {/* Sequence B Linear Path */}
                    <g transform="translate(0, 130)">
                      <text x="30" y="25" fill="#00FFFF" fontSize="12" fontFamily="monospace" fontWeight="bold">
                        Protein B (Diverged &gt;400 Million Years)
                      </text>
                      <path d="M 30,50 L 470,50" stroke="url(#gradProteinB)" strokeWidth="4" />
                      {Array.from({ length: 18 }).map((_, i) => (
                        <circle key={i} cx={30 + i * 25} cy={50} r="5" fill="#00FFFF" />
                      ))}
                    </g>
                  </g>
                )}

                {/* State 1: 3D Backbones folding side by side */}
                {morphStep === 1 && (
                  <g>
                    {/* Fold A */}
                    <g transform="translate(60, 20)">
                      <text x="70" y="15" fill="#FF00FF" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        Fold A: Globin Motif
                      </text>
                      <path
                        d="M 20,40 Q 50,15 70,40 T 120,40 Q 140,80 120,120 T 70,120 Q 40,90 20,150"
                        fill="none"
                        stroke="url(#gradProteinA)"
                        strokeWidth="3.5"
                      />
                    </g>

                    {/* Fold B */}
                    <g transform="translate(280, 20)">
                      <text x="70" y="15" fill="#00FFFF" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                        Fold B: Globin Motif
                      </text>
                      <path
                        d="M 20,40 Q 50,15 70,40 T 120,40 Q 140,80 120,120 T 70,120 Q 40,90 20,150"
                        fill="none"
                        stroke="url(#gradProteinB)"
                        strokeWidth="3.5"
                      />
                    </g>
                  </g>
                )}

                {/* State 2: Superimposed identical 3D fold */}
                {morphStep === 2 && (
                  <g transform="translate(170, 25)">
                    <text x="80" y="15" fill="#32CD32" fontSize="12" fontFamily="monospace" textAnchor="middle" fontWeight="bold" className="glow-text-lime">
                      Superimposed (RMSD = 1.42 Å)
                    </text>

                    {/* Globin ribbon A */}
                    <path
                      d="M 20,40 Q 50,15 70,40 T 120,40 Q 140,80 120,120 T 70,120 Q 40,90 20,150"
                      fill="none"
                      stroke="#FF00FF"
                      strokeWidth="4"
                      opacity="0.85"
                    />

                    {/* Globin ribbon B */}
                    <path
                      d="M 22,42 Q 52,16 71,41 T 119,41 Q 139,81 121,121 T 69,119 Q 39,89 21,151"
                      fill="none"
                      stroke="#00FFFF"
                      strokeWidth="3.5"
                      opacity="0.85"
                      strokeDasharray="4 2"
                    />

                    {/* Conserved Heme / Active site Pocket */}
                    <circle cx="80" cy="80" r="14" fill="#FFBF00" opacity="0.3" />
                    <circle cx="80" cy="80" r="4" fill="#FFBF00" className="animate-ping" />
                    <text x="80" y="112" fill="#FFBF00" fontSize="9" fontFamily="monospace" textAnchor="middle">
                      Conserved Hydrophobic Pocket
                    </text>
                  </g>
                )}
              </svg>

              <div className="text-xs font-mono text-slate-300 mt-2">
                {morphStep === 0
                  ? 'Sequences appear unrelated by traditional BLAST string matching.'
                  : morphStep === 1
                  ? 'Both chains autonomously fold into identical globin alpha-helical topologies.'
                  : 'Both proteins share identical 3D pocket geometry despite 76% sequence difference!'}
              </div>
            </div>

            {/* Explanations & Core Takeaway */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-4 rounded-2xl glass-subtle space-y-2">
                <span className="text-xs font-mono text-[#00FFFF] glow-text-cyan">Sequence Alignment (1D):</span>
                <div className="font-mono text-xs text-slate-300 space-y-1 bg-black/40 p-2.5 rounded-xl border border-indigo-950/60 overflow-x-auto">
                  <div className="text-fuchsia-300">A: {seqA.slice(0, 32)}...</div>
                  <div className="text-cyan-300">B: {seqB.slice(0, 32)}...</div>
                  <div className="text-slate-400">Identity: 24.1% (Twilight Zone)</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-subtle space-y-2">
                <span className="text-xs font-mono text-[#32CD32] glow-text-lime">Structural Superposition (3D):</span>
                <div className="flex justify-between text-xs font-mono bg-black/40 p-2.5 rounded-xl border border-indigo-950/60">
                  <span className="text-slate-300">Backbone RMSD:</span>
                  <span className="text-[#32CD32] font-bold glow-text-lime">1.42 Å (Identical Fold)</span>
                </div>
              </div>

              {/* Crucial Key Concept Box */}
              <div className="p-4 rounded-2xl glass-card border-[var(--glass-border-hover)] space-y-2 shadow-lg shadow-cyan-500/10">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
                  <Sparkles className="w-4 h-4 text-[#00FFFF]" />
                  <span className="glow-text-cyan">Key Computational Insight</span>
                </div>
                <p className="text-sm font-semibold text-white leading-relaxed">
                  &ldquo;Protein threading is based on <span className="text-[#00FFFF] underline decoration-cyan-500/50 glow-text-cyan">sequence–structure compatibility</span>, not sequence similarity alone.&rdquo;
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
