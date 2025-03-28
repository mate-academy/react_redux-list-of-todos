import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query } = useAppSelector(state => state.filter);

  const isStatus = useCallback((value: string): value is Status => {
    return ['all', 'active', 'completed'].includes(value);
  }, []);

  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    if (isStatus(selectedValue)) {
      dispatch(setStatus(selectedValue));
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleClearQuery = () => {
    dispatch(setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusSelect}>
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
