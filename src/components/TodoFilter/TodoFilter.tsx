import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { actions as filterActions } from '../../store/filterReducer';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const reset = () => {
    dispatch(filterActions.setQueryFilter(''));
    dispatch(filterActions.SetCompletedFilter('filter-all'));
  };

  const apllyQuery = useCallback(
    debounce((e) => dispatch(filterActions.setQueryFilter(e)), 500),
    [],
  );

  const handleStatusFilter = (e: string) => {
    dispatch(filterActions.SetCompletedFilter(e));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => handleStatusFilter(event.target.value)}
          >
            <option value="filter-all">All</option>
            <option value="filter-active">Active</option>
            <option value="filter-completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            apllyQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete has-text"
              onClick={reset}
            />
          </span>
        )}

      </p>
    </form>
  );
};
