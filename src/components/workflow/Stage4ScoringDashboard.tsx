import React, { useState } from 'react';
import { Sliders, ShieldCheck, AlertOctagon, HelpCircle, Sparkles, CheckCircle2, TrendingDown, Minus, Plus } from 'lucide-react';
import { sound } from '../../utils/audio';

export const Stage4ScoringDashboard: React.FC = () => {
  const [fitQuality, setFitQuality] = useState<number>(85); // 0 (Worst/Red) to 100 (Best/Green)

  // Calculate dynamic component scores based on slider
  const envScore = Math.round((fitQuality / 100) * 42);
  const contactScore = Math.round((fitQuality / 100) * 35);
  const secStructScore = Math.round((fitQuality / 100) * 23);
  const gapPenalty = Math.round((1 - fitQuality / 100) * 18);

  const totalScore = envScore + contactScore + secStructScore - gapPenalty;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setFitQuality(val);
    sound.playClick(300 + val * 5);
  };

  const getExplanation = () => {
    if (fitQuality > 75) {
      return {
        status: 'Strong Favorable Fit (Native-like Fold)',
        tagColor: 'text-lime-400 border-lime-500/40 bg-lime-500/10',
        desc: 'Strong fit: Hydrophobic residues (Leu, Val, Phe) are securely buried in the core; polar and charged side chains form stabilizing hydrogen bonds on the solvent-exposed surface.',
        energyState: 'Low Free Energy (ΔG < 0, Highly Stable)',
      };
    } else if (fitQuality > 40) {
      return {
        status: 'Moderate Fit (Marginal Stability / Uncertain)',
        tagColor: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
        desc: 'Intermediate fit: Minor steric clashes and sub-optimal secondary structure alignment. Several non-polar side chains are partially exposed.',
        energyState: 'Metastable State',
      };
    } else {
      return {
        status: 'Poor Fit (Severe Energetic Penalty / Unfavorable)',
        tagColor: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
        desc: 'Poor fit: Bulky hydrophobic residues are exposed to aqueous solvent, while uncompensated charged Asp/Glu residues are buried inside the dielectric core.',
        energyState: 'High Free Energy Penalty (Unstable Disfavored)',
      };
    }
  };

  const explanation = getExplanation();

  const scoringFactors = [
    {
      num: 1,
      title: 'Residue Environment Compatibility',
      formula: 'E_env',
      desc: 'Hydrophobic amino acids are stable inside the core, while polar residues prefer water exposure.',
      value: envScore,
      max: 42,
    },
    {
      num: 2,
      title: 'Residue–Residue Contacts',
      formula: 'E_pair',
      desc: 'Spatial neighbor pairs must make chemically reasonable van der Waals, electrostatic, or H-bond contacts.',
      value: contactScore,
      max: 35,
    },
    {
      num: 3,
      title: 'Secondary Structure Compatibility',
      formula: 'E_ss',
      desc: 'Amino acid propensities for alpha-helices, beta-sheets, or flexible loop conformations.',
      value: secStructScore,
      max: 23,
    },
    {
      num: 4,
      title: 'Solvent Accessibility (SASA)',
      formula: 'E_solv',
      desc: 'Solvation free energy calculated from statistical potentials of known high-resolution PDB folds.',
      value: Math.round(fitQuality * 0.9),
      max: 100,
    },
    {
      num: 5,
      title: 'Gap & Insertion Penalties',
      formula: '-W_gap',
      desc: 'Large insertions or deletions distort backbone geometry and are heavily penalized.',
      value: -gapPenalty,
      isPenalty: true,
      max: -18,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header Info */}
      <div className="p-4 rounded-2xl glass-card border-[var(--glass-border)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-[#FFBF00] uppercase tracking-wider glow-text-amber">Step 4 of 6</span>
          <h4 className="text-lg font-bold text-white font-display">Score the Fit Using a Knowledge-Based Energy Function</h4>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            A statistical potential evaluates how energetically favorable the target sequence is when mapped onto the template backbone.
          </p>
        </div>

        <div className="text-xs font-mono px-3.5 py-2 rounded-xl glass-subtle border-[var(--glass-border)] text-amber-300 shrink-0 font-bold shadow-sm">
          Knowledge-Based Potential
        </div>
      </div>

      {/* Interactive Fit Quality Slider Bar */}
      <div className="p-6 rounded-3xl glass-panel space-y-6 shadow-xl">
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#FFBF00]" />
              Interactive Fit Quality Slider (Explore Red Unfavorable ➔ Green Favorable):
            </span>
            <span className="px-3 py-1 rounded-xl glass-card border-[var(--glass-border)] text-[#00FFFF] font-bold text-sm">
              Fit Quality: {fitQuality}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={fitQuality}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-black/40 border border-[var(--glass-border)] rounded-lg appearance-none cursor-pointer accent-[#FFBF00]"
          />

          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-[#FF7F50] font-semibold">0% Unfavorable (Red Clashes)</span>
            <span className="text-[#FFBF00]">50% Neutral / Uncertain</span>
            <span className="text-[#32CD32] font-semibold">100% Highly Favorable (Gold/Green)</span>
          </div>
        </div>

        {/* Dynamic Residue Color Preview Ribbon */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-slate-300">Residue Compatibility Mapping:</span>
          
          <div className="p-3 rounded-2xl bg-black/40 border border-[var(--glass-border)] flex flex-wrap gap-1.5 justify-center">
            {Array.from({ length: 24 }).map((_, i) => {
              // Derive color for this bead from fitQuality + position variation
              const beadFit = Math.sin(i * 0.7) * 20 + fitQuality;
              let bg = '#32CD32'; // lime/gold
              let border = '#a3e635';
              let text = '✓';

              if (i === 7 || i === 15) {
                // gap loop
                bg = '#64748b';
                border = '#94a3b8';
                text = '—';
              } else if (beadFit < 45) {
                bg = '#FF7F50'; // coral/red
                border = '#f87171';
                text = '✗';
              } else if (beadFit < 70) {
                bg = '#a855f7'; // purple uncertain
                border = '#c084fc';
                text = '?';
              } else {
                bg = i % 2 === 0 ? '#FFBF00' : '#32CD32'; // gold or green
                border = i % 2 === 0 ? '#fbbf24' : '#4ade80';
              }

              return (
                <div
                  key={i}
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white shadow-sm transition-all duration-300"
                  style={{
                    backgroundColor: `${bg}30`,
                    borderColor: border,
                    borderWidth: '1.5px',
                    color: border,
                  }}
                  title={`Position ${i + 1}`}
                >
                  {text}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-1 text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#32CD32]" />
              Gold/Green: Favorable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7F50]" />
              Coral/Red: Unfavorable
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              Purple: Uncertain / Neutral
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              Gray: Gap / Loop
            </span>
          </div>
        </div>

        {/* Live Feedback Status Banner */}
        <div className={`p-4 rounded-2xl border ${explanation.tagColor} space-y-1 glass-subtle`}>
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> {explanation.status}
            </span>
            <span className="text-xs font-mono">{explanation.energyState}</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{explanation.desc}</p>
        </div>

      </div>

      {/* The Scoring Equation & 5 Factors Breakdown */}
      <div className="p-6 rounded-3xl glass-panel space-y-6">
        
        {/* The Equation Display */}
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-[#00FFFF] uppercase tracking-wider glow-text-cyan">Scoring Formula</span>
          <div className="p-4 rounded-2xl bg-black/40 border border-cyan-500/40 max-w-2xl mx-auto font-mono text-xs sm:text-sm text-[#00FFFF] font-bold overflow-x-auto shadow-lg shadow-cyan-500/10">
            Threading Score = E(Environment) + E(Contacts) + E(Secondary Struct) − Gap Penalties
          </div>
          <p className="text-xs text-slate-300 max-w-xl mx-auto">
            A lower energy or a higher normalized compatibility score indicates a better sequence–structure fit.
          </p>
        </div>

        {/* 5 Factors Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoringFactors.map((factor) => (
            <div
              key={factor.num}
              className="p-4 rounded-2xl glass-card border-[var(--glass-border)] space-y-2 hover:border-slate-500 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[#00FFFF] font-bold">
                  {factor.num}. {factor.formula}
                </span>
                <span
                  className={`text-xs font-mono font-bold ${
                    factor.isPenalty ? 'text-[#FF7F50]' : 'text-[#32CD32]'
                  }`}
                >
                  {factor.value > 0 ? `+${factor.value}` : factor.value} pts
                </span>
              </div>
              <h5 className="font-bold text-white text-sm font-display">{factor.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed">{factor.desc}</p>
            </div>
          ))}

          {/* Total Net Score Card */}
          <div className="p-4 rounded-2xl glass-panel border border-cyan-500/50 space-y-2 flex flex-col justify-center shadow-lg shadow-cyan-500/10">
            <span className="text-xs font-mono text-[#00FFFF] uppercase glow-text-cyan">Normalized Score</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white font-mono">{totalScore}</span>
              <span className="text-xs text-slate-300 font-mono">/ 100 max</span>
            </div>
            <span className="text-xs text-slate-300 font-mono">
              Confidence Z-Score: <strong className="text-[#00FFFF]">{(totalScore / 22).toFixed(2)} σ</strong>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
