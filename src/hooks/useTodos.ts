import { useState } from 'react';
import { Filter } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { filterSlice } from '../features/filter';

export const useTodos = () => {
  const dispatch = useDispatch();
  const [isTodosLoaded, setIsTodosLoaded] = useState(false);

  const [filterType, setFilterType] = useState<Filter>(Filter.All);
  const [query, setQuery] = useState('');

  // const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // const [selectedUserId, setSelectedUserId] = useState<number>(0);

  const handleResetQuery = () => {
    setQuery('');
    dispatch(filterSlice.actions.settingQuery(''));
  };

  const anotherTodos = useSelector((state: RootState) => state.todos);
  const filterRightNow = useSelector(
    (state: RootState) => state.filter.status as Filter,
  );
  const queryRightNow: string = useSelector(
    (state: RootState) => state.filter.query,
  );
  const selectedTodo = useSelector((state: RootState) => state.currentTodo);
  const selectedUserId = useSelector(
    (state: RootState) => state.currentTodo?.userId,
  );

  return {
    isTodosLoaded,
    filterType,
    query,
    selectedTodo,
    selectedUserId,
    setIsTodosLoaded,
    setFilterType,
    handleResetQuery,
    setQuery,
    anotherTodos,
    filterRightNow,
    queryRightNow,
  };
};
