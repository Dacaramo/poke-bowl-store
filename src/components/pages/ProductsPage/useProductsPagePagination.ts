import { Dispatch, SetStateAction, useState } from 'react';

import { Item } from '../../../model/Item';
import { Pokemon } from '../../../model/Pokemon';

interface ReturnedObject {
  paginatedProducts: Array<Pokemon> | Array<Item>;
  pageCount: number;
  forcePage: number;
  handleClickOnPage: (e: { selected: number }) => void;
  setResultsOffset: Dispatch<SetStateAction<number>>;
}

export const useProductsPagePagination = (
  products: Array<Pokemon> | Array<Item>
): ReturnedObject => {
  const [resultsOffset, setResultsOffset] = useState<number>(
    localStorage.getItem('resultsOffset')
      ? parseInt(localStorage.getItem('resultsOffset')!)
      : 10
  );

  const resultsPerPage = 40;
  const endOffset = resultsOffset + resultsPerPage;
  const paginatedProducts = products?.slice(resultsOffset, endOffset) ?? [];
  const pageCount = Math.ceil(products.length / resultsPerPage);
  const forcePage = resultsOffset / resultsPerPage;

  const handleClickOnPage = (e: { selected: number }) => {
    document.documentElement.scrollTop = 0;
    const newOffset = (e.selected * resultsPerPage) % (products?.length ?? 1);
    setResultsOffset(newOffset);
    localStorage.setItem('resultsOffset', newOffset.toString());
  };

  return {
    paginatedProducts,
    pageCount,
    forcePage,
    handleClickOnPage,
    setResultsOffset,
  };
};
