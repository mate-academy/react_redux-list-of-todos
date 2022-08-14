import React, { useState } from 'react';

type Props = {
  visibleTodosSelect:(selectOption:string) => void,
  visibleTodosInput:(query:string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  visibleTodosSelect,
  visibleTodosInput,
}) => {
  const [query, setQuery] = useState('');

  const handleChangeSelect = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    visibleTodosSelect(value);
  };

  const handleChangeInput = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    setQuery(value);
    visibleTodosInput(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleChangeSelect}
          >
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
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
          onChange={handleChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                visibleTodosInput('');
              }}
            />
          </span>
        )}

      </p>
    </form>
  );
};
