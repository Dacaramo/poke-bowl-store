import { NamedResource } from './NamedResource';

export interface Item {
  id: number;
  name: string;
  cost: number;
  flingPower: number | null;
  flingEffect: NamedResource | null;
  attributes: Array<NamedResource>;
  category: NamedResource;
  effectEntries: Array<{
    effect: string;
    shortEffect: string;
    language: NamedResource;
  }>;
  flavorTextEntries: Array<{
    text: string;
    versionGroup: NamedResource;
    language: NamedResource;
  }>;
  gameIndices: Array<{
    gameIndex: number;
    generation: NamedResource;
  }>;
  names: Array<{ name: string; language: NamedResource }>;
  sprites: {
    default: string;
  };
  heldByPokemon: Array<{
    pokemon: NamedResource;
    versionDetails: Array<{ rarity: number; version: NamedResource }>;
  }>;
  babyTriggerFor: { url: string } | null;
  machines: Array<{ machine: { url: string }; versionGroup: NamedResource }>;
}
