import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/useAppSelector';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.selectStatus(event.target.value as Status));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterSlice.actions.addQuery(event.target.value));
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
            value={status}
            onChange={onFilterChange}
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
          onChange={onInputChange}
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
              onClick={() => dispatch(filterSlice.actions.addQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
