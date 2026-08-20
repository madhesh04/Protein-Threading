import React, { useState, useEffect } from 'react';
import { Dna, BookOpen, Volume2, VolumeX, Eye, Sparkles, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  openGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  reducedMotion,
  setReducedMotion,
  openGlossary,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playSuccess();
  };

  const navLinks = [
    { label: 'Analogy', href: '#analogy' },
    { label: 'Why Needed', href: '#why-needed' },
    { label: '6-Stage Workflow', href: '#workflow' },
    { label: 'Evolutionary Principle', href: '#principle' },
    { label: 'Approaches', href: '#comparison' },
    { label: 'Pros & Cons', href: '#pros-cons' },
    { label: 'Challenge Lab', href: '#challenge' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0D0221]/75 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-lg shadow-black/30">
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#FF00FF] via-[#00FFFF] to-[#32CD32] transition-all duration-150 shadow-[0_0_8px_rgba(0,255,255,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] p-[1px] shadow-lg shadow-fuchsia-500/20 group-hover:shadow-cyan-400/40 transition-all">
            <div className="w-full h-full bg-[#0D0221] rounded-[11px] flex items-center justify-center">
              <Dna className="w-5 h-5 text-[#00FFFF] group-hover:rotate-12 transition-transform drop-shadow-[0_0_6px_#00FFFF]" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-white font-display group-hover:text-cyan-300 transition-colors glow-text-cyan">
              Protein Threading
            </span>
            <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-wider glow-text-magenta">
              Fold Recognition Engine
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/20 border border-transparent rounded-lg transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
            className={`p-2 rounded-xl border text-xs font-mono transition-all ${
              soundEnabled
                ? 'bg-fuchsia-500/25 border-fuchsia-400 text-fuchsia-300 shadow-md shadow-fuchsia-500/20'
                : 'glass-card text-slate-400 hover:text-white hover:border-cyan-400/40'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            title={reducedMotion ? 'Enable Full Animation' : 'Reduce Motion'}
            className={`p-2 rounded-xl border text-xs font-mono transition-all ${
              reducedMotion
                ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-md shadow-amber-500/20'
                : 'glass-card text-slate-400 hover:text-white hover:border-cyan-400/40'
            }`}
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Glossary Modal Button */}
          <button
            onClick={openGlossary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/30 hover:border-cyan-400 transition-all text-xs font-medium shadow-sm shadow-cyan-500/20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Glossary</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 glass-panel border-t border-[var(--glass-border)] space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
