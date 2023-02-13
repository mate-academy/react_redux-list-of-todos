import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
// import { useAppSelector } from '../../app/hooks';
import { actions as filterAction } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;

    dispatch(filterAction.setQuery(val.trim()));
  };

  const handleSetStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target || '';

    if (value === Status.Active
      || value === Status.All
      || value === Status.Completed) {
      dispatch(filterAction.setStatus(value));
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSetStatus}
          >
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
          value={query}
          onChange={handleSetQuery}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => dispatch(filterAction.setQuery(''))}
              />
            </span>
          )}

      </p>
    </form>
  );
};
