import React from 'react';
import { useDispatch } from 'react-redux';
import {
  clearStatus,
  filterByQuery,
  filterBySelect,
} from '../../features/filter';
import { useAppSelector } from '../../hooks/useAppSelector';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);

  const handleOnChange = (val: string) => {
    dispatch(filterByQuery(val));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              const value = e.target.value.toLocaleLowerCase();

              dispatch(filterBySelect(value));
            }}
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
          onChange={e => handleOnChange(e.target.value)}
          value={query}
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
              onClick={() => dispatch(clearStatus(null))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
