/* eslint-disable */
/* @ts-nocheck */

import axios from 'axios';
import { makeStringDisplayable } from '../utils/stringUtils';

import {
  determinePokemonTypeColor,
  determineProductPrice,
  getArrayFromEvolutionChain,
} from '../utils/modelUtils';

import { axiosInstance } from './axiosConfig';

/* POKEMONS RELATED REQUEST SENDERS */

export const getPokemons = async () => {
  const pokemonsNames = await getPokemonsNames();
  const pokemonsMainData = await axios.all(
    pokemonsNames.map(async (name) => {
      return await getPokemonMainData(name);
    })
  );
  const pokemonsSpeciesData = await axios.all(
    pokemonsNames.map(async (name) => {
      return await getPokemonSpeciesData(name);
    })
  );

  let pokemons = [];
  for (let i = 0; i < pokemonsNames.length; i++) {
    pokemons.push({
      ...pokemonsMainData[i],
      ...pokemonsSpeciesData[i],
    });
  }

  return pokemons;
};

const getPokemonsNames = async () => {
  const axiosResponse = await axiosInstance.get('/pokemon', {
    params: {
      limit: 2000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => name);

  return neededData;
};

const getPokemonMainData = async (pokemonName) => {
  const axiosResponse = await axiosInstance.get(`/pokemon/${pokemonName}`);
  const allData = axiosResponse.data;
  const neededData = {
    id: allData.id,
    name: makeStringDisplayable(allData.name),
    price: determineProductPrice(allData, 'pokemon'),
    /* Comes in hectograms wanted in kilograms */
    weight: allData.weight / 10,
    /* Comes in decimeters, wanted in centimeters */
    height: allData.height * 10,
    baseExperience: allData.baseExperience,
    games: allData.gameIndices.map((val) => {
      makeStringDisplayable(val.version.name);
    }),
    sprites: [
      allData.other.dreamWorld.frontDefault,
      allData.other.dreamWorld.frontFemale,
      allData.other.home.frontDefault,
      allData.other.home.frontFemale,
      allData.other.home.frontShiny,
      allData.other.home.frontShinyFemale,
      allData.other.officialArtwork.frontDefault,
      allData.other.officialArtwork.frontShiny,
    ].filter((val) => val !== null),
    stats: allData.stats.map((val) => {
      return {
        name: makeStringDisplayable(val.stat.name),
        baseValue: val.baseState,
      };
    }),
    types: allData.types.map((val) => {
      return {
        name: makeStringDisplayable(val.type.name),
        color: determinePokemonTypeColor(val.type.name),
      };
    }),
  };

  return neededData;
};

const getPokemonSpeciesData = async (pokemonName) => {
  const { data: speciesData } = await axiosInstance.get(
    `/pokemon-species/${pokemonName}`
  );
  const { data: evolutionChainData } = await axios.get(
    speciesData.evolutionChain.url
  );

  const neededData = {
    color: makeStringDisplayable(speciesData.color.name),
    shape: makeStringDisplayable(speciesData.shape.name),
    habitat: makeStringDisplayable(speciesData.habitat.name),
    generation: makeStringDisplayable(speciesData.generation.name),
    baseHappiness: speciesData.baseHappiness,
    growthRate: makeStringDisplayable(speciesData.growthRate.name),
    captureRate: speciesData.captureRate,
    hasGenderDifferences: speciesData.hasGenderDifferences,
    isBaby: speciesData.isBaby,
    isLegendary: speciesData.isLegendary,
    isMythical: speciesData.isMythical,
    evolutions: getArrayFromEvolutionChain(evolutionChainData.chain),
  };

  return neededData;
};

/* ITEMS RELATED REQUEST SENDERS */

export const getItems = async () => {
  const itemsNames = await getItemNames();
  const itemsMainData = await axios.all(
    itemsNames.map(async (name) => {
      return await getItemMainData(name);
    })
  );
  const items = itemsMainData;

  return items;
};

const getItemNames = async () => {
  const axiosResponse = await axiosInstance.get('/item', {
    params: {
      limit: 3000,
    },
  });
  const allData = axiosResponse.data;
  const neededData = allData.results.map(({ name }) => name);

  return neededData;
};

const getItemMainData = async (itemName) => {
  const axiosResponse = await axiosInstance.get(`/item/${itemName}`);

  const allData = axiosResponse.data;
  const neededData = {
    id: allData.id,
    name: makeStringDisplayable(allData.name),
    price: determineProductPrice(allData, 'item'),
    attributes: allData.map(({ name }) => makeStringDisplayable(name)),
    category: makeStringDisplayable(allData.category.name),
    effect: allData.effectEntries.shortEffect,
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

  console.log('@@@@@filtersArray', filtersArray);

  const filtersObject = {
    pokemon: [
      {
        groupName: 'Main filters',
        filters: [
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
        filters: [
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
        filters: [
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
        filters: [
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
          {
            filterName: 'Games',
            filteringComponent: 'select',
            possibleValues: filtersArray[5],
          },
        ],
      },
      {
        groupName: 'Measurements',
        filters: [
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
        filters: [
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
        filters: filtersArray[7].map((statName) => {
          return {
            filterName: statName,
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
        filters: [
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
        filters: [
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

  console.log('@@@@@filtersObject', filtersObject);

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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
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
    return makeStringDisplayable(name);
  });

  return neededData;
};
