import React, { useEffect, useState } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  getQuery: (option: string) => void,
  selectedFilter: (searchWord: string) => void,
};

export const TodoFilter: React.FC<Props> = ({ getQuery, selectedFilter }) => {
  const [queryChange, setQueryChange] = useState('');

  useEffect(() => getQuery(queryChange), [queryChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => selectedFilter(event.target.value)}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLITED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={queryChange}
          onChange={(event) => setQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {queryChange
        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
