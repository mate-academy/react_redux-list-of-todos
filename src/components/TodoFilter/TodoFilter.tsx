import { FC } from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';

export const TodoFilter: FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();
  const setStatus = (status: Status) => dispatch(
    actionsFilter.setStatus(status),
  );
  const setQuery = (value: string) => dispatch(actionsFilter.setQuery(value));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={({ target }) => setStatus(target.value as Status)}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={({ target }) => setQuery(target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="clearSearchBtn"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
