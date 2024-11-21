import React, { ChangeEvent } from 'react';
import { TODO_FILTER_OPTIONS } from '../../constants/TodoFilter';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { filterSlice } from '../../features/filter';
import { FilterStatuses } from '../../utils/enums/FiltersStatus';

export const TodoFilter: React.FC = () => {
  const filter = useAppSelector(state => state.filter);
  const dispatch = useDispatch();
  const { setFilterQuery, setFilterStatus, clearFilterState } =
    filterSlice.actions;

  const handleChangeStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilterStatus(event.target.value as FilterStatuses));
  };

  const handleChangeQuery = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterQuery(event.target.value.toLowerCase()));
  };

  const handleClearState = () => dispatch(clearFilterState());

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleChangeStatus}
          >
            {TODO_FILTER_OPTIONS.map(({ value, title, id }) => (
              <option value={value} key={id}>
                {title}
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
          value={filter.query}
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filter.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearState}
            />
          </span>
        )}
      </p>
    </form>
  );
};
