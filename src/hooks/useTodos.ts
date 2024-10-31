import { useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../App';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleResetQuery = () => {
    setQuery('');
  };

  const handleTodoReset = (value: Todo | null) => {
    setSelectedTodo(value);
  };

  return {
    todos,
    isTodosLoaded,
    filterType,
    query,
    selectedTodo,
    selectedUserId,
    setTodos,
    setIsTodosLoaded,
    setFilterType,
    setSelectedUserId,
    handleResetQuery,
    handleTodoReset,
    setQuery,
    setSelectedTodo,
  };
};
