import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = React.memo(() => {
  const [query, setQuery] = useState('');
  const sortBy = useAppSelector(state => state.filter.status);
  const dispatch = useDispatch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.queryChange(event.target.value.toLowerCase()));
    setQuery(event.target.value);
  };

  const handleClearInput = () => {
    dispatch(filterActions.queryChange(''));
    setQuery('');
  };

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case Status.Active:
        dispatch(filterActions.statusChange(Status.Active));
        break;

      case Status.Completed:
        dispatch(filterActions.statusChange(Status.Completed));
        break;

      default:
        dispatch(filterActions.statusChange(Status.All));
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={sortBy}
            onChange={handleFilterSelect}
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
          onChange={handleInputChange}
          value={query}
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
              onClick={handleClearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
});
