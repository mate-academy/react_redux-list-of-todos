import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const options = ['all', 'active', 'completed'];

  const handleChangeStaus = (value: Status) => {
    dispatch(
      filterActions.setStatus(value),
    );
  };

  const handleChangeQuery = (value = '') => {
    dispatch(
      filterActions.setQuery(value),
    );
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
            onChange={(e) => handleChangeStaus(e.target.value as Status)}
          >
            {options.map(option => (
              <option value={option} key={option}>{option}</option>
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
          onChange={(e) => handleChangeQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              aria-label="remove"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleChangeQuery()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
