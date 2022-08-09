import React, { FC, useState } from 'react';

type Props = {
  handleUserChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  applyQuery: (str: string) => void;
  resetInputValue: () => void;
};

export const TodoFilter: FC<Props> = ({
  handleUserChange,
  applyQuery,
  resetInputValue,
}) => {
  const [query, setQuery] = useState('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={handleUserChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            applyQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete has-text"
            onClick={() => {
              setQuery('');
              resetInputValue();
            }}
          />
        </span>
      </p>
    </form>
  );
};
