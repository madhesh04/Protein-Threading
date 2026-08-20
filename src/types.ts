export type AminoAcidCategory = 'hydrophobic' | 'hydrophilic' | 'positive' | 'negative' | 'special';

export interface AminoAcid {
  code1: string;
  code3: string;
  name: string;
  category: AminoAcidCategory;
  hydropathy: number; // Kyte-Doolittle scale (-4.5 to +4.5)
  charge: number; // at pH 7.4 (-1, 0, +1)
  description: string;
  helixPropensity: 'high' | 'medium' | 'low';
  sheetPropensity: 'high' | 'medium' | 'low';
  color: string;
}

export interface StructuralTemplate {
  id: string;
  name: string;
  pdbId: string;
  classification: string;
  description: string;
  secondaryComposition: {
    helix: number; // percentage
    sheet: number;
    loop: number;
  };
  totalResidues: number;
  coreResidues: number; // buried hydrophobic positions
  surfaceResidues: number; // solvent exposed positions
  typicalFunction: string;
  visualType: 'alpha_bundle' | 'beta_sandwich' | 'tim_barrel' | 'rossmann_fold' | 'membrane_bundle';
  color: string;
}

export interface ThreadingScoreBreakdown {
  environmentScore: number;
  contactScore: number;
  secondaryStructureScore: number;
  gapPenalty: number;
  totalScore: number;
  zScore: number;
  confidence: 'High' | 'Medium' | 'Low';
  favorableCount: number;
  unfavorableCount: number;
  neutralCount: number;
}

export interface ThreadingChallenge {
  id: string;
  title: string;
  targetName: string;
  sequence: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  correctTemplateId: string;
  templates: {
    id: string;
    name: string;
    type: string;
    score: number;
    isCorrect: boolean;
    explanation: string;
    coreMatchPercent: number;
  }[];
}
