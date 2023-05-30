import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ActionTypes } from '../../types/Actions';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedStatus, searchedTitle }
    = useAppSelector(state => state.filter);

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let convertedStatus;

    switch (event.target.value) {
      case 'active':
        convertedStatus = Status.active;
        break;
      case 'completed':
        convertedStatus = Status.completed;
        break;
      default:
        convertedStatus = Status.all;
        break;
    }

    dispatch({
      type: ActionTypes.changeTodosStatus,
      payload: convertedStatus,
    });
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => (
    dispatch({
      type: ActionTypes.changeTodosQuery,
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
            value={selectedStatus}
          >
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchedTitle}
          onChange={handleChangeTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchedTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch({
                type: ActionTypes.changeTodosQuery,
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
