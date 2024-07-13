import { Status } from '../../types/Status';

type Props = {
  query: string;
  onQueryChange: (query: string) => void;
  status: Status;
  setStatus: (status: Status) => void;
};

const options = ['All', 'Active', 'Completed'];

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  status,
  setStatus,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={event => setStatus(event.target.value as Status)}
          >
            {options.map(option => (
              <option
                key={option}
                value={
                  option === 'Completed'
                    ? Status.completed
                    : option === 'Active'
                      ? Status.active
                      : Status.all
                }
              >
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={event => onQueryChange(event.target.value)}
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
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
