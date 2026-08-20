import React, { useState } from 'react';
import { Pill, Activity, FlaskConical, Target, Dna, ArrowUpRight, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

export const RealWorldRelevance: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const applications = [
    {
      id: 0,
      title: 'Targeted Drug Discovery',
      icon: <Pill className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/40 bg-cyan-950/20',
      headline: 'Identifying Cryptic Binding Pockets for Small-Molecule Inhibitors',
      desc: 'Predicting the 3D fold of pathogen proteins (viral proteases, bacterial kinases) reveals druggable active sites and allosteric pockets for virtual high-throughput ligand screening.',
      example: 'Modeling orphan viral enzymes during emerging outbreaks to fast-track repurposed antivirals.',
    },
    {
      id: 1,
      title: 'Deciphering Disease Mutations',
      icon: <Activity className="w-6 h-6 text-rose-400" />,
      color: 'border-rose-500/40 bg-rose-950/20',
      headline: 'Mapping Single Nucleotide Polymorphisms (SNPs) to 3D Coordinates',
      desc: 'Translates non-synonymous clinical mutations into 3D structural disruptions—distinguishing harmless neutral polymorphisms from pathogenic misfolding triggers or active-site disruptions.',
      example: 'Predicting why a p.Arg145Cys variant destabilizes the hydrophobic core in hereditary cardiomyopathies.',
    },
    {
      id: 2,
      title: 'Custom Enzyme Engineering',
      icon: <FlaskConical className="w-6 h-6 text-amber-400" />,
      color: 'border-amber-500/40 bg-amber-950/20',
      headline: 'Redesigning Thermostable Catalytic Scaffolds for Green Chemistry',
      desc: 'Enables bioengineers to graft new catalytic triads and active-site geometries onto highly stable TIM barrel or Rossmann fold backbones for industrial biomanufacturing.',
      example: 'Engineered PETase enzymes that degrade consumer plastic bottles in hours at elevated temperatures.',
    },
    {
      id: 3,
      title: 'Unannotated Function Annotation',
      icon: <Target className="w-6 h-6 text-lime-400" />,
      color: 'border-lime-500/40 bg-lime-950/20',
      headline: 'Assigning Biochemical Roles to Uncharacterized Metagenomic Sequences',
      desc: 'When microbial sequencing yields millions of unknown genes with zero sequence homology, fold recognition matches their structural motifs to known enzymatic classes.',
      example: 'Identifying novel antibiotic resistance beta-lactamases in deep-ocean benthic sediment metagenomes.',
    },
    {
      id: 4,
      title: 'Synthetic Biology & Biosensors',
      icon: <Dna className="w-6 h-6 text-fuchsia-400" />,
      color: 'border-fuchsia-500/40 bg-fuchsia-950/20',
      headline: 'Constructing Custom Allosteric Switches and Molecular Sensors',
      desc: 'Designing synthetic proteins that undergo conformational transitions upon binding specific target metabolites, heavy metals, or environmental pollutants.',
      example: 'Fluorescent reporter sensors that signal real-time intracellular ATP and calcium fluctuations.',
    },
  ];

  const handleCardClick = (idx: number) => {
    setActiveCard(idx);
    sound.playClick(500 + idx * 50);
  };

  return (
    <section className="py-20 relative border-t border-[var(--glass-border)]">
      
      {/* Glow */}
      <div className="absolute bottom-10 left-1/4 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#00FFFF]" />
            <span className="glow-text-cyan">Biomedical & Industrial Impact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Real-World Relevance & Applications
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            By predicting a protein’s fold, researchers can better understand what the protein may do, where it may bind, and how mutations may affect its function.
          </p>
        </div>

        {/* Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app, idx) => (
            <div
              key={app.id}
              onClick={() => handleCardClick(idx)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 flex flex-col justify-between ${
                activeCard === idx
                  ? 'glass-panel border-cyan-400/80 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                  : 'glass-card border-[var(--glass-border)] hover:border-slate-500 hover:scale-[1.01]'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl glass-subtle border-[var(--glass-border)] shadow-md">
                    {app.icon}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-md glass-subtle border border-slate-700 text-slate-300">
                    Application #{app.id + 1}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">{app.title}</h3>
                <h4 className="text-xs font-mono text-[#00FFFF] font-semibold glow-text-cyan">{app.headline}</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{app.desc}</p>
              </div>

              <div className="p-3 rounded-xl glass-subtle border-[var(--glass-border)] text-xs text-slate-300 space-y-0.5">
                <strong className="text-white block font-mono text-[11px]">Real-World Scenario:</strong>
                <p className="italic text-slate-200">{app.example}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
