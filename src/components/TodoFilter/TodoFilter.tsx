import React from 'react';

type Props = {
  stringFilter: string,
  setStringFilter: (a: string) => void,
  completedFilter: string,
  setCompletedFilter: (a:string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  stringFilter,
  setStringFilter,
  completedFilter,
  setCompletedFilter,
}) => {
  const filterInputHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStringFilter(event.target.value);
  };

  const clearFilter = () => {
    setStringFilter('');
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={e => setCompletedFilter(e.target.value)}
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
          value={stringFilter}
          onChange={filterInputHandle}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={clearFilter}
          />
        </span>
      </p>
    </form>
  );
};
