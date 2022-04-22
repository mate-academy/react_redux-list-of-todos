import { BASE_URL } from './api.constants';

export const getData = (endpoint: string, options = {}) => {
  return fetch(BASE_URL + endpoint, options)
    .then(response => response.json());
};
