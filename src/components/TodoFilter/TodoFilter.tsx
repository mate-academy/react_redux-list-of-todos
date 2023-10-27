import { ChangeEvent, FC } from 'react';
import { ChangeQueryAction, ChangeStatusAction } from '../../features/filter';

interface Filter {
  status: string;
  query: string;
}

type Props = {
  filter: Filter;
  setFilterQuery: (value: string) => ChangeQueryAction;
  setFilterStatus: (value: string) => ChangeStatusAction;
};

export const TodoFilter: FC<Props> = ({
  filter,
  setFilterQuery,
  setFilterStatus,
}) => {
  const { query, status } = filter;

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;

    setFilterStatus(selectedStatus);
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedQuery = e.target.value;

    setFilterQuery(selectedQuery);
  };

  const handleClearSearch = () => {
    setFilterQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={handleStatusChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClearSearch}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
