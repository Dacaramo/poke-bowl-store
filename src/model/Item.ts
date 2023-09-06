import { NamedResource } from './NamedResource';

export interface Item {
  /**
   * The identifier for this resource.
   */
  id: number;
  /**
   * The name for this resource.
   */
  name: string;
  /**
   * The price of this item in stores.
   */
  cost: number;
  /**
   * The power of the move Fling when used with this item.
   */
  flingPower: number | null;
  /**
   * The effect of the move Fling when used with this item.
   */
  flingEffect: NamedResource | null;
  /**
   * A list of attributes this item has.
   */
  attributes: Array<NamedResource>;
  /**
   * The category of items this item falls into.
   */
  category: NamedResource;
  /**
   * The effect of this ability listed in different languages.
   */
  effectEntries: Array<{
    /**
     * The localized effect text for an API resource in a specific language.
     */
    effect: string;
    /**
     * The localized effect text in brief.
     */
    shortEffect: string;
    /**
     * The language this effect is in.
     */
    language: NamedResource;
  }>;
  /**
   * The flavor text of this ability listed in different languages.
   */
  flavorTextEntries: Array<{
    /**
     * The localized name for an API resource in a specific language.
     */
    text: string;
    /**
     * The version group which uses this flavor text.
     */
    versionGroup: NamedResource;
    /**
     * The language this name is in.
     */
    language: NamedResource;
  }>;
  /**
   * A list of game indices relevant to this item by generation.
   */
  gameIndices: Array<{
    /**
     * The internal id of an API resource within game data.
     */
    gameIndex: number;
    /**
     * The generation relevant to this game index.
     */
    generation: NamedResource;
  }>;
  /**
   * The name of this item listed in different languages.
   */
  names: Array<{
    /**
     * The localized name for an API resource in a specific language.
     */
    name: string;
    /**
     * The language this name is in.
     */
    language: NamedResource;
  }>;
  /**
   * A set of sprites used to depict this item in the game.
   */
  sprites: {
    /**
     * The default depiction of this item.
     */
    default: string;
  };
  /**
   * A list of Pokémon that might be found in the wild holding this item.
   */
  heldByPokemon: Array<{
    /**
     * The Pokémon that holds this item.
     */
    pokemon: NamedResource;
    /**
     * The details for the version that this item is held in by the Pokémon.
     */
    versionDetails: Array<{ rarity: number; version: NamedResource }>;
  }>;
  /**
   * An evolution chain this item requires to produce a bay during mating.
   */
  babyTriggerFor: { url: string } | null;
  /**
   * A list of the machines related to this item.
   */
  machines: Array<{
    /**
     * The machine that teaches a move from an item.
     */
    machine: { url: string };
    /**
     * The version group of this specific machine.
     */
    versionGroup: NamedResource;
  }>;
}
