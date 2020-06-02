// eslint-disable-next-line
/// <reference types="react-scripts" />


interface TodoProps {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: UserProps;
}

interface UserProps {
  id: number;
  name: string;
  username?: string;
  email?: string;
  address?: {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: number;
    geo?: {
      lat?: number;
      lng?: number;
    };
  };
  phone?: number;
  website?: string;
  company?: {
    name?: string;
    catchPhrase?: string;
    bs?: string;
  };
}
