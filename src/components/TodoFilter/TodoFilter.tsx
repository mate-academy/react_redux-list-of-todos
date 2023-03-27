import React, { memo, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = memo(() => {
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const { status } = useAppSelector(state => state.filter);

  const setFilterQuery = (newQuery: string) => {
    dispatch(filterActions.setFilterQuery(newQuery));
  };

  const debouncedQuery = useCallback(
    debounce(setFilterQuery, 300),
    [],
  );

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debouncedQuery(event.target.value);
  };

  const handleQueryReset = () => {
    setQuery('');
    dispatch(filterActions.setFilterQuery(''));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    switch (value) {
      case Status.ALL:
        dispatch(filterActions.setFilterStatus(Status.ALL));
        break;

      case Status.ACTIVE:
        dispatch(filterActions.setFilterStatus(Status.ACTIVE));
        break;

      case Status.COMPLETED:
        dispatch(filterActions.setFilterStatus(Status.COMPLETED));
        break;

      default:
        break;
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
            value={status}
            onChange={handleStatusChange}
          >
            <option value={Status.ALL}>All</option>
            <option value={Status.ACTIVE}>Active</option>
            <option value={Status.COMPLETED}>Completed</option>
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

        { query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          </span>
        )}
      </p>
    </form>
  );
});
