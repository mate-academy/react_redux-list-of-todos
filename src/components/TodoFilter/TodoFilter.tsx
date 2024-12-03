import { FC } from 'react';

import { SelectedType } from '../../types/SelectedType';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { filterSlice } from '../../features/filter';

export const TodoFilter: FC = () => {
  const dispatch = useAppDispatch();

  const handleSelectedCondition = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(filterSlice.actions.setFilter(event.target.value as SelectedType));
  };

  const handleClose = () => dispatch(filterSlice.actions.clearQuery());
  const query = useAppSelector(state => state.filter.query);
  const selectedCondition = useAppSelector(state => state.filter.status);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedCondition}
            onChange={handleSelectedCondition}
          >
            <option value={SelectedType.All}>All</option>
            <option value={SelectedType.Active}>Active</option>
            <option value={SelectedType.Completed}>Completed</option>
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
          onChange={event =>
            dispatch(
              filterSlice.actions.setQuery(event.target.value.trimStart()),
            )
          }
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClose}
            />
          </span>
        )}
      </p>
    </form>
  );
};
