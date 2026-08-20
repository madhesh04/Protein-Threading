import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { HeroSection } from './components/HeroSection';
import { CoreConceptSection } from './components/CoreConceptSection';
import { WhyThreadingSection } from './components/WhyThreadingSection';
import { InteractivePipeline } from './components/InteractivePipeline';
import { PrincipleSection } from './components/PrincipleSection';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { ProsAndCons } from './components/ProsAndCons';
import { RealWorldRelevance } from './components/RealWorldRelevance';
import { ThreadingChallenge } from './components/ThreadingChallenge';
import { GlossaryModal } from './components/GlossaryModal';
import { Footer } from './components/Footer';

export default function App() {
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#0D0221] text-slate-100 selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      {/* Molecular particle & flowing ribbon canvas background */}
      <ParticleBackground reducedMotion={reducedMotion} />

      {/* Floating Header & Navigation */}
      <Navbar
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        openGlossary={() => setIsGlossaryOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Core Idea: What is Protein Threading? + Bead Chain & Hanger Analogy */}
        <CoreConceptSection />

        {/* 3. Why Threading Is Needed + Twilight Zone + Divergence Simulator */}
        <WhyThreadingSection />

        {/* 4. Interactive 6-Stage Threading Workflow Pipeline */}
        <InteractivePipeline />

        {/* 5. Evolutionary Principle: Structure Changes More Slowly Than Sequence */}
        <PrincipleSection />

        {/* 6. Comparison Matrix: Homology vs. Threading vs. Ab Initio */}
        <ComparisonMatrix />

        {/* 7. Critical Evaluation: Advantages and Limitations */}
        <ProsAndCons />

        {/* 8. Real-World Relevance & Applications */}
        <RealWorldRelevance />

        {/* 9. Interactive Threading Challenge Lab */}
        <ThreadingChallenge />
      </main>

      {/* Footer */}
      <Footer openGlossary={() => setIsGlossaryOpen(true)} />

      {/* Searchable Glossary Drawer/Modal */}
      <GlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
    </div>
  );
}
