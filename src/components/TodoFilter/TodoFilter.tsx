import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

const statusArr: Status[] = ['all', 'active', 'completed'];

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const onChangeSelectHandler
    = (event: React.ChangeEvent<HTMLSelectElement>) => {
      return dispatch(actions.setStatus(event.target.value as Status));
    };

  const resetHandler = () => dispatch(actions.removeQuery());

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={onChangeSelectHandler}
          >
            {
              statusArr.map(status => (
                <option
                  key={status}
                  value={status}
                >
                  {
                    status[0].toUpperCase() + status.slice(1)
                  }
                </option>
              ))
            }
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={inputHandler}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          filter.query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={resetHandler}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
