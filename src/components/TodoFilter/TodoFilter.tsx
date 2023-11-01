/* eslint-disable max-len */
import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as FilterActions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [enteredQuery, setEnteredQuery] = useState<string>('');
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(state => state.filter);
  const clearQuery = () => {
    setEnteredQuery('');
    dispatch(FilterActions.clearQuery());
  };

  const setStatus = (value: Status) => dispatch(FilterActions.setStatus(value));
  const timerId = useRef(0);
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;

    setEnteredQuery(val);

    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      dispatch(FilterActions.setQuery(val.toLocaleLowerCase()));
    }, 500);
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
            onChange={e => setStatus(e.currentTarget.value as Status)}
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
          value={enteredQuery}
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => clearQuery()}
            />
          </span>
        )}
      </p>
    </form>
  );
};
