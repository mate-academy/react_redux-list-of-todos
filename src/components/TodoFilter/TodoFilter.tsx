import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useAppSelector(state => state.filter);

  const setQuery = (newValue: string) => {
    dispatch({ type: 'filter/SET_QUERY', payload: newValue });
  };

  const clearQuery = () => {
    dispatch({ type: 'filter/SET_QUERY', payload: '' });
  };

  const onStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'filter/SET_STATUS', payload: event.target.value });
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
            value={filters.status}
            onChange={onStatusChange}
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
          value={filters.query}
          onChange={e => {
            setQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {filters.query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
