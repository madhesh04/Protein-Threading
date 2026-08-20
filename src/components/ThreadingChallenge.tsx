import React, { useState } from 'react';
import { THREADING_CHALLENGES } from '../data/challenges';
import { ThreadingChallenge as ChallengeType } from '../types';
import { Trophy, CheckCircle2, XCircle, Sparkles, RefreshCw, Award, ArrowRight, ShieldQuestion } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export const ThreadingChallenge: React.FC = () => {
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Record<string, boolean>>({});

  const currentChallenge = THREADING_CHALLENGES[activeChallengeIndex];
  const selectedTemplate = currentChallenge.templates.find((t) => t.id === selectedTemplateId);

  const handleTemplateClick = (tmplId: string) => {
    setSelectedTemplateId(tmplId);
    const tmpl = currentChallenge.templates.find((t) => t.id === tmplId);

    if (tmpl?.isCorrect) {
      sound.playSuccess();
      setCompletedChallenges((prev) => ({ ...prev, [currentChallenge.id]: true }));
      // Trigger festive celebration confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#84cc16', '#06b6d4', '#ec4899', '#f59e0b'],
      });
    } else {
      sound.playClick(300);
    }
  };

  const handleNextChallenge = () => {
    setSelectedTemplateId(null);
    const nextIdx = (activeChallengeIndex + 1) % THREADING_CHALLENGES.length;
    setActiveChallengeIndex(nextIdx);
    sound.playClick(500);
  };

  const handleReset = () => {
    setSelectedTemplateId(null);
    sound.playClick(400);
  };

  return (
    <section id="challenge" className="py-20 relative border-t border-[var(--glass-border)]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-lime-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/15 border border-lime-500/30 text-lime-300 text-xs font-mono glow-text-lime">
            <Trophy className="w-3.5 h-3.5 text-[#32CD32]" />
            <span>Interactive Folding Lab</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            The Threading Challenge: Find the Right Fold!
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Test your intuition as a structural bioinformatician. Inspect the target sequence chemistry, evaluate the 3 candidate folds, and choose the most structurally compatible framework.
          </p>
        </div>

        {/* Challenge Mission Container */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-8 max-w-5xl mx-auto">
          
          {/* Challenge Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--glass-border)] pb-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {THREADING_CHALLENGES.map((ch, idx) => {
                const isCompleted = completedChallenges[ch.id];
                const isActive = activeChallengeIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setActiveChallengeIndex(idx);
                      setSelectedTemplateId(null);
                      sound.playClick(450 + idx * 50);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2 transition-all ${
                      isActive
                        ? 'step-active font-bold shadow-md'
                        : 'glass-card text-slate-400 hover:text-white'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#32CD32] glow-text-lime" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-500" />
                    )}
                    <span>Mission #{idx + 1}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md glass-card text-amber-300 border-amber-500/30">
                Difficulty: {currentChallenge.difficulty}
              </span>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg glass-subtle border-[var(--glass-border)] text-slate-300 hover:text-white"
                title="Reset Selection"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Current Target Sequence Showcase */}
          <div className="p-5 rounded-2xl glass-subtle space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#FF00FF] glow-text-magenta">Target Uncharacterized Query:</span>
                <h3 className="text-lg font-bold text-white font-display mt-0.5">{currentChallenge.targetName}</h3>
              </div>
              <span className="text-xs font-mono text-slate-300">
                {currentChallenge.sequence.length} Amino Acids
              </span>
            </div>

            {/* Sequence ribbon display */}
            <div className="p-3.5 rounded-xl bg-black/40 border border-indigo-950/60 overflow-x-auto flex items-center gap-1 font-mono text-xs">
              {currentChallenge.sequence.split('').map((char, i) => {
                const isHydrophobic = ['L', 'V', 'I', 'F', 'W', 'M', 'A'].includes(char);
                const isCharged = ['K', 'R', 'D', 'E', 'H'].includes(char);

                return (
                  <span
                    key={i}
                    className={`px-1.5 py-0.5 rounded font-bold ${
                      isHydrophobic
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : isCharged
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                        : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed glass-card p-3 rounded-xl border-[var(--glass-border)]">
              <strong className="text-[#00FFFF] glow-text-cyan">Biophysical Clues:</strong> {currentChallenge.description}
            </p>
          </div>

          {/* 3 Candidate Structural Templates */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-slate-300">
              Select the most compatible 3D structural template:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentChallenge.templates.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;
                let borderStyle = 'glass-card border-[var(--glass-border)] hover:border-slate-500';

                if (isSelected) {
                  borderStyle = tmpl.isCorrect
                    ? 'glass-card border-lime-400 text-lime-200 shadow-xl shadow-lime-950/40 ring-2 ring-lime-400/50 scale-[1.02]'
                    : 'glass-card border-rose-500 text-rose-200 shadow-xl shadow-rose-950/40 ring-2 ring-rose-500/50 scale-[1.02]';
                }

                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleTemplateClick(tmpl.id)}
                    className={`p-5 rounded-2xl border text-left transition-all space-y-3 ${borderStyle}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#00FFFF] glow-text-cyan">{tmpl.type}</span>
                      {isSelected && (
                        <span>
                          {tmpl.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-[#32CD32]" />
                          ) : (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          )}
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-white text-base font-display">{tmpl.name}</h4>

                    {isSelected && (
                      <div className="space-y-1.5 pt-2 border-t border-white/10">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">Predicted Fit Score:</span>
                          <span
                            className={`font-bold ${
                              tmpl.isCorrect ? 'text-[#32CD32]' : 'text-rose-400'
                            }`}
                          >
                            {tmpl.score} / 100
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              tmpl.isCorrect ? 'bg-[#32CD32]' : 'bg-rose-500'
                            }`}
                            style={{ width: `${tmpl.score}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results & Scientific Explanation Feedback */}
          {selectedTemplate && (
            <div
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                selectedTemplate.isCorrect
                  ? 'glass-card border-lime-500/50 text-lime-300 shadow-md shadow-lime-500/10'
                  : 'glass-card border-rose-500/50 text-rose-300 shadow-md shadow-rose-500/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base font-display flex items-center gap-2">
                  {selectedTemplate.isCorrect ? (
                    <>
                      <Sparkles className="w-5 h-5 text-[#32CD32]" />
                      <span className="glow-text-lime">Match Confirmed: Highly Favorable Fold!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400" />
                      <span className="glow-text-coral">Energetically Disfavored Match</span>
                    </>
                  )}
                </h4>

                {selectedTemplate.isCorrect && (
                  <button
                    onClick={handleNextChallenge}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-lime-500/20 text-lime-300 border border-lime-500/40 text-xs font-mono font-bold hover:bg-lime-500/30 transition-all shadow-sm"
                  >
                    <span>Next Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-sm text-slate-200 leading-relaxed bg-black/40 p-3 rounded-xl border border-white/10">
                {selectedTemplate.explanation}
              </p>

              <div className="text-xs font-semibold text-[#00FFFF] pt-1 glow-text-cyan">
                &ldquo;Threading finds the most structurally compatible fold—not simply the most similar sequence.&rdquo;
              </div>
            </div>
          )}

          {/* Grand Closing Statement Callout */}
          <div className="p-6 rounded-3xl glass-card border-[var(--glass-border-hover)] text-center space-y-3 shadow-xl shadow-cyan-500/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-subtle border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#00FFFF]" />
              <span className="glow-text-cyan">Core Takeaway</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-white font-display max-w-3xl mx-auto leading-relaxed">
              &ldquo;Protein threading turns a sequence into a structural hypothesis by asking one powerful question: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#32CD32]">Which known fold can this sequence most naturally inhabit?</span>&rdquo;
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
