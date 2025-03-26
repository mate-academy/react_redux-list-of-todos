import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanQuery, query, status } from '../../features/filter';
import { Status } from '../../types/Status';
import { RootState } from '../../app/store';

export const TodoFilter: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentStatus = useSelector((state: RootState) => state.filter);

  const dispatch = useDispatch();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;

    dispatch(status(value));
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          ref={inputRef}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => {
            dispatch(query(e.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentStatus.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                clearInput();
                dispatch(cleanQuery());
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
