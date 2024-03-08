import React from 'react';

interface Props {
  onStatusSelect: (str: string) => void;
  onQueryChange: (str: string) => void;
  currentStatus: string;
  currentQuery: string;
}

export const TodoFilter: React.FC<Props> = ({
  onStatusSelect,
  onQueryChange,
  currentStatus,
  currentQuery,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusSelect(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleQueryReset = () => {
    onQueryChange('');
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
            value={currentStatus}
            onChange={handleSelectChange}
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
          value={currentQuery}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {currentQuery !== '' && (
            <button
              aria-label="CLEAR"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
