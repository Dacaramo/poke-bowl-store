import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

const baseURL = 'https://pokeapi.co/api/v2';

export const axiosInstance = axios.create({
  baseURL,
});

/**
 * All props of the response bodies must be received in camel case format
 * in order to follow the frontend conventions
 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<Record<string, unknown>>) => {
    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
  }
);

/**
 * All url parameters are expected to be received by the API as strings in
 * snake case format. Additionally the request bodies props must be also in
 * snake case
 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const params = config.params as Record<string, unknown>;
    if (params) {
      config.params = snakecaseKeys(params, { deep: true });
    }

    const body = config.data as Record<string, unknown>;
    if (body) {
      config.data = snakecaseKeys(body, { deep: true });
    }

    return config;
  }
);
