import React from 'react';
import { Status } from '../../types/Status';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { deleteQuery, setFilter, setQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { status, query } = useSelector((state: RootState) => {
    return state.filterReduser;
  });

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value));
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={handleFilter}>
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
          onChange={handleQuery}
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
              onClick={() => dispatch(deleteQuery())}
            />
          </span>
        )}
      </p>
    </form>
  );
};
