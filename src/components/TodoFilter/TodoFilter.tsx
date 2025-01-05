import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, setQuery } from '../../features/filter';
import { RootState } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useSelector((state: RootState) => state.filter);

  const filterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilter(event.target.value as Status));
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" value={status} onChange={filterChange}>
            {['All', 'Active', 'Completed'].map(filter => (
              <option value={filter.toLowerCase()} key={filter}>
                {filter}
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
          onChange={onChange}
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
              onClick={() => dispatch(setQuery(''))}
            ></button>
          </span>
        )}
      </p>
    </form>
  );
};
