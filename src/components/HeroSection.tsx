import React, { useState } from 'react';
import { ArrowDown, Sparkles, Compass, Layers, Cpu, Play } from 'lucide-react';
import { ProteinViewer3D } from './ProteinViewer3D';
import { sound } from '../utils/audio';

export const HeroSection: React.FC = () => {
  const [activeHeroFold, setActiveHeroFold] = useState<'tim_barrel' | 'alpha_bundle' | 'beta_sandwich'>('tim_barrel');

  const folds = [
    { id: 'tim_barrel' as const, label: 'TIM Barrel Fold', icon: 'α/β' },
    { id: 'alpha_bundle' as const, label: '4-Helix Bundle', icon: 'α-all' },
    { id: 'beta_sandwich' as const, label: 'Beta-Sandwich', icon: 'β-all' },
  ];

  const handleFoldChange = (fold: 'tim_barrel' | 'alpha_bundle' | 'beta_sandwich') => {
    setActiveHeroFold(fold);
    sound.playClick(650);
  };

  const scrollToNext = () => {
    sound.playClick(500);
    const element = document.getElementById('analogy');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] pt-24 pb-16 flex flex-col justify-center overflow-hidden">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border-[var(--glass-border-magenta)] text-fuchsia-300 text-xs font-mono shadow-md shadow-fuchsia-500/10">
              <Sparkles className="w-3.5 h-3.5 text-[#FF00FF] animate-pulse" />
              <span className="glow-text-magenta">Computational Structural Biology • Fold Recognition</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-display">
              Protein Threading: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#32CD32] drop-shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                Can a Sequence Find Its Fold?
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Discover how scientists predict a protein’s 3D structure by fitting an amino-acid sequence into known structural frameworks.
            </p>

            {/* Amino acid live traveling stream indicator */}
            <div className="p-3.5 rounded-2xl glass-panel max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-mono">
                <span className="flex items-center gap-1.5 text-fuchsia-400">
                  <span className="w-2 h-2 rounded-full bg-[#FF00FF] animate-ping" />
                  Target Query Sequence
                </span>
                <span className="text-[#00FFFF] glow-text-cyan">Threading into 3D Backbone ➔</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-hidden py-1 px-2 rounded-xl bg-black/40 font-mono text-sm border border-indigo-900/40">
                {['M', 'K', 'T', 'A', 'V', 'L', 'I', 'G', 'D', 'E', 'F', 'R', 'W', 'Q', 'N', 'K', 'G', 'V', 'P', 'S'].map((aa, i) => (
                  <span
                    key={i}
                    className={`inline-block px-1.5 py-0.5 rounded text-xs font-bold transition-all ${
                      i % 4 === 0
                        ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 animate-pulse shadow-[0_0_8px_rgba(255,191,0,0.5)]'
                        : i % 3 === 0
                        ? 'bg-fuchsia-500/30 text-fuchsia-300 border border-fuchsia-500/30 shadow-[0_0_8px_rgba(255,0,255,0.4)]'
                        : 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(0,255,255,0.4)]'
                    }`}
                  >
                    {aa}
                  </span>
                ))}
                <span className="text-slate-500 animate-pulse">...</span>
              </div>
            </div>

            {/* CTA Button and Secondary Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-2">
              <button
                onClick={scrollToNext}
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#FF00FF] via-purple-600 to-[#00FFFF] text-white font-semibold text-base shadow-xl shadow-fuchsia-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start the Threading Journey</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </button>

              <a
                href="#challenge"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-card hover:bg-cyan-500/15 border-slate-700 text-slate-200 hover:text-cyan-300 hover:border-cyan-400/50 font-medium text-sm transition-all shadow-md"
              >
                <Play className="w-4 h-4 text-cyan-400" />
                <span>Jump to Fold Challenge</span>
              </a>
            </div>

            {/* Color Palette Legend Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 text-xs font-mono">
              <div className="flex items-center gap-2 p-2 rounded-xl glass-subtle border-[var(--glass-border-magenta)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF00FF] shadow-[0_0_6px_#FF00FF]" />
                <span className="text-slate-300">Query Sequence</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl glass-subtle border-[var(--glass-border-hover)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00FFFF] shadow-[0_0_6px_#00FFFF]" />
                <span className="text-slate-300">Template Fold</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl glass-subtle border-amber-500/30">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBF00] shadow-[0_0_6px_#FFBF00]" />
                <span className="text-slate-300">Favorable Core</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl glass-subtle border-lime-500/30">
                <span className="w-2.5 h-2.5 rounded-full bg-[#32CD32] shadow-[0_0_6px_#32CD32]" />
                <span className="text-slate-300">Predicted Model</span>
              </div>
            </div>

          </div>

          {/* Right Hero 3D Interactive Viewer */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative">
              {/* Fold Quick Selector Chips */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#00FFFF]" />
                  Interactive 3D Fold View
                </span>
                <div className="flex items-center gap-1.5">
                  {folds.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleFoldChange(f.id)}
                      className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
                        activeHeroFold === f.id
                          ? 'step-active shadow-md'
                          : 'glass-card text-slate-400 hover:text-white hover:border-cyan-400/40'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Canvas Container */}
              <div className="rounded-3xl glass-panel p-2 overflow-hidden border-[var(--glass-border)]">
                <ProteinViewer3D
                  foldType={activeHeroFold}
                  colorTheme="cyan"
                  showThreadingFlow={true}
                  height={400}
                  autoRotate={true}
                  interactive={true}
                />
              </div>
            </div>

            {/* Scientific caption */}
            <div className="p-3.5 rounded-2xl glass-card text-xs text-slate-300 flex items-start gap-2.5">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Live Simulation:</strong> Amino acids (colored beads) weave through the 3D backbone scaffold. Threading evaluates whether the target sequence&rsquo;s physical chemistry stabilizes this specific 3D topology.
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
