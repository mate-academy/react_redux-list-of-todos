import React, { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { Filter, actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter: Filter = useAppSelector(state => state.filter);
  const { query, status } = filter;

  const dispatch = useAppDispatch();
  const selectStatus = (value: Status) => (
    dispatch(filterActions.selectStatus(value))
  );
  const setQuery = (value: string) => (
    dispatch(filterActions.setQuery(value))
  );

  const selectHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const selectValue = value as Status;

    selectStatus(selectValue);
  }, []);

  const inputHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value.toLowerCase());
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
  }, []);

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
            onChange={selectHandler}
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
          onChange={inputHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="Clear input button"
                onClick={clearQuery}
              />
            </span>
          )}
      </p>
    </form>
  );
};
