export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// src/types/User.ts
export interface User {
  id: number;
  name: string;
}

// src/types/FilterStatus.ts
export type FilterStatus = 'all' | 'active' | 'completed';
