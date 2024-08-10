import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice, Status } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [querty, setQuerty] = useState('');
  const timerId = useRef(0);

  const showClearButton = querty.trim().length > 0;

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.addStatus(e.target.value as Status));
  };

  const updateQuerty = (value: string) => {
    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      dispatch(filterSlice.actions.addQuery(value));
    }, 2000);
  };

  const onQuertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuerty(e.target.value);

    const normalizedValue = e.target.value.trim();

    if (normalizedValue.length > 0) {
      updateQuerty(normalizedValue);
    } else {
      dispatch(filterSlice.actions.removeQuery());
    }
  };

  const onQuertyDelete = () => {
    setQuerty('');
    dispatch(filterSlice.actions.removeQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onStatusChange}>
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
          value={querty}
          onChange={onQuertyChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {showClearButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onQuertyDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
