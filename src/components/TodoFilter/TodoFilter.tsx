import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as FilterActions } from '../../features/filter/actions';
import { TodoStatusTypes } from '../../types/enums/TodoStatusTypes';
import { getStatusValue } from '../../utils/helpers/getStatusValue';
import { selectFilter } from '../../features/filter/selectors';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector(selectFilter);
  const dispatch = useAppDispatch();

  const handlerQuery = (
    event: React.FormEvent<HTMLInputElement>,
  ) => {
    dispatch(FilterActions.setQuery(event.currentTarget.value));
  };

  const handlerResetQuery = () => {
    dispatch(FilterActions.clearQuery());
  };

  const handlerStatusChange = (
    event: React.FormEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.currentTarget;
    const upperCasedValue = value.toUpperCase();
    const statusTodo
    = getStatusValue(upperCasedValue as keyof typeof TodoStatusTypes);

    dispatch(FilterActions.setStatus(statusTodo));
  };

  const isShowClearButton = Boolean(query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handlerStatusChange}
          >
            <option value={TodoStatusTypes.ALL}>All</option>
            <option value={TodoStatusTypes.ACTIVE}>Active</option>
            <option value={TodoStatusTypes.COMPLETED}>Completed</option>
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
          onChange={handlerQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {isShowClearButton && (
            <button
              aria-label="Clear query input"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handlerResetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
