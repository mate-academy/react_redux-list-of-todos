import { useDispatch } from 'react-redux';

import { Status } from '../../types/Status';
import { FilterOption } from '../../enums/filter-options';
import { useAppSelector } from '../../hooks/useAppSelector';
import { filterSlice } from '../../features/filter';

const filterOptionsArray = Object.values(FilterOption);

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { query, status } = useAppSelector(state => state.filter);

  const onFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(filterSlice.actions.selectStatus(event.target.value as Status));
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      filterSlice.actions.addSearchQuery(event.target.value.trimStart()),
    );
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={onFilterChange}
          >
            {filterOptionsArray.map(option => {
              const optionTitle =
                option.charAt(0).toUpperCase() + option.slice(1);

              return (
                <option value={option} key={option}>
                  {optionTitle}
                </option>
              );
            })}
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
          onChange={onInputChange}
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
              onClick={() => dispatch(filterSlice.actions.addSearchQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
