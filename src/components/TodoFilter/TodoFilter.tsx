import { FC, memo } from 'react';

type TodoFilterProps = {
  query: string;
  setQuery: (query: string) => void;
  chosenStatus: string;
  setChosenStatus: (chosenStatus: string) => void;
};

const TodoFilter: FC<TodoFilterProps> = memo(
  ({ query, setQuery, chosenStatus, setChosenStatus }) => {
    const clearFilter = () => {
      setQuery('');
      setChosenStatus('all');
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={chosenStatus}
              onChange={e => setChosenStatus(e.target.value)}
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
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearFilter}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';

export default TodoFilter;
