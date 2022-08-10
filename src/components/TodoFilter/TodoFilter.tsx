/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';

import Status from '../../enums/Status';

type Props = {
  onFilterChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  onRandomizeClick: () => void;
};

const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onQueryChange,
  onRandomizeClick,
}) => {
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(
    debounce(onQueryChange, 500),
    [],
  );

  const handleInput = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={({ target }) => onFilterChange(target.value)}
          >
            {Object.keys(Status).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={({ target }) => handleInput(target.value)}
          data-cy="searchInput"
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInput('')}
            />
          </span>
        )}
      </p>

      <p className="control">
        <button
          type="button"
          className="button"
          onClick={onRandomizeClick}
        >
          Randomize
        </button>
      </p>
    </form>
  );
};

export default React.memo(TodoFilter);
