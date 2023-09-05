import { NamedResource } from './NamedResource';

export interface Pokemon {
  id: number;
  name: string;
  baseExperience: number;
  height: number;
  isDefault: boolean;
  order: number;
  weight: number;
  abilities: Array<{ isHidden: boolean; slot: number; ability: NamedResource }>;
  forms: Array<NamedResource>;
  gameIndices: Array<{ gameIndex: number; version: NamedResource }>;
  heldItems: Array<{
    item: NamedResource;
    versionDetails: Array<{ rarity: number; version: NamedResource }>;
  }>;
  locationAreaEncounters: string;
  moves: Array<{
    move: NamedResource;
    versionGroupDetails: Array<{
      levelLearnedAt: number;
      versionGroup: NamedResource;
      moveLearnMethod: NamedResource;
    }>;
  }>;
  species: NamedResource;
  sprites: {
    other: {
      dreamWorld: {
        frontDefault: string | null;
        frontFemale: string | null;
      };
      officialArtwork: {
        frontDefault: string | null;
        frontShiny: string | null;
      };
      home: {
        frontDefault: string | null;
        frontFemale: string | null;
        frontShiny: string | null;
        frontShinyFemale: string | null;
      };
    };
  };
  stats: Array<{ baseStat: number; effort: number; stat: NamedResource }>;
  types: Array<{ slot: number; type: NamedResource }>;
  pastTypes: Array<{
    generation: NamedResource;
    types: Array<{ slot: number; type: NamedResource }>;
  }>;
}
