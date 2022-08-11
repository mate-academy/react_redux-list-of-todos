import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  changeFilteredBy: (filterType: string) => void,
  changeQuery: (input: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  changeFilteredBy,
  changeQuery,
  query,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeFilteredBy(event.target.value);
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => handleChange(event)}
          >
            <option
              value={Filter.ALL}
            >
              All
            </option>

            <option
              value={Filter.ACTIVE}
            >
              Active
            </option>

            <option
              value={Filter.COMPLETED}
            >
              Completed
            </option>
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
          onChange={handleChangeQuery}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete has-text"
            onClick={() => changeQuery('')}
          />
        </span>
      </p>
    </form>
  );
};
