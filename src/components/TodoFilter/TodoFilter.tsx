/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent } from 'react';
import { Select } from '../../types/Select';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();

  const query = useAppSelector(state => state.filter.query);
  const setQuery = (q: string) => dispatch(filterActions.setQuery(q));

  const selectedCategory = useAppSelector(state => state.filter.status);
  const setSelectedCategory = (category: Select) => dispatch(filterActions.setStatus(category));

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value as Select);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedCategory}
            onChange={handleSelectChange}
          >
            <option value={`${Select.All}`}>
              All
            </option>
            <option value={`${Select.Active}`}>
              Active
            </option>
            <option value={`${Select.Completed}`}>
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
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setQuery('')}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
