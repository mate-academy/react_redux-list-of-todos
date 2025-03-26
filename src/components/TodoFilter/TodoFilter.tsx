import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hook';
import { Status } from '../../types/Status';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const addS = (status: Status) => {
    dispatch(filterActions.addStatus(status));
  };

  const addQ = (query: string) => {
    dispatch(filterActions.addQuery(query));
  };

  const [value, setValue] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;

    setValue(newValue);
    addQ(newValue);
  }

  function handleClick() {
    setValue('');
    addQ('');
  }

  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>) {
    addS(e.target.value as Status);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusChange}>
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
          value={value}
          onChange={handleChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
