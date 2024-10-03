import React from 'react';
import { Status } from '../../utils/status';
type Props = {
  query: string;
  setStatus: (filterField: string) => void;
  setTitle: (title: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setTitle,
  setStatus,
}) => {
  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={e => setStatus(e.target.value)}>
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
          onChange={e => setTitle(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
