export interface Pokemon {
  id: number;
  name: string;
  color: string;
  price: number;
  evolutions: Array<Array<string>>;
  habitat: string;
  hasGenderDifferences: boolean;
  isBaby: boolean;
  isLegendary: boolean;
  isMythical: boolean;
  /**
   * Up to 255, the higher, the happier
   */
  baseHappiness: number;
  /**
   * Up to 255, the higher, the easier to catch
   */
  captureRate: number;
  /**
   * The generation this Pokémon species was introduced in
   */
  generation: string;
  /**
   * The rate at which this Pokémon species gains levels.
   */
  growthRate: string;
  /**
   * The shape of this Pokémon for Pokédex search
   */
  shape: string;
  /**
   * The base experience gained for defeating this Pokémon.
   */
  baseExperience: number;
  /**
   * The height of this Pokémon in decimeters.
   */
  height: number;
  /**
   * The weight of this Pokémon in hectograms.
   */
  weight: number;
  /**
   * A list containing the name of the games where this pokemon appears
   */
  games: Array<string>;
  /**
   * A set of sprites used to depict this Pokémon in the game.
   */
  sprites: Array<string>;
  /**
   * A list of base stat values for this Pokémon.
   */
  stats: Array<{ name: string; baseValue: number }>;
  /**
   * A list of details showing types this Pokémon has.
   */
  types: Array<{ name: string; color: string }>;
}
