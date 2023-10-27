import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { Filter } from '../../types/Filter';

type Context = {
  shownTodo: Todo | null;
  setShownTodo: React.Dispatch<React.SetStateAction<Todo | null>>
  filter: Filter,
  setFilter: React.Dispatch<Filter>
};

const initialFilterState: Filter = {
  global: Status.All,
  query: '',
};

const initialContext: Context = {
  shownTodo: null,
  setShownTodo: () => {},
  filter: initialFilterState,
  setFilter: () => {},
};

export const TodosContext = (
  React.createContext(initialContext)
);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [shownTodo, setShownTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(initialFilterState);

  return (
    <TodosContext.Provider value={{
      shownTodo,
      setShownTodo,
      filter,
      setFilter,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
