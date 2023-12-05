import React, { useMemo, useState } from 'react';
import { Todo } from './types';

interface SelectedTodoType {
  selectedTodo: Todo | null;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
}

const selectedTodoContext: SelectedTodoType = {
  selectedTodo: null,
  setSelectedTodo: () => {},
};

export const TodoContext = React.createContext(selectedTodoContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const value = useMemo(() => ({
    selectedTodo,
    setSelectedTodo,
  }), [selectedTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
