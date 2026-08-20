import React, { useState } from 'react';
import { Stage1SequenceInput } from './workflow/Stage1SequenceInput';
import { Stage2TemplateLibrary } from './workflow/Stage2TemplateLibrary';
import { Stage3ThreadingSimulation } from './workflow/Stage3ThreadingSimulation';
import { Stage4ScoringDashboard } from './workflow/Stage4ScoringDashboard';
import { Stage5Leaderboard } from './workflow/Stage5Leaderboard';
import { Stage6ModelRefinement } from './workflow/Stage6ModelRefinement';
import { ErrorBoundary } from './ErrorBoundary';
import { ArrowLeft, ArrowRight, Sparkles, Workflow, CheckCircle2, Play, Pause } from 'lucide-react';
import { sound } from '../utils/audio';

export const InteractivePipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const stages = [
    { num: 1, label: 'Input Sequence', tag: '1D Query', component: <Stage1SequenceInput /> },
    { num: 2, label: 'Template Library', tag: '3D Folds', component: <Stage2TemplateLibrary /> },
    { num: 3, label: 'Thread Sequence', tag: 'Fitting', component: <Stage3ThreadingSimulation /> },
    { num: 4, label: 'Score Fit (Energy)', tag: 'Biophysics', component: <Stage4ScoringDashboard /> },
    { num: 5, label: 'Rank Folds', tag: 'Leaderboard', component: <Stage5Leaderboard /> },
    { num: 6, label: 'Build 3D Model', tag: 'Final Fold', component: <Stage6ModelRefinement /> },
  ];

  const scrollToWorkflow = () => {
    const el = document.getElementById('workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleStageClick = (idx: number) => {
    const nextIdx = Math.max(0, Math.min(idx, stages.length - 1));
    setActiveStage(nextIdx);
    sound.playClick(450 + nextIdx * 60);
    scrollToWorkflow();
  };

  const handlePrev = () => {
    if (activeStage > 0) {
      const prevIdx = activeStage - 1;
      setActiveStage(prevIdx);
      sound.playClick(400);
      scrollToWorkflow();
    }
  };

  const handleNext = () => {
    if (activeStage < stages.length - 1) {
      const nextIdx = activeStage + 1;
      setActiveStage(nextIdx);
      sound.playClick(600);
      scrollToWorkflow();
    }
  };

  const safeStageIndex = Math.max(0, Math.min(activeStage, stages.length - 1));

  return (
    <section id="workflow" className="py-20 bg-[#0c0822] relative border-t border-slate-800/80">
      
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-fuchsia-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Workflow className="w-3.5 h-3.5" />
            <span>Interactive 6-Stage Algorithm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            How Protein Threading Works
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Follow the computational pipeline from a raw 1D amino acid sequence to a refined 3D structural prediction. Click any stage to explore its mechanics.
          </p>
        </div>

        {/* 6-Stage Navigation Bar / Stepper */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
          {stages.map((stage, idx) => {
            const isActive = safeStageIndex === idx;
            const isCompleted = idx < safeStageIndex;

            return (
              <button
                key={stage.num}
                onClick={() => handleStageClick(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isActive
                    ? 'step-active shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : isCompleted
                    ? 'glass-card text-slate-200 border-indigo-500/40 hover:border-cyan-400/50'
                    : 'glass-subtle text-slate-400 hover:text-slate-200 hover:border-indigo-400/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                      isActive
                        ? 'bg-[#0D0221] text-[#00FFFF] shadow-md shadow-cyan-400/40'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.num}
                  </span>
                  <span className={`text-[10px] font-mono ${isActive ? 'text-[#0D0221] font-semibold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    {stage.tag}
                  </span>
                </div>

                <h4 className={`text-xs sm:text-sm font-bold font-display ${isActive ? 'text-[#0D0221]' : 'text-slate-200'}`}>
                  {stage.label}
                </h4>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#0D0221]/50" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Stage Body Container */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-8">
          <ErrorBoundary key={safeStageIndex}>
            {stages[safeStageIndex].component}
          </ErrorBoundary>

          {/* Stepper Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-[var(--glass-border)]">
            <button
              onClick={handlePrev}
              disabled={activeStage === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                activeStage === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950 text-slate-500'
                  : 'glass-card hover:bg-cyan-500/15 border-slate-700 text-white hover:text-cyan-300 hover:border-cyan-400/40'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Stage</span>
            </button>

            <span className="text-xs font-mono text-slate-300">
              Stage <strong className="text-cyan-300 glow-text-cyan">{activeStage + 1}</strong> of 6
            </span>

            <button
              onClick={handleNext}
              disabled={activeStage === stages.length - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                activeStage === stages.length - 1
                  ? 'opacity-40 cursor-not-allowed border-slate-800 bg-slate-950 text-slate-500'
                  : 'bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-500 text-white border-transparent shadow-lg shadow-fuchsia-500/20 hover:shadow-cyan-500/30 hover:scale-105'
              }`}
            >
              <span>Next Stage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
