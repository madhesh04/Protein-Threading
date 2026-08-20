# 🧬 Protein Threading: Finding the Right Fold

An interactive, visual, and educational web platform for exploring **Protein Threading (Fold Recognition)** — an advanced computational biology methodology used to predict 3D protein structure by aligning amino acid sequences onto known structural templates.

---

## ✨ Features

- **Interactive Core Concept Demonstrator**: Understand how target amino acid sequences are "threaded" through candidate structural scaffolds (Alpha/Beta Barrels, Beta-Sandwiches, Helical Bundles).
- **Sequence Divergence & Twilight Zone Simulator**: Explore sequence identity thresholds (>30% Homology, 20-30% Twilight Zone, <20% Midnight Zone) and see why threading is necessary when sequence homology fails.
- **6-Stage Interactive Threading Pipeline**:
  1. **Target Sequence Input**: Select preset targets (e.g. Ubiquitin, TIM Barrel, GB1) or paste custom FASTA sequences.
  2. **Template Structural Library**: Query structural databases (PDB, CATH, SCOP).
  3. **Threading & Alignment Engine**: Dynamically thread sequences into structural backbone templates.
  4. **Energy Scoring Dashboard**: Analyze pairwise contact potentials, solvation energy, and secondary structure preference scores.
  5. **Fold Candidate Leaderboard**: Rank target-template alignments by Z-Score, TM-Score, and RMSD.
  6. **3D Structural Refinement**: Visualize interactive 3D protein structures using Three.js web rendering.
- **Principle & Comparison Matrix**: Deep dive into the evolutionary principle (*structure changes more slowly than sequence*) and compare **Homology Modeling vs. Threading vs. Ab Initio Folding**.
- **Interactive Threading Challenge Lab**: Hands-on challenge to solve threading tasks and evaluate structural compatibility scores.
- **Searchable Glossary & Audio Feedback**: Built-in terminology lookup with Web Audio API sound synthesis.

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + Motion (Framer Motion)
- **3D Visualization**: Three.js + Canvas Confetti
- **Icons**: Lucide React
- **Audio**: Web Audio API Sound Effects

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- `npm` or `bun`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/madhesh04/Protein-Threading.git
   cd Protein-Threading
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

---

## 🛠️ Build & Lint

To check TypeScript types:
```bash
npm run lint
```

To build for production:
```bash
npm run build
```

---

## 📜 License

MIT License. Developed for learning, structural biology education, and computational research.
