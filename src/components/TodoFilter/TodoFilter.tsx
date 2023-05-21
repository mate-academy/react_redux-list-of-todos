import React, { ChangeEvent, useState } from 'react';

export const TodoFilter: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchedTitle, setSearchedtitle] = useState('');

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedtitle(event.target.value);
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
            onChange={handleStatusChange}
            value={selectedStatus}
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
          value={searchedTitle}
          onChange={handleChangeTitle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchedTitle && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchedtitle('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
