import React, {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { Filter } from '../types/Status';

export interface TypeContext {
  todos: Todo[];
  setTodos: React.Dispatch<SetStateAction<Todo[]>>;
  selectedTodos: Todo | null;
  setSelectedTodos: React.Dispatch<SetStateAction<Todo | null>>;
  filter: Filter;
  setFilter: React.Dispatch<SetStateAction<Filter>>;
  searchText: string;
  setSearchText: React.Dispatch<SetStateAction<string>>;
}

const TContext = createContext<TypeContext | null>(null);

export function useTContext() {
  return useContext(TContext);
}

export function TProvider({ children }: { children: ReactNode }) {
  // ponizej juz przejete przez redux zostawiam komponent do celów porównawczych
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodos, setSelectedTodos] = useState<Todo | null>(null);
  const [filter, setFilter] = useState<Filter>(Filter.All);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getTodos().then(json => {
      setTodos(json);
    }).catch(() => {
      throw new Error('error');
    });
  }, []);

  const contextValues: TypeContext = {
    todos,
    setTodos,
    filter,
    setFilter,
    searchText,
    setSearchText,
    selectedTodos,
    setSelectedTodos,
  };

  return (
    <TContext.Provider value={contextValues}>{children}</TContext.Provider>
  );
}
