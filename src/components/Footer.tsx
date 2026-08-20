import React from 'react';
import { Dna, BookOpen, ExternalLink, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  openGlossary: () => void;
}

export const Footer: React.FC<FooterProps> = ({ openGlossary }) => {
  return (
    <footer className="glass-panel border-t border-[var(--glass-border)] py-16 relative z-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand & Purpose */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] p-[1px] shadow-[0_0_12px_rgba(0,255,255,0.3)]">
                <div className="w-full h-full bg-[#0D0221] rounded-[11px] flex items-center justify-center">
                  <Dna className="w-4 h-4 text-[#00FFFF]" />
                </div>
              </div>
              <span className="text-base font-bold text-white font-display">Protein Threading</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              An interactive educational exploration of fold recognition and structural bioinformatics. Designed for biology students, biophysicists, and computational researchers.
            </p>

            <button
              onClick={openGlossary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-card border-[var(--glass-border-hover)] text-cyan-300 hover:text-white transition-all text-xs font-mono shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span className="glow-text-cyan">Open Structural Biology Glossary</span>
            </button>
          </div>

          {/* Quick Learning Jumps */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-200 glow-text-cyan">Curriculum Navigation</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#analogy" className="hover:text-[#00FFFF] transition-colors">
                  Bead Chain & Wireframe Analogy
                </a>
              </li>
              <li>
                <a href="#why-needed" className="hover:text-[#00FFFF] transition-colors">
                  The Sequence Twilight Zone
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#00FFFF] transition-colors">
                  6-Stage Interactive Workflow
                </a>
              </li>
              <li>
                <a href="#principle" className="hover:text-[#00FFFF] transition-colors">
                  Structure Changes More Slowly Than Sequence
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-[#00FFFF] transition-colors">
                  Homology vs. Threading vs. Ab Initio
                </a>
              </li>
              <li>
                <a href="#challenge" className="hover:text-[#00FFFF] transition-colors">
                  Interactive Threading Challenge Lab
                </a>
              </li>
            </ul>
          </div>

          {/* Key Literature & Foundations */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="text-xs font-mono uppercase tracking-wider text-slate-200 glow-text-magenta">Foundational Principles</h5>
            <div className="p-4 rounded-2xl glass-subtle border-[var(--glass-border)] space-y-2 text-xs">
              <div className="text-slate-200 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00FFFF]" />
                <span>Knowledge-Based Statistical Potentials</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Derived from the statistical physics of Boltzmann inverted distributions of residue contacts across 200,000+ experimental structures in the Worldwide Protein Data Bank (wwPDB).
              </p>
            </div>

            {/* Author / Creator Attribution Badge */}
            <div className="p-4 rounded-2xl glass-card border-[var(--glass-border-hover)] space-y-2 shadow-lg">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">Author & Developer</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF00FF] via-purple-600 to-[#00FFFF] p-[1.5px] shadow-[0_0_15px_rgba(0,255,255,0.3)]">
                  <div className="w-full h-full bg-[#0D0221] rounded-[10px] flex items-center justify-center font-display font-extrabold text-sm text-[#00FFFF]">
                    PN
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-bold text-white font-display glow-text-cyan">P NANI</h6>
                  <p className="text-xs font-mono text-fuchsia-300">BIOINFORMATICS</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Creator Identification */}
        <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            Protein Threading: Finding the Right Fold • Educational Platform
          </div>
          
          {/* Creator Tag */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card border-[var(--glass-border-hover)] text-slate-200 shadow-md">
            <span className="text-slate-400">Created by:</span>
            <span className="font-bold text-[#00FFFF] glow-text-cyan tracking-wider">
              P NANI
            </span>
            <span className="text-fuchsia-400 font-bold">•</span>
            <span className="text-slate-300 font-semibold uppercase tracking-wider">
              BIOINFORMATICS
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Frosted Glass • Deep Indigo • Neon Cyan</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
