import React, { useMemo } from 'react';
import { useAppDispatch } from '../../app/store';
import { filterSlice } from '../../features/filter';
import { Status } from '../../types/Status';
import { debounce } from 'lodash';

type Props = {
  setSearchFilter: (a: string) => void;
  searchFilter: string;
};

export const TodoFilter: React.FC<Props> = ({
  setSearchFilter,
  searchFilter,
}) => {
  const dispatch = useAppDispatch();

  const applyTitle = useMemo(
    () => debounce(setSearchFilter, 1000),
    [setSearchFilter],
  );

  const setFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.setFilter(e.target.value));
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(e.target.value);
    applyTitle(e.target.value);
  };

  const clearSearch = () => {
    setSearchFilter('');
    applyTitle('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={setFilter}>
            <option value={'all' as Status}>All</option>
            <option value={'active' as Status}>Active</option>
            <option value={'completed' as Status}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchFilter}
          onChange={handleInputFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchFilter.length !== 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
