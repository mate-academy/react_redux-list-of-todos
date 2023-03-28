import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actionsFilter } from '../../features/filter';

export const TodoFilter: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);

  useEffect(() => {
    if (localStorage.getItem('todosStatus') !== null) {
      dispatch(
        actionsFilter.setStatus(
          JSON.parse(localStorage.getItem('todosStatus') || ''),
        ),
      );
    }

    if (localStorage.getItem('todosQuery') !== null) {
      dispatch(
        actionsFilter.setQuery(
          JSON.parse(localStorage.getItem('todosQuery') || ''),
        ),
      );
    }
  }, []);

  const changeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionsFilter.setStatus(event.target.value));
    localStorage.setItem('todosStatus', JSON.stringify(event.target.value));
  };

  const addQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(event.target.value));
    localStorage.setItem('todosQuery', JSON.stringify(event.target.value));
  };

  const removeQuery = () => {
    dispatch(actionsFilter.removeQuery());
    localStorage.removeItem('todosQuery');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(event) => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={changeStatus}>
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
          value={query}
          onChange={addQuery}
          className="input"
          placeholder="Search..."
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
              onClick={removeQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
});
