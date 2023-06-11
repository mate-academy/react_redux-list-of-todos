import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ActionTypes } from '../../types/Actions';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, query }
    = useAppSelector(state => state.filter);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let convertedStatus;

    switch (event.target.value) {
      case Status.Active:
        convertedStatus = Status.Active;
        break;
      case Status.Completed:
        convertedStatus = Status.Completed;
        break;
      default:
        convertedStatus = Status.All;
        break;
    }

    dispatch({
      type: ActionTypes.ChangeTodosStatus,
      payload: convertedStatus,
    });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => (
    dispatch({
      type: ActionTypes.ChangeTodosQuery,
      payload: event.target.value,
    })
  );

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusChange}
            value={status}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handleChangeTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch({
                type: ActionTypes.ChangeTodosQuery,
                payload: '',
              })}
              aria-label="button"
            />
          </span>
        )}
      </p>
    </form>
  );
};
