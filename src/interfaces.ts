export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  id: number;
  userId: number;
  street: string;
  suit: string;
  city: string;
  zipcode: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  createdAt: string;
  updatedAt: string;
  address: Address;
}

export interface TodosWithUser extends Todo {
  user: User;
}
