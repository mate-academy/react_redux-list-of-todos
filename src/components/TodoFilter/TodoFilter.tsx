import { TodoStatus } from '../../types';

type Props = {
  selectCategory: (filter: TodoStatus) => void;
  filter: TodoStatus;
  setQuery: (event: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  selectCategory,
  filter,
  setQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={
            (event) => selectCategory(event.target.value as TodoStatus)
          }
        >
          {Object.entries(TodoStatus).map(([key, value]) => (
            <option value={value} key={key}>
              {key}
            </option>
          ))}
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
        onChange={(event) => setQuery(event.target.value)}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
