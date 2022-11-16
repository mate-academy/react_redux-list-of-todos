import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter = () => {
  const dispatch = useAppDispatch();
  const { query, select } = useAppSelector(state => state.filter);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setQuery(event.target.value));
  };

  const handleClearSearchInput = () => {
    dispatch(actions.setQuery(''));
  };

  const handleSelectInput = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(actions.setSelect(event.target.value as Status));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={handleSelectInput}
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
          onChange={handleSearchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!query.length
          && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearchInput}
              aria-label="clearSearch"
            />
          )}
        </span>
      </p>
    </form>
  );
};
