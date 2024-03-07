/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

type Props = {
  filterParam: string,
  changeParams: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string,
  queryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  deletequerry: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterParam,
  changeParams = () => {},
  query = '',
  queryChange = () => {},
  deletequerry = () => {},
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterParam}
            onChange={changeParams}
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
          value={query}
          onChange={queryChange}
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
              onClick={deletequerry}
            />
          </span>
        )}

      </p>
    </form>
  );
};
