import { NamedResource } from './NamedResource';

export interface Pokemon {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The base experience gained for defeating this Pokémon.
   */
  baseExperience: number;
  /**
   * The height of this Pokémon in decimeters.
   */
  height: number;
  /**
   * Set for exactly one Pokémon used as the default for each species.
   */
  isDefault: boolean;
  /**
   * Order for sorting. Almost national order, except families are grouped
   * together.
   */
  order: number;
  /**
   * The weight of this Pokémon in hectograms.
   */
  weight: number;
  /**
   * A list of abilities this Pokémon could potentially have.
   */
  abilities: Array<{
    /**
     * Whether or not this is a hidden ability.
     */
    isHidden: boolean;
    /**
     * The slot this ability occupies in this Pokémon species.
     */
    slot: number;
    /**
     * The ability the Pokémon may have.
     */
    ability: NamedResource;
  }>;
  /**
   * A list of forms this Pokémon can take on.
   */
  forms: Array<NamedResource>;
  /**
   * A list of game indices relevant to Pokémon item by generation.
   */
  gameIndices: Array<{ gameIndex: number; version: NamedResource }>;
  /**
   * A list of items this Pokémon may be holding when encountered.
   */
  heldItems: Array<{
    /**
     * The item the referenced Pokémon holds.
     */
    item: NamedResource;
    /**
     * The details of the different versions in which the item is held.
     */
    versionDetails: Array<{ rarity: number; version: NamedResource }>;
  }>;
  /**
   * A link to a list of location areas, as well as encounter details
   * pertaining to specific versions.
   */
  locationAreaEncounters: string;
  /**
   * A list of moves along with learn methods and level details pertaining to
   * specific version groups.
   */
  moves: Array<{
    /**
     * The move the Pokémon can learn.
     */
    move: NamedResource;
    /**
     * The details of the version in which the Pokémon can learn the move.
     */
    versionGroupDetails: Array<{
      /**
       * The minimum level to learn the move.
       */
      levelLearnedAt: number;
      /**
       * The version group in which the move is learned.
       */
      versionGroup: NamedResource;
      /**
       * The method by which the move is learned.
       */
      moveLearnMethod: NamedResource;
    }>;
  }>;
  /**
   * The species this Pokémon belongs to.
   */
  species: NamedResource;
  /**
   * A set of sprites used to depict this Pokémon in the game.
   */
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
  /**
   * A list of base stat values for this Pokémon.
   */
  stats: Array<{ baseStat: number; effort: number; stat: NamedResource }>;
  /**
   * A list of details showing types this Pokémon has.
   */
  types: Array<{ slot: number; type: NamedResource }>;
  /**
   * A list of details showing types this pokémon had in previous generations.
   */
  pastTypes: Array<{
    /**
     * The last generation in which the referenced pokémon had the listed types.
     */
    generation: NamedResource;
    /**
     * The types the referenced pokémon had up to and including the listed
     * generation.
     */
    types: Array<{ slot: number; type: NamedResource }>;
  }>;
}
