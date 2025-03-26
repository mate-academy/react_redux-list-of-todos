import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setQuery, setStatus } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const { query } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={e => dispatch(setStatus(e.target.value as Status))}
          >
            {Object.keys(Status).map(option => (
              <option
                value={Status[option as keyof typeof Status]}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => dispatch(setQuery(e.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setQuery(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
