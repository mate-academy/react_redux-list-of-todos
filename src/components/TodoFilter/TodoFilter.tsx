import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';

import { TodoStatus } from '../../types';

export const TodoFilter: React.FC = () => {
  const query = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const handleSetFilterCategory = (status: TodoStatus) => {
    dispatch(actions.setStatus(status));
  };

  const handleSetQuery = (newQuery: string) => {
    dispatch(actions.setQuery(newQuery));
  };

  const handleRemoveQuery = () => {
    dispatch(actions.setQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              (event) => handleSetFilterCategory(
                event.target.value as TodoStatus,
              )
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
          onChange={(event) => handleSetQuery(event.target.value)}
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
              onClick={handleRemoveQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
