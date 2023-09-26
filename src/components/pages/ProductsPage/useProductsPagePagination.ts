import { useEffect, useState } from 'react';

import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';
import { ProductType } from '../../../model/Product';

interface ReturnedObject {
  paginatedProducts: Array<Pokemon> | Array<Item>;
  pageCount: number;
  handleClickOnPage: (e: { selected: number }) => void;
}

export const useProductsPagePagination = (
  products: Array<Pokemon> | Array<Item>,
  productType: ProductType
): ReturnedObject => {
  const [resultsOffset, setResultsOffset] = useState<number>(0);

  const resultsPerPage = 40;
  const endOffset = resultsOffset + resultsPerPage;
  const paginatedProducts = products?.slice(resultsOffset, endOffset) ?? [];
  const pageCount = Math.ceil(products.length / resultsPerPage);

  const handleClickOnPage = (e: { selected: number }) => {
    document.documentElement.scrollTop = 0;
    const newOffset = (e.selected * resultsPerPage) % (products?.length ?? 1);
    setResultsOffset(newOffset);
  };

  useEffect(() => {
    setResultsOffset(0);
  }, [productType]);

  return {
    paginatedProducts,
    pageCount,
    handleClickOnPage,
  };
};
