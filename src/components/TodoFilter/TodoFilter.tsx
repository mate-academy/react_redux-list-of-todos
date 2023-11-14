import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsQuery } from '../../features/queryReducer';
import { actions as actionsFilter } from '../../features/filterReducer';
import { SortType } from '../../types/SortType';

export const TodoFilter: React.FC = () => {
  const { query } = useAppSelector((state) => state.query);
  const { status } = useAppSelector((state) => state.status);

  const dispatchQuery = useAppDispatch();
  const dispatchStatus = useAppDispatch();

  const handleSelectFilter = (event: React.ChangeEvent<HTMLSelectElement>) => (
    dispatchStatus(actionsFilter.setStatus(event.target.value as SortType))
  );

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => (
    dispatchQuery(actionsQuery.setQuery(event.target.value))
  );

  const handleResetQuery = () => (
    dispatchQuery(actionsQuery.clearQuery())
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelectFilter}
          >
            {Object.values(SortType).map((selectedType) => (
              <option key={selectedType} value={selectedType}>
                {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}
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
          onChange={handleQuery}
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
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
