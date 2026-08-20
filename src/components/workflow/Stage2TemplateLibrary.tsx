import React, { useState } from 'react';
import { STRUCTURAL_TEMPLATES } from '../../data/templates';
import { StructuralTemplate } from '../../types';
import { ProteinViewer3D } from '../ProteinViewer3D';
import { Database, Layers, Sparkles, ChevronRight, Activity } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage2TemplateLibrary: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<StructuralTemplate>(STRUCTURAL_TEMPLATES[0]);

  const activeTemplate = selectedTemplate || STRUCTURAL_TEMPLATES[0];

  const handleSelect = (tmpl: StructuralTemplate) => {
    if (tmpl) {
      setSelectedTemplate(tmpl);
      sound.playClick(600);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider glow-text-cyan">Step 2 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Structural Template Library</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The algorithm searches a database of proteins whose structures are already known. Each known structure acts as a possible template.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-xl glass-subtle border-[var(--glass-border)] text-cyan-300 shrink-0 flex items-center gap-1.5 shadow-sm">
          <Database className="w-3.5 h-3.5 text-[#00FFFF]" />
          <span>Library Size: 5 Core Representative Folds</span>
        </div>
      </div>

      {/* Main Grid: Gallery List + 3D Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Template Selector List */}
        <div className="lg:col-span-6 space-y-3">
          <span className="text-xs font-mono text-slate-300">Select a candidate structural template from library:</span>

          <div className="space-y-2.5">
            {STRUCTURAL_TEMPLATES.map((tmpl) => {
              const isSelected = activeTemplate.id === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelect(tmpl)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'glass-panel border-cyan-400/80 shadow-lg shadow-cyan-500/20'
                      : 'glass-card border-[var(--glass-border)] hover:border-slate-500'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded-md glass-subtle text-[#00FFFF] border border-cyan-500/30">
                        PDB: {tmpl.pdbId}
                      </span>
                      <span className="text-xs text-slate-300 font-mono">{tmpl.classification}</span>
                    </div>
                    <h5 className="font-bold text-white text-sm font-display">{tmpl.name}</h5>
                    <p className="text-xs text-slate-300 line-clamp-1">{tmpl.typicalFunction}</p>
                  </div>

                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isSelected ? 'text-[#00FFFF] translate-x-1' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Template 3D Viewer & Structural Metadata */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden glass-panel border border-[var(--glass-border)]">
            <ProteinViewer3D
              foldType={activeTemplate.visualType}
              colorTheme="cyan"
              showThreadingFlow={false}
              height={260}
              autoRotate={true}
              interactive={true}
            />
          </div>

          <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-bold text-[#00FFFF] font-display text-base glow-text-cyan">{activeTemplate.name}</h5>
              <span className="text-xs font-mono text-slate-300">{activeTemplate.totalResidues} Cα positions</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeTemplate.description}</p>

            {/* Secondary Structure Composition Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono text-slate-300">
                <span>Secondary Structure Composition</span>
                <span>
                  α: {activeTemplate.secondaryComposition.helix}% • β:{' '}
                  {activeTemplate.secondaryComposition.sheet}% • Loop:{' '}
                  {activeTemplate.secondaryComposition.loop}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-black/40 border border-[var(--glass-border)] flex overflow-hidden">
                <div
                  style={{ width: `${activeTemplate.secondaryComposition.helix}%` }}
                  className="bg-[#00FFFF] h-full"
                  title="Alpha Helices"
                />
                <div
                  style={{ width: `${activeTemplate.secondaryComposition.sheet}%` }}
                  className="bg-[#FF00FF] h-full"
                  title="Beta Sheets"
                />
                <div
                  style={{ width: `${activeTemplate.secondaryComposition.loop}%` }}
                  className="bg-slate-500 h-full"
                  title="Loops"
                />
              </div>
            </div>

            {/* Core vs Surface distribution */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex items-center justify-between">
                <span className="text-[#FFBF00]">Buried Core Sites:</span>
                <span className="font-bold text-white">{activeTemplate.coreResidues}</span>
              </div>
              <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex items-center justify-between">
                <span className="text-[#00FFFF]">Solvent Exposed Sites:</span>
                <span className="font-bold text-white">{activeTemplate.surfaceResidues}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
