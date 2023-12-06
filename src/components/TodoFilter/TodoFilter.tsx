import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';
import { Status } from '../../types/Status';
import { FilterStatusEnum } from '../../types/FilterStatusEnum';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(state => state.filter);

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
            onChange={(event) => {
              dispatch(
                actionsFilter.filterBySelect(event.target.value as Status),
              );
            }}
          >
            <option value={FilterStatusEnum.ALL}>All</option>
            <option value={FilterStatusEnum.ACTIVE}>Active</option>
            <option value={FilterStatusEnum.COMPLETED}>Completed</option>
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
          onChange={(event) => {
            dispatch(actionsFilter.filterByQuery(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          { query
          && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(actionsFilter.filterByQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
