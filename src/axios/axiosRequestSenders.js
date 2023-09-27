/* eslint-disable */
/* @ts-nocheck */

import axios from 'axios';
import { toReadableFormat } from '../utils/stringUtils';

import {
  determinePokemonTypeColor,
  determineProductPrice,
  extractIdFromUrl,
  getArrayFromEvolutionChain,
} from '../utils/modelUtils';

import { axiosInstance } from './axiosConfig';

/* POKEMONS RELATED REQUEST SENDERS */

export const getPokemons = async () => {
  const pokemonsIds = await getPokemonsIds();
  const pokemonsMainData = await axios.all(
    pokemonsIds.map(async (id) => {
      return await getPokemonMainData(id);
    })
  );
  const pokemonsSpeciesData = await axios.all(
    pokemonsIds.map(async (id) => {
      return await getPokemonSpeciesData(id);
    })
  );

  let pokemons = [];
  for (let i = 0; i < pokemonsIds.length; i++) {
    pokemons.push({
      ...pokemonsMainData[i],
      ...pokemonsSpeciesData[i],
    });
  }

  return pokemons;
};

const getPokemonsIds = async () => {
  const axiosResponse = await axiosInstance.get('/pokemon-species', {
    params: {
      limit: 2000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ url }) => extractIdFromUrl(url));

  return neededData;
};

const getPokemonMainData = async (pokemonId) => {
  const axiosResponse = await axiosInstance.get(`/pokemon/${pokemonId}`);
  const allData = axiosResponse.data;

  const sprites = [
    allData.sprites.other.dreamWorld.frontDefault,
    allData.sprites.other.dreamWorld.frontFemale,
    allData.sprites.other.home.frontDefault,
    allData.sprites.other.home.frontFemale,
    allData.sprites.other.home.frontShiny,
    allData.sprites.other.home.frontShinyFemale,
    allData.sprites.other.officialArtwork.frontDefault,
    allData.sprites.other.officialArtwork.frontShiny,
  ].filter((val) => val !== null);

  const neededData = {
    id: allData.id,
    price: allData.baseExperience
      ? determineProductPrice(allData, 'pokemon')
      : undefined,
    /* Comes in hectograms wanted in kilograms */
    weight: allData.weight ? allData.weight / 10 : undefined,
    /* Comes in decimeters, wanted in centimeters */
    height: allData.height ? allData.height * 10 : undefined,
    baseExperience: allData.baseExperience ?? undefined,
    games: allData.gameIndices.map((val) => {
      return toReadableFormat(val.version.name);
    }),
    sprites: sprites.length > 0 ? sprites : ['/unknownPokemon.png'],
    stats: allData.stats.map((val) => {
      return {
        name: (
          val.stat.name[0].toUpperCase() + val.stat.name.slice(1).toLowerCase()
        ).replace('-', ' '),
        baseValue: val.baseStat,
      };
    }),
    types: allData.types.map((val) => toReadableFormat(val.type.name)),
  };

  return neededData;
};

const getPokemonSpeciesData = async (pokemonId) => {
  const { data: speciesData } = await axiosInstance.get(
    `/pokemon-species/${pokemonId}`
  );
  const { data: evolutionChainData } = await axiosInstance.get(
    speciesData.evolutionChain.url
  );

  let rarity = 'Normal';
  if (speciesData.isBaby) {
    rarity = 'Baby';
  } else if (speciesData.isLegendary) {
    rarity = 'Legendary';
  } else if (speciesData.isMythical) {
    rarity = 'Mythical';
  }

  const evolutions = evolutionChainData.chain
    ? getArrayFromEvolutionChain(evolutionChainData.chain)
    : [];

  const neededData = {
    name: toReadableFormat(speciesData.name),
    color: speciesData.color
      ? toReadableFormat(speciesData.color.name)
      : undefined,
    shape: speciesData.shape
      ? toReadableFormat(speciesData.shape.name)
      : undefined,
    habitat: speciesData.habitat
      ? toReadableFormat(speciesData.habitat.name)
      : undefined,
    generation: speciesData.generation
      ? toReadableFormat(speciesData.generation.name)
      : undefined,
    growthRate: speciesData.growthRate
      ? toReadableFormat(speciesData.growthRate.name)
      : undefined,
    evolutions,
    numberOfEvolutions: evolutions.length,
    hasBranchedEvolutions: evolutions.some(
      (stepEvolutions) => stepEvolutions.length > 1
    ),
    baseHappiness: speciesData.baseHappiness ?? undefined,
    captureRate: speciesData.captureRate ?? undefined,
    hasGenderDifferences: speciesData.hasGenderDifferences ?? undefined,
    rarity,
  };

  return neededData;
};

