import React, { useState } from 'react';
import { ProteinViewer3D } from '../ProteinViewer3D';
import { CheckCircle2, Sparkles, Layers, Sliders, Cpu, ArrowRight } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage6ModelRefinement: React.FC = () => {
  const [refineStage, setRefineStage] = useState<number>(3); // 0: Backbone, 1: Sidechains, 2: Loops, 3: Final Minimized

  const stages = [
    {
      id: 0,
      title: '1. Template Backbone Alignment',
      desc: 'Cα backbone coordinates from the top template (TIM Barrel) act as the foundational scaffold.',
      theme: 'cyan' as const,
      status: 'Scaffold Ready',
    },
    {
      id: 1,
      title: '2. Target Side-Chain Placement',
      desc: 'Target sequence amino acid rotamers are mathematically packed into the core and surface coordinates.',
      theme: 'amber_fit' as const,
      status: 'Rotamers Fitted',
    },
    {
      id: 2,
      title: '3. Loop Modeling & Gap Insertion',
      desc: 'Ab initio loop closure algorithms build missing turns and insertions not present in the template.',
      theme: 'magenta' as const,
      status: 'Loops Bridged',
    },
    {
      id: 3,
      title: '4. Energy Minimization (Final 3D Fold)',
      desc: 'Molecular mechanics force-field relaxes steric clashes, establishing optimal hydrogen bonds.',
      theme: 'lime_predicted' as const,
      status: 'Predicted Fold Complete',
    },
  ];

  const handleStageClick = (idx: number) => {
    setRefineStage(idx);
    sound.playClick(500 + idx * 75);
  };

  const currentStage = stages[refineStage];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#32CD32] uppercase tracking-wider glow-text-lime">Step 6 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Build & Refine the Final 3D Protein Model</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The highest-ranking template provides a structural framework. Researchers then refine loops, side chains, and local regions to produce a high-confidence 3D model.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-2 rounded-xl bg-lime-500/15 border border-lime-500/30 text-lime-300 shrink-0 font-bold flex items-center gap-1.5 glow-lime shadow-sm">
          <Sparkles className="w-4 h-4 text-lime-400" />
          <span>Predicted Protein Fold</span>
        </div>
      </div>

      {/* Refinement Pipeline Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((stg, idx) => (
          <button
            key={stg.id}
            onClick={() => handleStageClick(idx)}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              refineStage === idx
                ? 'glass-panel border-lime-400/80 shadow-lg shadow-lime-500/20'
                : 'glass-card border-[var(--glass-border)] hover:border-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md glass-subtle text-slate-300 border border-[var(--glass-border)]">
                Phase {idx + 1}
              </span>
              {refineStage === idx && <span className="w-2 h-2 rounded-full bg-[#32CD32] animate-pulse shadow-sm" />}
            </div>
            <h5 className="font-bold text-white text-xs font-display">{stg.title}</h5>
            <span className="text-[11px] font-mono text-lime-300 mt-1 block glow-text-lime">{stg.status}</span>
          </button>
        ))}
      </div>

      {/* 3D Model Transformation Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* 3D Predicted Model */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-[var(--glass-border)]">
            <ProteinViewer3D
              foldType="tim_barrel"
              colorTheme={currentStage.theme}
              showThreadingFlow={refineStage < 3}
              height={360}
              autoRotate={true}
              interactive={true}
            />

            {/* Glowing Tag */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-xl glass-panel border border-[var(--glass-border)] text-xs font-mono text-lime-300 backdrop-blur-md glow-text-lime shadow-lg">
              Current View: {currentStage.title}
            </div>
          </div>
        </div>

        {/* Refinement Explanations */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl glass-card border-[var(--glass-border)] space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-lime-500/20 text-lime-300 border border-lime-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400">Refinement Stage {refineStage + 1} of 4</span>
                <h5 className="font-bold text-white text-base font-display">{currentStage.title}</h5>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed bg-black/30 p-3.5 rounded-xl border border-[var(--glass-border)]">
              {currentStage.desc}
            </p>

            {/* Verification metrics */}
            <div className="space-y-2 text-xs font-mono">
              <span className="text-slate-300">Predicted Structure Quality Metrics:</span>
              <div className="space-y-1.5">
                <div className="flex justify-between p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                  <span className="text-slate-300">Ramachandran Favored Angles:</span>
                  <span className="text-lime-300 font-bold glow-text-lime">96.8%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                  <span className="text-slate-300">Steric Clashscore:</span>
                  <span className="text-lime-300 font-bold glow-text-lime">1.2 (Excellent)</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                  <span className="text-slate-300">Estimated Global Distance Test (GDT-TS):</span>
                  <span className="text-[#00FFFF] font-bold">84.5 / 100</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl glass-subtle border border-lime-500/30 text-xs text-lime-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-lime-400" />
              <span>The finished model is ready for docking, active site analysis, and mutant testing!</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
