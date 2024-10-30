import { useEffect, useCallback } from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useAppSelector } from '../../hooks/useAppSelector';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

interface TodoFilterProps {
  todos: Todo[];
  handleFilterChange: (filteredTodos: Todo[]) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  todos,
  handleFilterChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, status } = useAppSelector(state => state.filter);

  const handleFilterTodos = () => {
    let filteredTodos = todos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      filteredTodos = filteredTodos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    handleFilterChange(filteredTodos);
  };

  useEffect(() => {
    handleFilterTodos();
  }, [query, todos, status]);

  const handleChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(filterSlice.actions.setStatus(event.target.value as Status));
    },
    [dispatch],
  );

  const handleChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(filterSlice.actions.setQuery(event.target.value.trimStart()));
    },
    [dispatch],
  );

  const handleClearQuery = useCallback(() => {
    dispatch(filterSlice.actions.setQuery(''));
  }, [dispatch]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
