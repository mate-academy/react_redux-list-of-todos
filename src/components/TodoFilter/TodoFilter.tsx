import { Status } from '../../types/Status';

// type Props = {
//   handleChange: (status: Status) => void,
//   queryChange: (value: string) => void,
//   clearQuery: () => void,
//   query: string,
// };

export const TodoFilter: React.FC<Props> = ({
  handleChange = () => { },
  queryChange = () => { },
  clearQuery = () => { },
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          onChange={(event) => handleChange(event.target.value as Status)}
          data-cy="statusSelect"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        onChange={(event) => queryChange(event.target.value)}
        value={query}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            onClick={clearQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
