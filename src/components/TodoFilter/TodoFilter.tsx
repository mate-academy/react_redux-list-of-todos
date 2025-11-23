import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setQuery, setStatus } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filterTodo = useAppSelector((state: RootState) => state.filter);

  const setSelectedFilter = (filter: string) => {
    dispatch(setStatus(filter));
  };

  const setSelectedQuery = (query: string) => {
    dispatch(setQuery(query));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSelectedQuery('');
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={onSubmit}>
      <p className="control">
        <span className="select">
          <select
            value={filterTodo.status}
            data-cy="statusSelect"
            onChange={handleStatusChange}
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
          value={filterTodo.query}
          onChange={e => setSelectedQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

        {filterTodo.query !== '' ? (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSelectedQuery('')}
            />
          </span>
        ) : null}
      </p>
    </form>
  );
};
