import React from 'react';

interface TodoFilterProps {
  setStatus: (status: string) => void;
  setSearchQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  setStatus,
  setSearchQuery,
}) => {
  const [query, setQuery] = React.useState('');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    setQuery(newQuery);
    setSearchQuery(newQuery);
  };

  const handleClearQuery = () => {
    setQuery('');
    setSearchQuery('');
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Search todos..."
          value={query}
          onChange={handleQueryChange}
          data-cy="searchInput"
        />
      </div>
      {query && (
        <div className="control">
          <button
            className="button is-light"
            onClick={handleClearQuery}
            data-cy="clearSearchButton"
          >
            Clear
          </button>
        </div>
      )}
      <div className="control">
        <div className="select">
          <select onChange={handleStatusChange} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};
