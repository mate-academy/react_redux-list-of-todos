import { useState } from 'react';
import debounce from 'lodash/debounce';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/filter';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.filter.status);
  const { setFilterStatus, setFilterQuery } = actions;

  const applyDebounce = debounce((value: string) => {
    dispatch(setFilterQuery(value));
  }, 500);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyDebounce(event.target.value);
    setQuery(event.target.value);
  };

  const filterByStatus = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(setFilterStatus(event.target.value as Status));
  };

  const clearQuery = () => {
    dispatch(setFilterQuery(''));
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={filterByStatus}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">
              Completed
            </option>
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
          onChange={handleQueryChange}
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
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
