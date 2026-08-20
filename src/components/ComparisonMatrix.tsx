import React, { useState } from 'react';
import { Users, Key, Hammer, Check, Sparkles, Scale, Zap, Info } from 'lucide-react';
import { sound } from '../utils/audio';

export const ComparisonMatrix: React.FC = () => {
  const [activeApproach, setActiveApproach] = useState<number>(1); // default to Threading

  const approaches = [
    {
      id: 0,
      title: 'Homology Modeling',
      subtitle: 'Comparative Structure Modeling',
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
      bestWhen: 'A close relative with a known structure exists in PDB (> 30% sequence identity).',
      mainIdea: 'Similar sequence → similar structure.',
      metaphor: 'Finding a close family member: Copying an identical blueprint with small family variations.',
      identityThreshold: '> 30% Sequence Identity',
      accuracy: 'High (1.0 - 2.0 Å RMSD for core)',
      computationCost: 'Fast (seconds to minutes)',
      classicTools: 'MODELLER, SWISS-MODEL, HHpred',
      strength: 'Extremely accurate when high-identity templates exist.',
      weakness: 'Completely helpless in the sequence Twilight Zone (< 20% identity).',
    },
    {
      id: 1,
      title: 'Protein Threading',
      subtitle: 'Fold Recognition',
      icon: <Key className="w-6 h-6 text-fuchsia-400" />,
      color: 'border-fuchsia-500/70 bg-fuchsia-950/30 text-fuchsia-300 shadow-xl shadow-fuchsia-950/40',
      bestWhen: 'No close sequence relative exists, but the protein may still match a known fold.',
      mainIdea: 'Compatible sequence–structure fit → likely fold.',
      metaphor: 'Trying a key in many locks: Weaving a string through pre-built structural scaffolds.',
      identityThreshold: '10% – 25% (Twilight Zone)',
      accuracy: 'Medium-High (2.0 - 3.5 Å RMSD for correct fold topology)',
      computationCost: 'Moderate (minutes per target)',
      classicTools: 'I-TASSER, MUSTER, PROSPECT, GenTHREADER, RaptorX',
      strength: 'Bypasses low sequence identity by scoring 3D physical compatibility against 200,000+ known folds.',
      weakness: 'Cannot predict an entirely novel fold never seen before in nature.',
      isHero: true,
    },
    {
      id: 2,
      title: 'Ab Initio / De Novo',
      subtitle: 'First-Principles Modeling',
      icon: <Hammer className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
      bestWhen: 'No suitable structural template exists anywhere in the known universe.',
      mainIdea: 'Predict structure from physical principles and sequence information.',
      metaphor: 'Building from scratch: Assembling a sculpture brick-by-brick from basic thermodynamic laws.',
      identityThreshold: '0% Template Required',
      accuracy: 'Variable (high with modern co-evolution ML like AlphaFold/RoseTTAFold)',
      computationCost: 'Intensive (hours to GPU days)',
      classicTools: 'Rosetta, QUARK, AlphaFold2/3, ESMFold',
      strength: 'Can discover entirely novel, never-before-seen protein folds.',
      weakness: 'Computationally demanding; sensitive to shallow multiple sequence alignments.',
    },
  ];

  const handleSelect = (idx: number) => {
    setActiveApproach(idx);
    sound.playClick(500 + idx * 70);
  };

  return (
    <section id="comparison" className="py-20 relative border-t border-[var(--glass-border)]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300 text-xs font-mono">
            <Scale className="w-3.5 h-3.5 text-[#FF00FF]" />
            <span className="glow-text-magenta">Structural Prediction Landscape</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Compare Structure Prediction Approaches
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Structural biologists choose prediction methods based on available evolutionary information and sequence similarity thresholds.
          </p>
        </div>

        {/* 3-Column Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {approaches.map((app, idx) => {
            const isSelected = activeApproach === idx;
            return (
              <div
                key={app.id}
                onClick={() => handleSelect(idx)}
                className={`p-6 sm:p-7 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-6 backdrop-blur-xl ${
                  isSelected
                    ? 'glass-panel border-cyan-400/80 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                    : 'glass-card border-[var(--glass-border)] hover:border-slate-500'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl glass-subtle border-[var(--glass-border)] shadow-md">
                      {app.icon}
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-full glass-subtle border border-slate-700 text-slate-200">
                      {app.identityThreshold}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      {app.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-white font-display mt-0.5">{app.title}</h3>
                  </div>

                  {/* Best When Banner */}
                  <div className="p-3 rounded-xl glass-subtle border-[var(--glass-border)] text-xs space-y-1">
                    <strong className="text-white block font-mono">Best When:</strong>
                    <p className="text-slate-300 leading-relaxed">{app.bestWhen}</p>
                  </div>

                  {/* Main Idea Banner */}
                  <div className="p-3 rounded-xl glass-subtle border-[var(--glass-border)] text-sm font-semibold text-white">
                    &ldquo;{app.mainIdea}&rdquo;
                  </div>

                  {/* Mental Analogy Box */}
                  <div className="text-xs text-slate-300 space-y-1">
                    <span className="text-slate-400 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Visual Metaphor:
                    </span>
                    <p className="italic text-slate-200">{app.metaphor}</p>
                  </div>
                </div>

                {/* Quantitative Footnote */}
                <div className="pt-4 border-t border-[var(--glass-border)] space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Representative Tools:</span>
                    <span className="text-white font-bold">{app.classicTools}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expected Accuracy:</span>
                    <span className="text-[#00FFFF] font-bold glow-text-cyan">{app.accuracy}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Summary Box */}
        <div className="p-6 rounded-3xl glass-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-bold text-white text-base font-display">Where Threading Shines</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Threading bridges the massive gap between <strong className="text-[#00FFFF]">homology modeling</strong> (which requires high sequence identity) and <strong className="text-[#FFBF00]">ab initio modeling</strong> (which requires vast computational power and physical simulations).
            </p>
          </div>

          <div className="px-5 py-3 rounded-2xl glass-card border-[var(--glass-border-magenta)] text-fuchsia-300 text-xs font-mono font-bold shrink-0 shadow-md">
            Optimal in the Twilight Zone (10% - 25% ID)
          </div>
        </div>

      </div>
    </section>
  );
};
