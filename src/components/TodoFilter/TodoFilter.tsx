import React, { ChangeEvent, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions, FilterTodoStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const handleSelect = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      filterActions.setTodoFilterStatus(event.target.value as FilterTodoStatus),
    );
  }, []);

  const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  }, []);

  const handleClearQuery = useCallback(() => {
    dispatch(filterActions.clearQuery());
  }, []);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
            <option value={FilterTodoStatus.ALL}>All</option>
            <option value={FilterTodoStatus.ACTIVE}>Active</option>
            <option value={FilterTodoStatus.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query && (
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
