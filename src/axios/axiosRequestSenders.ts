import { Item } from '../model/Item';
import { Pokemon } from '../model/Pokemon';
import axios from 'axios';
import { axiosInstance } from './axiosConfig';

interface BackendResponse<T> {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
}

export const getPokemons = async (): Promise<Array<Pokemon>> => {
  const axiosResponse = await axiosInstance.get('/pokemon', {
    params: {
      limit: 2000,
    },
  });
  const backendResponse = axiosResponse.data as BackendResponse<Pokemon>;
  const results = backendResponse.results;

  const axiosResponses = await axios.all(
    results.map(({ name }) => axiosInstance.get(`pokemon/${name}`))
  );
  const pokemons = axiosResponses.map(({ data }) => data as Pokemon);

  return pokemons;
};

export const getItems = async (): Promise<Array<Item>> => {
  const axiosResponse = await axiosInstance.get('/item', {
    params: {
      limit: 3000,
    },
  });
  const backendResponse = axiosResponse.data as BackendResponse<Item>;
  const results = backendResponse.results;

  const axiosResponses = await axios.all(
    results.map(({ name }) => {
      return axiosInstance.get(`/item/${name}`);
    })
  );
  const items = axiosResponses.map(({ data }) => data as Item);

  return items;
};
