import { User } from '../types/UserType';

const API_URL = 'http://23.88.43.148';

const request = async (url: string, options: {}) => {
  const response = await fetch(`${API_URL}${url}`, options);

  const result = await response.json()
    .catch(error => {
      throw Error(`${error}`);
    });

  return result;
};

export const post = (url: string, data: User): Promise<void> => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const correct = (url: string, data: Partial<User>): Promise<void> => {
  return request(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
};

export const remove = (url: string) => {
  return request(url, { method: 'DELETE' });
};

export const getUsers = async (): Promise<User[]> => {
  const result = await request('/users', { method: 'GET' });

  return result;
};

export const createUser = (newUser: User) => {
  return post('/users', newUser);
};

export const updateUser = (userId: number, correctData: Partial<User>) => {
  return correct((`/user/${userId}`), correctData);
};

export const deleteUser = (userId: number) => {
  return remove(`/user/${userId}`);
};
