const API_URL = 'https://mate.academy/students-api/';

export const request
  // eslint-disable-next-line max-len
  = async<T> (endpoint: string, options?: RequestInit): Promise<T> => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, options);

      return await response.json();
    } catch (error) {
      throw new Error();
    }
  };