/* ITEMS RELATED REQUEST SENDERS */

export const getItems = async () => {
  const itemsIds = await getItemsIds();
  const itemsMainData = await axios.all(
    itemsIds.map(async (id) => {
      return await getItemMainData(id);
    })
  );
  const items = itemsMainData;

  return items;
};

const getItemsIds = async () => {
  const axiosResponse = await axiosInstance.get('/item', {
    params: {
      limit: 3000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ url }) => {
    return extractIdFromUrl(url);
  });

  return neededData;
};

const getItemMainData = async (itemId) => {
  const axiosResponse = await axiosInstance.get(`/item/${itemId}`);

  const allData = axiosResponse.data;
  const neededData = {
    id: allData.id,
    name: toReadableFormat(allData.name),
    price: determineProductPrice(allData, 'item'),
    attributes: allData.attributes.map(({ name }) => toReadableFormat(name)),
    category: toReadableFormat(allData.category.name),
    sprites: [allData.sprites.default ?? '/unknownItem.png'],
    effect:
      allData.effectEntries.length > 0
        ? allData.effectEntries[0].shortEffect
        : 'Unknown description',
  };

  return neededData;
};

/* FILTERS RELATED SENDERS */

export const getFilters = async () => {
  const filtersArray = await axios.all([
    getAvailableTypes(),
    getAvailableShapes(),
    getAvailableColors(),
    getAvailableHabitats(),
    getAvailableGenerations(),
    getAvailableGames(),
    getAvailableGrowthRate(),
    getAvailableStats(),
    getAvailableAttributes(),
    getAvailableCategories(),
  ]);

  const filtersObject = {
    pokemon: [
      {
        groupName: 'Main filters',
        definitions: [
          {
            filterName: 'Name',
            filteringComponent: 'text-input',
          },
          {
            filterName: 'Price',
            lowerLimitInputName: 'Min price',
            upperLimitInputName: 'Max price',
            filteringComponent: 'range-input',
          },
          {
            filterName: 'Types',
            filteringComponent: 'checkbox-group',
            possibleValues: filtersArray[0],
            maxChecks: 2,
          },
          {
            filterName: 'Rarity',
            filteringComponent: 'select',
            possibleValues: ['Normal', 'Baby', 'Legendary', 'Mythical'],
          },
        ],
      },
      {
        groupName: 'Appearance',
        definitions: [
          {
            filterName: 'Shape',
            filteringComponent: 'select',
            possibleValues: filtersArray[1],
          },
          {
            filterName: 'Color',
            filteringComponent: 'select',
            possibleValues: filtersArray[2],
          },
          {
            filterName: 'Has gender differences?',
            filteringComponent: 'checkbox-group',
            possibleValues: ['Has gender differences?'],
            maxChecks: 1,
          },
        ],
      },
      {
        groupName: 'Evolutions',
        definitions: [
          {
            filterName: 'Number of evolutions',
            filteringComponent: 'select',
            possibleValues: ['1', '2', '3'],
          },
          {
            filterName: 'Has branched evolutions?',
            filteringComponent: 'checkbox-group',
            possibleValues: ['Has branched evolutions?'],
            maxChecks: 1,
          },
        ],
      },
      {
        groupName: 'Origin',
        definitions: [
          {
            filterName: 'Habitat',
            filteringComponent: 'select',
            possibleValues: filtersArray[3],
          },
          {
            filterName: 'Generation',
            filteringComponent: 'select',
            possibleValues: filtersArray[4],
          },
          // {
          //   filterName: 'Games',
          //   filteringComponent: 'checkbox-group',
          //   possibleValues: filtersArray[5],
          //   maxChecks: filtersArray[5].length,
          // },
        ],
      },
      {
        groupName: 'Measurements',
        definitions: [
          {
            filterName: 'Weight',
            lowerLimitInputName: 'Min weight',
            upperLimitInputName: 'Max weight',
            filteringComponent: 'range-input',
          },
          {
            filterName: 'Height',
            lowerLimitInputName: 'Min height',
            upperLimitInputName: 'Max height',
            filteringComponent: 'range-input',
          },
        ],
      },
      {
        groupName: 'Rates',
        definitions: [
          {
            filterName: 'Growth rate',
            filteringComponent: 'select',
            possibleValues: filtersArray[6],
          },
          {
            filterName: 'Capture rate',
            lowerLimitInputName: 'Min capture rate',
            upperLimitInputName: 'Max capture rate',
            filteringComponent: 'range-input',
          },
          {
            filterName: 'Base experience',
            lowerLimitInputName: 'Min base experience',
            upperLimitInputName: 'Max base experience',
            filteringComponent: 'range-input',
          },
          {
            filterName: 'Base happiness',
            lowerLimitInputName: 'Min base happiness',
            upperLimitInputName: 'Max base happiness',
            filteringComponent: 'range-input',
          },
        ],
      },
      {
        groupName: 'Stats',
        definitions: filtersArray[7].map((statName) => {
          return {
            filterName:
              statName[0].toUpperCase() + statName.slice(1).toLowerCase(),
            lowerLimitInputName: `Min ${statName.toLowerCase()}`,
            upperLimitInputName: `Max ${statName.toLowerCase()}`,
            filteringComponent: 'range-input',
          };
        }),
      },
    ],
    item: [
      {
        groupName: 'Main filters',
        definitions: [
          {
            filterName: 'Name',
            filteringComponent: 'text-input',
          },
          {
            filterName: 'Price',
            lowerLimitInputName: 'Min price',
            upperLimitInputName: 'Max price',
            filteringComponent: 'range-input',
          },
        ],
      },
      {
        groupName: 'Other filters',
        definitions: [
          {
            filterName: 'Attributes',
            filteringComponent: 'checkbox-group',
            possibleValues: filtersArray[8],
            maxChecks: filtersArray[8].length,
          },
          {
            filterName: 'Category',
            filteringComponent: 'select',
            possibleValues: filtersArray[9],
          },
        ],
      },
    ],
  };

  return filtersObject;
};

/* POKEMON FILTERS RELATED REQUEST SENDERS */

const getAvailableStats = async () => {
  const axiosResponse = await axiosInstance.get('/stat', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableHabitats = async () => {
  const axiosResponse = await axiosInstance.get('/pokemon-habitat', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableGenerations = async () => {
  const axiosResponse = await axiosInstance.get('/generation', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableColors = async () => {
  const axiosResponse = await axiosInstance.get('/pokemon-color', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableShapes = async () => {
  const axiosResponse = await axiosInstance.get('/pokemon-shape', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableGrowthRate = async () => {
  const axiosResponse = await axiosInstance.get('/growth-rate', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableGames = async () => {
  const axiosResponse = await axiosInstance.get('/version', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableTypes = async () => {
  const axiosResponse = await axiosInstance.get('/type', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

/* ITEMS FILTERS RELATED REQUEST SENDERS */

const getAvailableAttributes = async () => {
  const axiosResponse = await axiosInstance.get('/item-attribute', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};

const getAvailableCategories = async () => {
  const axiosResponse = await axiosInstance.get('/item-category', {
    params: {
      limit: 1000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => {
    return toReadableFormat(name);
  });

  return neededData;
};
