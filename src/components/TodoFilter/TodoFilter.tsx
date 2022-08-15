import React, { useEffect, useState } from 'react';
import { SelectOptions } from '../../types/Select_otions';

type Props = {
  todoFilter: (query: string, option: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ todoFilter }) => {
  const [query, setQuery] = useState('');
  const [option, setOption] = useState(SelectOptions.ALL);

  useEffect(() => {
    todoFilter(query, option);
  }, [query, option]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setOption(event.target.value as SelectOptions)}
          >
            <option value={SelectOptions.ALL}>All</option>
            <option value={SelectOptions.ACTIVE}>Active</option>
            <option value={SelectOptions.COMPLETED}>Completed</option>
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
