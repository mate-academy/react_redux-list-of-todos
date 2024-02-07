import React, { useState } from 'react';
import { Status } from '../../enum/Status';

export const TodoFilter: React.FC = ({
  onStatus,
  onQuery,
}) => {
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const options = Object.entries(Status).map(([key, value]) => (
    <option value={value}>{key}</option>
  ));

  const handleStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selecteed = event.target.value as Status;

    setStatus(selecteed);
    onStatus(selecteed);
  };

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    setQuery(input);
    onQuery(input);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            onChange={handleStatus}
            data-cy="statusSelect"
          >
            {options}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
