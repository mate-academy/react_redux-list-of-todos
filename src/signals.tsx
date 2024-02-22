import { signal } from '@preact/signals-react';
import { Todo } from './types/Todo';
import { FilterValues, FilterValuesType, User } from './types';

export const todos = signal<Todo[]>([]);
export const selectedTodo = signal<Todo | null>(null);
export const user = signal<User | null>(null);
export const searchQuery = signal<string>('');
export const filterValue = signal<FilterValuesType>(FilterValues.all);
