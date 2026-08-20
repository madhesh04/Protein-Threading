import React, { useState } from 'react';
import { Trophy, AlertCircle, CheckCircle2, ChevronRight, BarChart3, Info } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage5Leaderboard: React.FC = () => {
  const [selectedRank, setSelectedRank] = useState<number>(0);

  const candidates = [
    {
      rank: 1,
      templateName: 'Alpha/Beta Barrel (TIM Barrel)',
      pdbId: '1TIM',
      totalScore: 94,
      zScore: 4.8,
      confidence: 'High (Statistically Significant)',
      status: 'Best Predicted Fold',
      color: '#84cc16', // lime
      breakdown: { env: 38, contact: 34, sec: 24, gap: -2 },
      rationale: 'Remarkable hydrophobic core packing and ideal beta-alpha-beta secondary structure matching. Minimal gap penalties.',
    },
    {
      rank: 2,
      templateName: 'Mixed Alpha/Beta (Rossmann Fold)',
      pdbId: '1MDH',
      totalScore: 78,
      zScore: 3.2,
      confidence: 'Medium Confidence',
      status: 'Secondary Candidate',
      color: '#06b6d4', // cyan
      breakdown: { env: 30, contact: 28, sec: 22, gap: -2 },
      rationale: 'Strong core fit, but loop geometry around the co-factor pocket shows minor strain.',
    },
    {
      rank: 3,
      templateName: 'Four-Helix Bundle',
      pdbId: '2ROP',
      totalScore: 58,
      zScore: 1.9,
      confidence: 'Low Confidence',
      status: 'Moderate Score',
      color: '#f59e0b', // amber
      breakdown: { env: 24, contact: 20, sec: 18, gap: -4 },
      rationale: 'Moderate helical alignment, but hydrophobic residues fail to achieve optimal close packing in the core.',
    },
    {
      rank: 4,
      templateName: 'Beta-Sheet Sandwich (Ig Fold)',
      pdbId: '1TEN',
      totalScore: 38,
      zScore: 0.8,
      confidence: 'Disfavored',
      status: 'Weak Score',
      color: '#f43f5e', // coral red
      breakdown: { env: 15, contact: 14, sec: 16, gap: -7 },
      rationale: 'Severe steric clashes with bulky aromatic side chains and mismatch in sheet twist angles.',
    },
    {
      rank: 5,
      templateName: 'Transmembrane 7-Helix Bundle',
      pdbId: '1F88',
      totalScore: 22,
      zScore: -0.5,
      confidence: 'Rejected',
      status: 'Severe Energy Penalty',
      color: '#ef4444',
      breakdown: { env: 8, contact: 10, sec: 12, gap: -8 },
      rationale: 'Aqueous target sequence cannot satisfy the severe hydrophobic lipid bilayer constraints.',
    },
  ];

  const handleSelect = (idx: number) => {
    setSelectedRank(idx);
    sound.playClick(600 - idx * 50);
  };

  const activeCandidate = candidates[selectedRank];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider glow-text-cyan">Step 5 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Compare and Rank All Fold Candidates</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            The program repeats the threading and scoring process for many possible folds. Templates are ranked according to how compatible they are with the target sequence.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-2 rounded-xl glass-subtle border-[var(--glass-border)] text-cyan-300 shrink-0 flex items-center gap-1.5 shadow-sm">
          <Trophy className="w-3.5 h-3.5 text-[#FFBF00]" />
          <span>Scientific Leaderboard</span>
        </div>
      </div>

      {/* Leaderboard Table & Detailed Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Ranked Candidate List */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-mono text-slate-300">Template Fold Ranking (Normalized Compatibility):</span>

          <div className="space-y-2.5">
            {candidates.map((cand, idx) => {
              const isSelected = selectedRank === idx;
              return (
                <button
                  key={cand.pdbId}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-3.5 rounded-2xl border text-left transition-all space-y-2 ${
                    isSelected
                      ? 'glass-panel border-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.01]'
                      : 'glass-card border-[var(--glass-border)] hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                          idx === 0
                            ? 'bg-[#32CD32] text-slate-950 shadow-sm'
                            : idx === 1
                            ? 'bg-[#00FFFF] text-slate-950 shadow-sm'
                            : 'glass-subtle text-slate-300'
                        }`}
                      >
                        {cand.rank}
                      </span>
                      <span className="font-bold text-white text-sm font-display">{cand.templateName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold" style={{ color: cand.color }}>
                        {cand.totalScore} pts
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">({cand.zScore} σ)</span>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="h-1.5 rounded-full bg-black/40 border border-[var(--glass-border)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${cand.totalScore}%`,
                        backgroundColor: cand.color,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Candidate Detailed Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl glass-card border-[var(--glass-border)] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-3">
              <div>
                <span className="text-[11px] font-mono text-[#00FFFF]">Rank #{activeCandidate.rank} Candidate</span>
                <h5 className="font-bold text-white text-base font-display">{activeCandidate.templateName}</h5>
              </div>
              <span
                className="text-xs font-mono px-2.5 py-1 rounded-md border font-bold"
                style={{
                  color: activeCandidate.color,
                  borderColor: `${activeCandidate.color}40`,
                  backgroundColor: `${activeCandidate.color}15`,
                }}
              >
                PDB: {activeCandidate.pdbId}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-black/30 p-3 rounded-xl border border-[var(--glass-border)]">
              {activeCandidate.rationale}
            </p>

            {/* Score Component Breakdown */}
            <div className="space-y-2 text-xs font-mono">
              <span className="text-slate-300">Energy Component Breakdown:</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex justify-between">
                  <span className="text-slate-400">Environment:</span>
                  <span className="text-[#00FFFF] font-bold">+{activeCandidate.breakdown.env}</span>
                </div>
                <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex justify-between">
                  <span className="text-slate-400">Pair Contacts:</span>
                  <span className="text-[#00FFFF] font-bold">+{activeCandidate.breakdown.contact}</span>
                </div>
                <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex justify-between">
                  <span className="text-slate-400">Secondary Struct:</span>
                  <span className="text-[#00FFFF] font-bold">+{activeCandidate.breakdown.sec}</span>
                </div>
                <div className="p-2 rounded-lg glass-subtle border-[var(--glass-border)] flex justify-between">
                  <span className="text-slate-400">Gap Penalties:</span>
                  <span className="text-[#FF7F50] font-bold">{activeCandidate.breakdown.gap}</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl glass-subtle border-[var(--glass-border)] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Statistical Significance:</span>
              <span className="text-[#32CD32] font-bold glow-text-lime">Z-Score = {activeCandidate.zScore} σ</span>
            </div>
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="p-3.5 rounded-xl glass-subtle border border-amber-500/30 text-xs text-amber-300 flex items-start gap-2.5">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>
              <strong>Scientific Note:</strong> The best-scoring fold is a <em>computational prediction</em> and structural hypothesis, not absolute empirical proof. Experimental methods (X-ray crystallography, Cryo-EM) provide ground truth.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
