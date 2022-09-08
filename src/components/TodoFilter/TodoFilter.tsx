import { FC, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, FilterSelector } from '../../features/filter';

enum FilterType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: FC = memo(() => {
  const appliedQuery: string = useSelector(FilterSelector.getFilterQuery);
  const filterType: string = useSelector(FilterSelector.getFilterType);

  const dispach = useDispatch();

  const handelSelectFiter = (statusPayload: string) => {
    dispach(actions.setFilterType(statusPayload));
  };

  const handelSearchQuery = (
    queryPayload: string,
  ) => {
    dispach(actions.setAppliedQuery(queryPayload));
  };

  const handelCloseSearch = () => {
    dispach(actions.setAppliedQuery(''));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => handelSelectFiter(event.target.value)}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={appliedQuery}
          onChange={(event) => handelSearchQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {appliedQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handelCloseSearch()}
            />
          </span>
        )}
      </p>
    </form>
  );
});
