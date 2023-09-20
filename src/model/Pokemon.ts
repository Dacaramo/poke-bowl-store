export interface Pokemon {
  id: number;
  name: string;
  price?: number;
  types: Array<string>;
  rarity: string;
  shape?: string;
  color?: string;
  hasGenderDifferences?: boolean;
  evolutions: Array<Array<string>>;
  numberOfEvolutions: number;
  hasBranchedEvolutions: boolean;
  habitat?: string;
  generation?: string;
  games: Array<string>;
  baseHappiness?: number;
  captureRate?: number;
  growthRate?: string;
  baseExperience?: number;
  height?: number;
  weight?: number;
  sprites: Array<string>;
  stats: Array<{ name: string; baseValue: number }>;
}
