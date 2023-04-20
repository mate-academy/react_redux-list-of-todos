import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { filterActions, FilterTodoStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const handlerSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      filterActions.setTodoFilterStatus(event.target.value as FilterTodoStatus),
    );
  };

  const handlerInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.setQuery(event.target.value));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handlerSelect}>
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
          onChange={handlerInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
