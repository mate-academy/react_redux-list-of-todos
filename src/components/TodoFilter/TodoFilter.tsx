import React from 'react';

import { Status } from '../../types/Status';

type TodoFilterProps = {
  query: string;
  setQuery: (value: string) => void;
  option: Status;
  setOption: (value: Status) => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  setQuery,
  option,
  setOption,
}) => {
  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event;

    setQuery(value);
  }

  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setOption(event.target.value as Status);
  }

  function handleQueryRefresh(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setQuery('');
  }

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={option}
            data-cy="statusSelect"
            onChange={handleOptionChange}
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
          onChange={handleQueryChange}
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryRefresh}
            />
          )}
        </span>
      </p>
    </form>
  );
};
