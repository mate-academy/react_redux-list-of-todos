import { Status } from '../../types/Status';

type Props = {
  onChosenFilter: (data: Status) => void,
  onQuery: (data: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  onChosenFilter,
  onQuery,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => onChosenFilter(e.target.value as Status)}
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
          onChange={(e) => onQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: Status.ALL }}
          >
            {/* eslint-disable-next-line */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
