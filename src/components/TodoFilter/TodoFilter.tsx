import React from 'react';
import { useDispatch } from 'react-redux';
import { clearQuery, setQuery, setStatus } from '../../features/filter';
import { useAppSelector } from '../../hooks/useAppSelector';

const statuses = ['All', 'Active', 'Completed'];

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleStatusSelecting = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(setStatus(event.target.value));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClearQuery = () => dispatch(clearQuery());

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelecting}>
            {statuses.map(status => (
              <option
                key={`statusSelect-${status}`}
                value={status.toLowerCase()}
              >
                {status}
              </option>
            ))}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
