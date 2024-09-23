import React from 'react';
import { Status } from '../../tools/constants';

type Props = {
  query: string;
  setStatus: (filterField: string) => void;
  setTitle: (title: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setStatus: setFilterField,
  setTitle,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterField(event.target.value)}
          >
            {Object.values(Status).map((field: Status) => (
              <option key={field} value={field}>
                {field[0].toUpperCase() + field.slice(1).toLowerCase()}
              </option>
            ))}
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
          onChange={event => setTitle(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitle('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
