import { FilterValue } from '../../../model/Filter';
import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';

interface ReturnedObject {
  filteredProducts: Array<Pokemon> | Array<Item>;
}

export const useProductsPageFiltering = (
  products: Array<Pokemon> | Array<Item>,
  productType: ProductType,
  filterValues: Record<string, FilterValue>
): ReturnedObject => {
  let filteredProducts = [...products] as Array<Pokemon> | Array<Item>;

  if ('Name' in filterValues) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name
        .toLowerCase()
        .includes(filterValues['Name'] as string);
    }) as Array<Pokemon> | Array<Item>;
  }
  if ('Min price' in filterValues) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.price) {
        return false;
      }
      return product.price >= (filterValues['Min price'] as number);
    }) as Array<Pokemon> | Array<Item>;
  }
  if ('Max price' in filterValues) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.price) {
        return false;
      }
      return product.price <= (filterValues['Max price'] as number);
    }) as Array<Pokemon> | Array<Item>;
  }

  if (productType === 'pokemon') {
    if ('Types' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (filterValues['Types'] as Array<string>).every((type) => {
          return (product as Pokemon).types.includes(type);
        });
      }) as Array<Pokemon>;
    }
    if ('Rarity' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (product as Pokemon).rarity === filterValues['Rarity'];
      }) as Array<Pokemon>;
    }
    if ('Shape' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).shape) {
          return false;
        }
        return (product as Pokemon).shape === filterValues['Shape'];
      }) as Array<Pokemon>;
    }
    if ('Color' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).color) {
          return false;
        }
        return (product as Pokemon).color === filterValues['Color'];
      }) as Array<Pokemon>;
    }
    if ('Has gender differences?' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).hasGenderDifferences) {
          return false;
        }
        return (product as Pokemon).hasGenderDifferences;
      }) as Array<Pokemon>;
    }
    if ('Number of evolutions' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (
          (product as Pokemon).numberOfEvolutions ===
          parseInt(filterValues['Number of evolutions'] as string)
        );
      }) as Array<Pokemon>;
    }
    if ('Has branched evolutions?' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (product as Pokemon).hasBranchedEvolutions;
      }) as Array<Pokemon>;
    }
    if ('Habitat' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).habitat) {
          return false;
        }
        return (product as Pokemon).habitat === filterValues['Habitat'];
      }) as Array<Pokemon>;
    }
    if ('Generation' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).generation) {
          return false;
        }
        return (product as Pokemon).generation === filterValues['Generation'];
      }) as Array<Pokemon>;
    }
    if ('Games' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (filterValues['Games'] as Array<string>).every((game) => {
          return (product as Pokemon).games.includes(game);
        });
      }) as Array<Pokemon>;
    }
    if ('Min weight' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).weight) {
          return false;
        }
        return (
          (product as Pokemon).weight! >= (filterValues['Min weight'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max weight' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).weight) {
          return false;
        }
        return (
          (product as Pokemon).weight! <= (filterValues['Max weight'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min height' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).height) {
          return false;
        }
        return (
          (product as Pokemon).height! >= (filterValues['Min height'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max height' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).height) {
          return false;
        }
        return (
          (product as Pokemon).height! <= (filterValues['Max height'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Growth rate' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).growthRate) {
          return false;
        }
        return (product as Pokemon).growthRate === filterValues['Growth rate'];
      }) as Array<Pokemon>;
    }
    if ('Min capture rate' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).captureRate) {
          return false;
        }
        return (
          (product as Pokemon).captureRate! >=
          (filterValues['Min capture rate'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max capture rate' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).captureRate) {
          return false;
        }
        return (
          (product as Pokemon).captureRate! <=
          (filterValues['Max capture rate'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min base experience' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).baseExperience) {
          return false;
        }
        return (
          (product as Pokemon).baseExperience! >=
          (filterValues['Min base experience'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max base experience' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).baseExperience) {
          return false;
        }
        return (
          (product as Pokemon).baseExperience! <=
          (filterValues['Max base experience'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min base happiness' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).baseHappiness) {
          return false;
        }
        return (
          (product as Pokemon).baseHappiness! >=
          (filterValues['Min base happiness'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max base happiness' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!(product as Pokemon).baseHappiness) {
          return false;
        }
        return (
          (product as Pokemon).baseHappiness! <=
          (filterValues['Max base happiness'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min hp' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Hp';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue >= (filterValues['Min hp'] as number);
      }) as Array<Pokemon>;
    }
    if ('Max hp' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Hp';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue <= (filterValues['Max hp'] as number);
      }) as Array<Pokemon>;
    }
    if ('Min attack' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Attack';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue >= (filterValues['Min attack'] as number);
      }) as Array<Pokemon>;
    }
    if ('Max attack' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Attack';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue <= (filterValues['Max attack'] as number);
      }) as Array<Pokemon>;
    }
    if ('Min defense' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Defense';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue >= (filterValues['Min defense'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max defense' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Defense';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue <= (filterValues['Max defense'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min special attack' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Special attack';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue >=
          (filterValues['Min special attack'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max special attack' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Special attack';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue <=
          (filterValues['Max special attack'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min special defense' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Special defense';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue >=
          (filterValues['Min special defense'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max special defense' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Special defense';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue <=
          (filterValues['Max special defense'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min speed' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Speed';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue >= (filterValues['Min speed'] as number);
      }) as Array<Pokemon>;
    }
    if ('Max speed' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Speed';
        });
        if (!searchedStat) {
          return false;
        }
        return searchedStat.baseValue <= (filterValues['Max speed'] as number);
      }) as Array<Pokemon>;
    }
    if ('Min accuracy' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Accuracy';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue >= (filterValues['Min accuracy'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max accuracy' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Accuracy';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue <= (filterValues['Max accuracy'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Min evasion' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Evasion';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue >= (filterValues['Min evasion'] as number)
        );
      }) as Array<Pokemon>;
    }
    if ('Max evasion' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        const searchedStat = (product as Pokemon).stats.find(({ name }) => {
          return name === 'Evasion';
        });
        if (!searchedStat) {
          return false;
        }
        return (
          searchedStat.baseValue <= (filterValues['Max evasion'] as number)
        );
      }) as Array<Pokemon>;
    }
  } else if (productType === 'item') {
    if ('Attributes' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (filterValues['Attributes'] as Array<string>).every(
          (attribute) => {
            return (product as Item).attributes.includes(attribute);
          }
        );
      }) as Array<Item>;
    }
    if ('Category' in filterValues) {
      filteredProducts = filteredProducts.filter((product) => {
        return (product as Item).category === filterValues['Category'];
      }) as Array<Item>;
    }
  }

  return {
    filteredProducts,
  };
};
