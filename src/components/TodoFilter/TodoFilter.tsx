import { Status } from '../../types/Status';

// interface Props {
//   filterQuery: Status;
//   setFilterQuery: React.Dispatch<React.SetStateAction<Status>>;
//   queryInput: string;
//   setQueryInput: React.Dispatch<React.SetStateAction<string>>
// }

interface Props {
  setFilteredBy: (status: Status) => void;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  query: string;
}

export const TodoFilter: React.FC<Props>
= ({
  setFilteredBy,
  setQuery,
  clearQuery,
  query,
}) => {
  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredBy(event.target.value as Status);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length !== 0 && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
