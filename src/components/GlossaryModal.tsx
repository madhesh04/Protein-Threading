import React, { useState } from 'react';
import { BookOpen, X, Search, Sparkles, Shield, Compass, Zap, Flame } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GlossaryEntry {
  term: string;
  category: 'Fundamentals' | 'Biophysics' | 'Algorithms';
  definition: string;
  analogy?: string;
  example: string;
}

const GLOSSARY_TERMS: GlossaryEntry[] = [
  {
    term: 'Protein Threading (Fold Recognition)',
    category: 'Fundamentals',
    definition: 'A computational structure prediction technique where an unknown target amino acid sequence is mathematically aligned into the coordinates of known 3D protein templates to evaluate physical and energetic compatibility.',
    analogy: 'Trying an uncharacterized key into hundreds of pre-existing locks to find which one fits smoothly.',
    example: 'Used when BLAST finds < 20% sequence identity but the protein belongs to a common fold like the TIM barrel.',
  },
  {
    term: 'Sequence Twilight Zone',
    category: 'Fundamentals',
    definition: 'The region of low sequence identity (roughly 10% to 25%) where traditional sequence alignment tools (like BLAST) fail to detect evolutionary homology, despite proteins sharing the exact same 3D structure.',
    analogy: 'Two languages sharing no recognizable words but telling the exact same narrative structure.',
    example: 'Globins and crystallins across distant phyla often exhibit ~15% identity while superimposing with RMSD < 2.0 Å.',
  },
  {
    term: 'Hydrophobic Core',
    category: 'Biophysics',
    definition: 'The tightly packed, water-excluding interior region of a folded globular protein formed by non-polar amino acids (Leu, Ile, Val, Phe, Met). The hydrophobic effect is the dominant thermodynamic driving force of folding.',
    analogy: 'Oil droplets coalescing away from surrounding water to reach a lower free-energy state.',
    example: 'Burial of non-polar side chains contributes approximately -1.3 kcal/mol per buried methylene group.',
  },
  {
    term: 'Knowledge-Based Potential (Statistical Potential)',
    category: 'Algorithms',
    definition: 'An empirical energy scoring function derived from the statistical frequencies of residue-residue distances and solvent accessibilities in known high-resolution Protein Data Bank (PDB) structures.',
    analogy: 'A grammar checker trained on millions of published books scoring whether a sentence sounds natural.',
    example: 'Sippl potential (PROSA) or DOPE score in MODELLER calculating Boltzmann-derived pseudo-energy.',
  },
  {
    term: 'Root-Mean-Square Deviation (RMSD)',
    category: 'Fundamentals',
    definition: 'The measure of the average distance between the backbone alpha-carbon (Cα) atoms of superimposed protein structures, expressed in Ångströms (Å). Lower values mean higher structural similarity.',
    analogy: 'Measuring how tightly two tracing papers line up over each other.',
    example: 'RMSD < 2.0 Å indicates an identical fold topology.',
  },
  {
    term: 'Solvent Accessible Surface Area (SASA)',
    category: 'Biophysics',
    definition: 'The surface area of a biomolecule that is accessible to a solvent sphere (typically water, radius 1.4 Å). Threading algorithms penalize polar residues placed in zero-SASA cores without hydrogen bonds.',
    example: 'Positively charged Arg and Lys prefer high SASA (> 50 Å² exposed).',
  },
  {
    term: 'Z-Score (Threading Confidence)',
    category: 'Algorithms',
    definition: 'A statistical measure indicating how many standard deviations the raw threading score of the best template is above the mean score of randomized/shuffled alignments.',
    analogy: 'How loudly a clear musical note stands out above white background static.',
    example: 'Z-score > 3.8 typically indicates a confident, statistically significant fold prediction.',
  },
  {
    term: 'Secondary Structure Propensity',
    category: 'Biophysics',
    definition: 'The intrinsic conformational preference of specific amino acids to adopt alpha-helical (e.g., Ala, Glu, Leu) or beta-sheet (e.g., Val, Ile, Tyr) dihedral angles in the polypeptide chain.',
    example: 'Proline breaks alpha-helices due to its rigid pyrrolidine ring lacking an amide backbone proton.',
  },
  {
    term: 'Gap Penalty',
    category: 'Algorithms',
    definition: 'An energetic cost subtracted from the alignment score when inserting or deleting amino acids to align sequences of different lengths, preventing unrealistic loop expansions.',
    example: 'Affine gap penalty uses a high penalty to open a gap and a smaller penalty to extend it.',
  },
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Fundamentals', 'Biophysics', 'Algorithms'];

  const filtered = GLOSSARY_TERMS.filter((entry) => {
    const matchesSearch =
      entry.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.analogy && entry.analogy.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = activeCategory === 'All' || entry.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl glass-panel shadow-2xl overflow-hidden border border-[var(--glass-border)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--glass-border)] glass-subtle">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl glass-card border-[var(--glass-border)] text-[#00FFFF]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Structural Biology Glossary</h3>
              <p className="text-xs text-slate-300">Essential terminology in protein folding and fold recognition</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white glass-subtle hover:border-slate-500 transition-all"
            aria-label="Close glossary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="px-6 py-3 border-b border-[var(--glass-border)] glass-subtle flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Hydrophobic core, RMSD, Twilight Zone)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm glass-subtle border border-[var(--glass-border)] rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 transition-all"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'step-active font-bold shadow-sm'
                    : 'glass-subtle text-slate-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p>No matching terms found for &ldquo;{searchTerm}&rdquo;</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.term}
                className="p-4 rounded-2xl glass-card border-[var(--glass-border)] hover:border-slate-500 transition-all space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-[#00FFFF] font-display glow-text-cyan">{item.term}</h4>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full glass-subtle text-slate-300 border border-[var(--glass-border)]">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{item.definition}</p>
                {item.analogy && (
                  <div className="text-xs p-2.5 rounded-xl glass-subtle border border-amber-500/30 text-amber-300 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-400" />
                    <span>
                      <strong className="font-medium">Mental Analogy:</strong> {item.analogy}
                    </span>
                  </div>
                )}
                <div className="text-xs text-slate-300 flex items-center gap-1.5">
                  <span className="text-slate-400 font-mono">Example:</span>
                  <span>{item.example}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
