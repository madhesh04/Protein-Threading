import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, Shield, Cpu, ExternalLink, HelpCircle } from 'lucide-react';

export const ProsAndCons: React.FC = () => {
  const advantages = [
    {
      title: 'Detects Distant Evolutionary Homology',
      desc: 'Recognizes shared ancestral folds even when millions of years of random drift have completely mutated the primary sequence letters.',
    },
    {
      title: 'Excels in the Twilight Zone (< 25% Identity)',
      desc: 'Operates with high predictive power in the low-similarity realm where conventional BLAST and multiple sequence alignments fail.',
    },
    {
      title: 'Leverages Vast Structural Repositories',
      desc: 'Directly utilizes over 200,000+ experimentally resolved high-resolution templates deposited in the worldwide Protein Data Bank (PDB).',
    },
    {
      title: 'Physical & Energetic Feasibility Checks',
      desc: 'Incorporates realistic biophysical constraints—hydrophobic core burial, SASA solvent exposure, and secondary structure dihedral preferences.',
    },
  ];

  const limitations = [
    {
      title: 'Cannot Predict Completely Novel Folds',
      desc: 'If an uncharacterized protein adopts an unprecedented 3D fold never before discovered in the PDB, threading cannot construct it from scratch.',
    },
    {
      title: 'Dependent on Template Quality & Resolution',
      desc: 'Low-resolution templates, crystal packing artifacts, or sparse representation of certain membrane topologies can limit prediction fidelity.',
    },
    {
      title: 'Variable Loop & Insertion Accuracy',
      desc: 'Regions corresponding to large gaps, insertions, or intrinsically disordered terminal segments must be modeled with secondary ab initio heuristics.',
    },
    {
      title: 'Hypothesis Requiring Experimental Validation',
      desc: 'The top-ranked candidate is a statistical prediction. Definitive biochemical confirmation requires X-ray, Cryo-EM, or NMR spectroscopy.',
    },
  ];

  return (
    <section id="pros-cons" className="py-20 relative border-t border-[var(--glass-border)]">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5 text-[#00FFFF]" />
            <span className="glow-text-cyan">Critical Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Advantages and Limitations
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Understanding when to rely on fold recognition and recognizing the physical boundaries of template-based modeling.
          </p>
        </div>

        {/* Orbiting Glass Cards Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* 1. Advantages Card (Emerald / Cyan Glow) */}
          <div className="p-7 sm:p-8 rounded-3xl glass-panel border-emerald-500/40 shadow-xl shadow-emerald-950/20 space-y-6 relative overflow-hidden group">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider glow-text-lime">Key Strengths</span>
                  <h3 className="text-2xl font-bold text-white font-display">Advantages of Threading</h3>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                4 Superpowers
              </span>
            </div>

            {/* List */}
            <div className="space-y-4">
              {advantages.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-subtle border-[var(--glass-border)] hover:border-emerald-500/40 transition-all space-y-1"
                >
                  <h4 className="font-bold text-emerald-300 text-sm font-display flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3.5">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

          {/* 2. Limitations Card (Coral / Amber Glow) */}
          <div className="p-7 sm:p-8 rounded-3xl glass-panel border-[var(--glass-border-magenta)] shadow-xl shadow-fuchsia-950/20 space-y-6 relative overflow-hidden group">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-rose-500/20 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-rose-400 uppercase tracking-wider glow-text-coral">Boundary Conditions</span>
                  <h3 className="text-2xl font-bold text-white font-display">Known Limitations</h3>
                </div>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30">
                4 Constraints
              </span>
            </div>

            {/* List */}
            <div className="space-y-4">
              {limitations.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-subtle border-[var(--glass-border)] hover:border-rose-500/40 transition-all space-y-1"
                >
                  <h4 className="font-bold text-rose-300 text-sm font-display flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF7F50] shadow-[0_0_6px_#FF7F50]" />
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed pl-3.5">{item.desc}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Final Takeaway Callout */}
        <div className="p-6 rounded-3xl glass-card border-[var(--glass-border-hover)] text-center space-y-2 max-w-3xl mx-auto shadow-xl shadow-cyan-500/10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
            <Sparkles className="w-4 h-4 text-[#00FFFF]" />
            <span className="glow-text-cyan">Guiding Axiom</span>
          </div>
          <p className="text-base sm:text-lg font-bold text-white font-display">
            &ldquo;Threading works best when nature has already revealed a structurally related fold.&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
};
