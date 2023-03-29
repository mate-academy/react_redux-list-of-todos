import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as FilterAction } from '../../features/filter';

enum TypeFilter {
  'All' = 'all',
  'Active' = 'active',
  'Completed' = 'completed',
}

export const TodoFilter: React.FC = () => {
  const [option, setOption] = useState<string>(TypeFilter.All);
  const [search, setSearch] = useState('');
  const filterQuery = useAppSelector(state => state.filter.query);
  const dispatch = useAppDispatch();

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setOption(value);
    dispatch(FilterAction.setStatus(value));
  };

  const onChangeSearchHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setSearch(value);
    dispatch(FilterAction.setQuery(value));
  };

  const deleteSearch = () => {
    setSearch('');
    dispatch(FilterAction.setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={option}
            onChange={onChangeHandler}
          >
            <option value={TypeFilter.All}>All</option>
            <option value={TypeFilter.Active}>Active</option>
            <option value={TypeFilter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          value={search}
          onChange={onChangeSearchHandler}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={deleteSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
