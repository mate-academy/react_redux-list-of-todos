import React, { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = memo(
  () => {
    const { query, status } = useAppSelector(state => state.filter);
    const dispatch = useAppDispatch();

    const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;

      switch (value) {
        case Status.ALL:
          dispatch(actions.allTodos());
          break;

        case Status.ACTIVE:
          dispatch(actions.activeTodos());
          break;

        case Status.COMPLETED:
          dispatch(actions.completedTodos());
          break;

        default:
          break;
      }
    };

    const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      dispatch(actions.queryFilter(value));
    };

    const resetQuery = () => {
      dispatch(actions.queryFilter(''));
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
              onChange={handleStatus}
              value={status}
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
            value={query}
            onChange={handleQuery}
            className="input"
            placeholder="Search..."
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {!!query.length && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={resetQuery}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
