import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, ArrowRight, RefreshCw, Layers, ShieldAlert, Cpu } from 'lucide-react';
import { sound } from '../utils/audio';

export const CoreConceptSection: React.FC = () => {
  const [selectedScaffold, setSelectedScaffold] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scaffolds = [
    {
      id: 0,
      name: 'Scaffold A: Cylindrical Barrel',
      type: 'Alpha/Beta Barrel Scaffold',
      fitStatus: 'Comfortable Fit (High Compatibility)',
      comfortScore: 92,
      isFit: true,
      reason: 'Hydrophobic beads slip comfortably into the shielded interior core; charged beads project outwards into solvent.',
      color: '#06b6d4',
    },
    {
      id: 1,
      name: 'Scaffold B: Narrow Flat Sheet',
      type: 'Beta-Sandwich Scaffold',
      fitStatus: 'Steric Clashes (Severe Strain)',
      comfortScore: 34,
      isFit: false,
      reason: 'Bulky aromatic residues (Phe, Trp) collide with tightly spaced strands, causing severe energetic strain.',
      color: '#f43f5e',
    },
    {
      id: 2,
      name: 'Scaffold C: Wide Helical Frame',
      type: 'Helical Bundle Scaffold',
      fitStatus: 'Unburied Core (Cavity Penalty)',
      comfortScore: 52,
      isFit: false,
      reason: 'Too many small residues leave unstable empty vacuum pockets inside the core (cavity penalty).',
      color: '#f59e0b',
    },
  ];

  const handleScaffoldClick = (idx: number) => {
    setSelectedScaffold(idx);
    setIsSimulating(true);
    sound.playThreadPulse();
    setTimeout(() => setIsSimulating(false), 500);
  };

  const sampleBeads = [
    { label: 'Met', cat: 'hydrophobic', color: '#fbbf24' },
    { label: 'Lys', cat: 'positive', color: '#3b82f6' },
    { label: 'Thr', cat: 'hydrophilic', color: '#06b6d4' },
    { label: 'Ala', cat: 'hydrophobic', color: '#f59e0b' },
    { label: 'Val', cat: 'hydrophobic', color: '#d97706' },
    { label: 'Leu', cat: 'hydrophobic', color: '#b45309' },
    { label: 'Ile', cat: 'hydrophobic', color: '#ca8a04' },
    { label: 'Gly', cat: 'special', color: '#c084fc' },
    { label: 'Asp', cat: 'negative', color: '#f43f5e' },
    { label: 'Glu', cat: 'negative', color: '#ec4899' },
    { label: 'Phe', cat: 'hydrophobic', color: '#ca8a04' },
    { label: 'Arg', cat: 'positive', color: '#60a5fa' },
  ];

  const activeScaffold = scaffolds[selectedScaffold];

  return (
    <section id="analogy" className="py-20 relative border-t border-[var(--glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Core Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            What is Protein Threading?
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            <strong className="text-cyan-300 font-semibold glow-text-cyan">Protein threading</strong>, or <strong className="text-fuchsia-300 font-semibold glow-text-magenta">fold recognition</strong>, is a computational method used to predict a protein’s 3D structure when its amino-acid sequence has little or no obvious similarity to proteins of known structure.
          </p>
        </div>

        {/* The Visual Bead Chain & Wireframe Hanger Analogy Simulator */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-8 mb-16">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--glass-border)] pb-6">
            <div>
              <span className="text-xs font-mono text-fuchsia-400 uppercase tracking-wider">Intuitive Analogy Simulator</span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                The Flexible Bead Chain & The Clothing Hangers
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Imagine your unknown protein sequence as a flexible beaded necklace, and known protein folds as distinct rigid wireframe hangers. Threading tests how smoothly the beads drape into each hanger.
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl glass-card text-xs font-mono text-cyan-300 shrink-0 border-cyan-500/30">
              Interactive Test Mode
            </div>
          </div>

          {/* 1. Flexible Bead Chain (Unknown Sequence) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF00FF] animate-ping" />
                Unknown protein sequence (Flexible Bead Chain)
              </span>
              <span className="text-xs text-slate-400 font-mono">12 Amino Acid Sample</span>
            </div>

            <div className="p-4 rounded-2xl glass-subtle overflow-x-auto flex items-center gap-2 relative">
              {sampleBeads.map((bead, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className="flex flex-col items-center justify-center w-12 h-12 rounded-xl border border-white/20 shadow-md transform hover:-translate-y-1 transition-all"
                    style={{ backgroundColor: `${bead.color}25`, borderColor: bead.color }}
                  >
                    <span className="text-xs font-bold font-mono" style={{ color: bead.color }}>
                      {bead.label}
                    </span>
                    <span className="text-[9px] text-slate-400 capitalize">{bead.cat.slice(0, 4)}</span>
                  </div>
                  {i < sampleBeads.length - 1 && (
                    <div className="w-3 h-0.5 bg-indigo-800/80 mx-0.5 relative">
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 2. Known Structural Hanger Scaffolds */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-400">
              Select a Known Protein Fold (Wireframe Hanger Scaffold):
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {scaffolds.map((scaffold, idx) => (
                <button
                  key={scaffold.id}
                  onClick={() => handleScaffoldClick(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    selectedScaffold === idx
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                      : 'glass-card hover:border-indigo-400/50 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-indigo-950/80 text-cyan-300 border border-cyan-500/30">
                      Template {String.fromCharCode(65 + idx)}
                    </span>
                    {selectedScaffold === idx && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <h4 className="font-semibold text-white text-base font-display">{scaffold.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{scaffold.type}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Threading Animation & Fit Result Display */}
          <div className="p-6 rounded-2xl glass-subtle grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* SVG Scaffold & Bead Weaving Visualization */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-xl glass-card min-h-[220px]">
              <svg viewBox="0 0 400 180" className="w-full max-w-[380px] h-auto protein-path">
                <defs>
                  <linearGradient id="scaffoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={activeScaffold.color} stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.4" />
                  </linearGradient>
                </defs>

                {/* Wireframe Hanger Scaffold Silhouette */}
                {selectedScaffold === 0 && (
                  /* Barrel hanger */
                  <g stroke="#00FFFF" strokeWidth="2.5" fill="none" opacity="0.85">
                    <ellipse cx="200" cy="40" rx="90" ry="25" strokeDasharray="4 4" />
                    <ellipse cx="200" cy="140" rx="90" ry="25" />
                    <line x1="110" y1="40" x2="110" y2="140" />
                    <line x1="290" y1="40" x2="290" y2="140" />
                    <line x1="155" y1="48" x2="155" y2="148" opacity="0.4" />
                    <line x1="245" y1="48" x2="245" y2="148" opacity="0.4" />
                  </g>
                )}

                {selectedScaffold === 1 && (
                  /* Flat tight sandwich */
                  <g stroke="#FF7F50" strokeWidth="2.5" fill="none" opacity="0.85">
                    <rect x="100" y="35" width="200" height="20" rx="4" />
                    <rect x="100" y="125" width="200" height="20" rx="4" />
                    <line x1="120" y1="55" x2="120" y2="125" strokeDasharray="3 3" />
                    <line x1="280" y1="55" x2="280" y2="125" strokeDasharray="3 3" />
                  </g>
                )}

                {selectedScaffold === 2 && (
                  /* Wide helical frame */
                  <g stroke="#FFBF00" strokeWidth="2.5" fill="none" opacity="0.85">
                    <circle cx="140" cy="90" r="35" strokeDasharray="4 4" />
                    <circle cx="260" cy="90" r="35" strokeDasharray="4 4" />
                    <line x1="140" y1="55" x2="260" y2="55" />
                    <line x1="140" y1="125" x2="260" y2="125" />
                  </g>
                )}

                {/* Animated Beaded Chain woven into the scaffold */}
                <path
                  d={
                    selectedScaffold === 0
                      ? 'M 60,90 Q 140,25 200,85 T 340,90'
                      : selectedScaffold === 1
                      ? 'M 60,80 L 140,45 L 200,135 L 260,45 L 340,80'
                      : 'M 60,90 Q 140,150 200,90 T 340,90'
                  }
                  fill="none"
                  stroke="url(#scaffoldGrad)"
                  strokeWidth="4"
                  className={isSimulating ? 'animate-thread-flow' : ''}
                />

                {/* Woven beads */}
                {[
                  { cx: 120, cy: selectedScaffold === 0 ? 55 : selectedScaffold === 1 ? 52 : 110, fill: '#fbbf24' },
                  { cx: 160, cy: selectedScaffold === 0 ? 68 : selectedScaffold === 1 ? 90 : 125, fill: '#3b82f6' },
                  { cx: 200, cy: selectedScaffold === 0 ? 85 : selectedScaffold === 1 ? 135 : 90, fill: '#f59e0b' },
                  { cx: 240, cy: selectedScaffold === 0 ? 80 : selectedScaffold === 1 ? 90 : 55, fill: '#d97706' },
                  { cx: 280, cy: selectedScaffold === 0 ? 65 : selectedScaffold === 1 ? 52 : 70, fill: '#ec4899' },
                ].map((b, idx) => (
                  <circle key={idx} cx={b.cx} cy={b.cy} r="6.5" fill={b.fill} stroke="#ffffff" strokeWidth="1.5" />
                ))}
              </svg>

              <div className="mt-2 text-xs font-mono text-slate-400">
                Evaluating physical cavity packing & surface exposure
              </div>
            </div>

            {/* Assessment Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                {activeScaffold.isFit ? (
                  <div className="p-2 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40">
                    <XCircle className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-mono text-slate-400">Physical Assessment</span>
                  <h4 className="text-lg font-bold text-white">{activeScaffold.fitStatus}</h4>
                </div>
              </div>

              {/* Score Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Fold Compatibility Score</span>
                  <span className="font-bold text-cyan-300">{activeScaffold.comfortScore} / 100</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      activeScaffold.comfortScore > 80
                        ? 'bg-lime-400 glow-lime'
                        : activeScaffold.comfortScore > 50
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${activeScaffold.comfortScore}%` }}
                  />
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed glass-card p-3.5 rounded-xl">
                {activeScaffold.reason}
              </p>

              <div className="text-xs text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>
                  Threading tests whether the sequence can fit <strong>comfortably</strong> inside each known fold.
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Comparison Card: Sequence Alignment vs Threading */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Conceptual Distinction</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              Sequence Alignment vs. Fold Recognition
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Sequence Alignment */}
            <div className="p-5 rounded-2xl glass-card hover:border-slate-500/50 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-200 text-lg font-display">Sequence Alignment</h4>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full glass-subtle text-slate-400">1D Matching</span>
              </div>
              <div className="p-3 rounded-xl glass-subtle border-slate-700/60 text-cyan-300 font-semibold text-sm">
                &ldquo;Do the letters look similar?&rdquo;
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Compares linear amino-acid letters (A, C, D, E...) using substitution matrices (like BLOSUM62). Fails when evolutionary divergence causes sequence identity to drop below ~25%.
              </p>
            </div>

            {/* 2. Threading / Fold Recognition */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/40 hover:border-cyan-400/70 transition-all space-y-3 shadow-lg shadow-cyan-950/30 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-cyan-300 text-lg font-display glow-text-cyan">Threading / Fold Recognition</h4>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">1D to 3D Physical Fit</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-cyan-200 font-semibold text-sm">
                &ldquo;Does this sequence fit the same 3D fold?&rdquo;
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Asks: <strong className="text-white">&ldquo;Would this amino-acid sequence be physically comfortable inside this 3D structure?&rdquo;</strong> It evaluates solvation, packing, and pairwise contacts without requiring high sequence identity.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
