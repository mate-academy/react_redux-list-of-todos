import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [select, setSelect] = useState<Status>('all');
  const dispatch = useAppDispatch();

  const queryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizeQuery = event.target.value.toLowerCase().trim();

    setQuery(event.target.value);
    dispatch(actions.queryTodo(normalizeQuery));
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(event.target.value as Status);
    dispatch(actions.selectTodo(event.target.value as Status));
  };

  const handleClick = () => {
    setQuery('');
    dispatch(actions.queryTodo(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select value={select} onChange={selectChange} data-cy="statusSelect">
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
          onChange={queryChange}
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
              onClick={handleClick}
            />
          </span>
        )}
      </p>
    </form>
  );
};
