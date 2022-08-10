import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions as todosActions } from '../../store/todos';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [status, setStutus] = useState('');
  const [query, setQuery] = useState('');
  const reset = () => {
    setQuery('');
  };

  useEffect(() => {
    switch (status) {
      case 'completed':
        dispatch(todosActions.filterByCompletedTodos(query));
        break;

      case 'active':
        dispatch(todosActions.filterByActiveTodos(query));
        break;

      default:
        dispatch(todosActions.filterAllTodos(query));
    }
  }, [query, status]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => setStutus(event.target.value)}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
