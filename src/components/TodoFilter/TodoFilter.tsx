import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterSlice, Status } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const timerId = useRef(0);

  const displayButton = query.trim().length > 0;

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.addStatus(e.target.value as Status));
  };

  const updateQuery = (value: string) => {
    window.clearTimeout(timerId.current);
    timerId.current = window.setTimeout(() => {
      dispatch(filterSlice.actions.addQuery(value));
    }, 2000);
  };

  const changeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    const normalizedValue = e.target.value.trim();

    if (normalizedValue.length > 0) {
      updateQuery(normalizedValue);
    } else {
      dispatch(filterSlice.actions.removeQuery());
    }
  };

  const deleteQuery = () => {
    setQuery('');
    dispatch(filterSlice.actions.removeQuery());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={changeStatus}>
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
          value={query}
          onChange={changeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {displayButton && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
