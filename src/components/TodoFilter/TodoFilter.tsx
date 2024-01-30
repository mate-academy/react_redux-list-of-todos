import React, { useState } from 'react';
import { Status } from '../../enums/Status';

const options = Object.entries(Status).map(([key, value]) => (
  <option key={value} value={value}>
    {key}
  </option>
));

type Props = {
  onSelectStatus: (status: Status) => void;
  onEnterQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  onSelectStatus,
  onEnterQuery,
}) => {
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value as Status;

    setStatus(selected);
    onSelectStatus(selected);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredQuery = event.target.value;

    setQuery(enteredQuery);
    onEnterQuery(enteredQuery);
  };

  const handleQueryClear = () => {
    setQuery('');
    onEnterQuery('');
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
            value={status}
            onChange={handleStatusChange}
          >
            {options}
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
          onChange={handleQueryChange}
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
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
