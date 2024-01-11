import React from 'react';
import { Status } from '../../types/Status';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';
import { useDebounce } from '../../hooks/useDebounce';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const [query, setQuery] = useDebounce(
    '',
    (currentQuery) => dispatch(actions.setQuery(currentQuery)),
  );

  const statusTogglerHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(actions.setStatus(event.target.value as Status));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={statusTogglerHandler}>
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear search query"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
