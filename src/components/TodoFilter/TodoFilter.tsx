import React from 'react';

type Props = {
  setMatching: (matching: string) => void;
  matching: string;
  titling: string;
  setTitling: (titling: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setMatching,
  matching,
  titling,
  setTitling,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={matching}
            onChange={e => setMatching(e.target.value)}
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
          value={titling}
          onChange={e => setTitling(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {titling && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setTitling('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
