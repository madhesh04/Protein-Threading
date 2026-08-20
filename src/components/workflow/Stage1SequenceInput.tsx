import React, { useState } from 'react';
import { AMINO_ACIDS, CATEGORY_METADATA } from '../../data/aminoAcids';
import { AminoAcid } from '../../types';
import { Info, Sparkles, Filter, Check } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage1SequenceInput: React.FC = () => {
  const [selectedResidue, setSelectedResidue] = useState<AminoAcid>(AMINO_ACIDS['M']);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [customSeq, setCustomSeq] = useState('MKTAVLIGDEFRLWQNKGVPSECYAHIDST');

  const sequenceArray = customSeq.split('').filter((c) => AMINO_ACIDS[c.toUpperCase()]);

  const handleResidueClick = (char: string) => {
    const aa = AMINO_ACIDS[char.toUpperCase()];
    if (aa) {
      setSelectedResidue(aa);
      sound.playClick(aa.hydropathy > 0 ? 700 : 400);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#FF00FF] uppercase tracking-wider glow-text-magenta">Step 1 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Target Protein Sequence: Structure Unknown</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The process begins with the amino-acid sequence of a protein whose 3D structure is not yet known.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-xl glass-subtle border-[var(--glass-border-magenta)] text-fuchsia-300 shrink-0">
          Query: {sequenceArray.length} Residues
        </div>
      </div>

      {/* Property Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-300 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-[#00FFFF]" /> Filter by chemical property:
        </span>
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 text-xs rounded-lg font-mono transition-all ${
            activeFilter === 'all'
              ? 'step-active font-bold'
              : 'glass-subtle text-slate-300 hover:text-white'
          }`}
        >
          All (20 AA)
        </button>
        {Object.entries(CATEGORY_METADATA).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-2.5 py-1 text-xs rounded-lg font-mono border transition-all ${
              activeFilter === key
                ? meta.color + ' font-bold shadow-sm'
                : 'glass-subtle border-[var(--glass-border)] text-slate-400 hover:text-slate-200'
            }`}
          >
            {meta.label}
          </button>
        ))}
      </div>

      {/* Interactive Sequence Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-300">
          <span>Click any residue to inspect biophysical properties:</span>
          <span className="text-cyan-300 font-bold">N-terminus ➔ C-terminus</span>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-[var(--glass-border)] flex flex-wrap gap-2 overflow-x-auto">
          {sequenceArray.map((char, idx) => {
            const aa = AMINO_ACIDS[char.toUpperCase()];
            const isSelected = selectedResidue.code1 === aa.code1;
            const isDimmed = activeFilter !== 'all' && aa.category !== activeFilter;

            return (
              <button
                key={idx}
                onClick={() => handleResidueClick(char)}
                className={`relative flex flex-col items-center justify-center w-11 h-13 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-white bg-white/20 scale-110 shadow-lg shadow-cyan-500/20 z-10'
                    : isDimmed
                    ? 'opacity-30 border-[var(--glass-border)] glass-subtle'
                    : 'border-[var(--glass-border)] hover:border-slate-400 glass-subtle hover:scale-105'
                }`}
                style={{
                  borderTopColor: aa.color,
                  borderTopWidth: '3px',
                }}
              >
                <span className="text-xs font-mono font-extrabold text-white">{aa.code1}</span>
                <span className="text-[9px] font-mono text-slate-300">{aa.code3}</span>
                <span className="text-[8px] font-mono text-slate-400">#{idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Residue Detail Card */}
      {selectedResidue && (
        <div className="p-5 rounded-2xl glass-card border-[var(--glass-border)] grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-4 flex items-center gap-4 border-b md:border-b-0 md:border-r border-[var(--glass-border)] pb-4 md:pb-0 md:pr-4">
            <div
              className="w-16 h-16 rounded-2xl flex flex-col items-center justify-center border-2 shadow-lg"
              style={{
                backgroundColor: `${selectedResidue.color}25`,
                borderColor: selectedResidue.color,
              }}
            >
              <span className="text-2xl font-black font-mono" style={{ color: selectedResidue.color }}>
                {selectedResidue.code1}
              </span>
              <span className="text-[10px] font-mono text-slate-200 uppercase">{selectedResidue.code3}</span>
            </div>

            <div>
              <h5 className="font-bold text-white text-lg font-display">{selectedResidue.name}</h5>
              <span
                className="inline-block mt-1 text-[11px] font-mono px-2 py-0.5 rounded-md border"
                style={{
                  color: selectedResidue.color,
                  borderColor: `${selectedResidue.color}40`,
                  backgroundColor: `${selectedResidue.color}15`,
                }}
              >
                {CATEGORY_METADATA[selectedResidue.category]?.label}
              </span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <p className="text-sm text-slate-200 leading-relaxed">{selectedResidue.description}</p>

            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                <span className="text-slate-400 block text-[10px]">Hydropathy (Kyte-Doolittle)</span>
                <span
                  className={`font-bold text-sm ${
                    selectedResidue.hydropathy > 0 ? 'text-[#FFBF00]' : 'text-[#00FFFF]'
                  }`}
                >
                  {selectedResidue.hydropathy > 0 ? `+${selectedResidue.hydropathy}` : selectedResidue.hydropathy}
                </span>
              </div>

              <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                <span className="text-slate-400 block text-[10px]">Net Charge at pH 7.4</span>
                <span
                  className={`font-bold text-sm ${
                    selectedResidue.charge > 0
                      ? 'text-cyan-400'
                      : selectedResidue.charge < 0
                      ? 'text-[#FF7F50]'
                      : 'text-slate-300'
                  }`}
                >
                  {selectedResidue.charge > 0 ? `+${selectedResidue.charge}` : selectedResidue.charge}
                </span>
              </div>

              <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)]">
                <span className="text-slate-400 block text-[10px]">Structure Propensity</span>
                <span className="font-bold text-slate-200 text-xs">
                  α: {selectedResidue.helixPropensity} • β: {selectedResidue.sheetPropensity}
                </span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
