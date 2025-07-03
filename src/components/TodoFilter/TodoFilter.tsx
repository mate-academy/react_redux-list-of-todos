import React, { useState } from 'react';

type Props = {
  handlerSetFilter: (type: string, search: string) => void;
};

export const TodoFilter: React.FC<Props> = ({ handlerSetFilter }) => {
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');

  const handleChange = () => {
    handlerSetFilter(status, search.trim());
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => {
        event.preventDefault();
        handleChange();
      }}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => {
              setStatus(e.target.value);
              handlerSetFilter(e.target.value, search.trim());
            }}
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
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            handlerSetFilter(status, e.target.value.trim());
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {search && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setSearch('');
                handlerSetFilter(status, '');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
