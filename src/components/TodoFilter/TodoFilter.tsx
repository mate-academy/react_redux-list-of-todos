import { useSignals } from '@preact/signals-react/runtime';
import { FilterValues, FilterValuesType, KeyboardKeys } from '../../types';
import { filterValue, searchQuery } from '../../signals';

export const TodoFilter: React.FC = () => {
  useSignals();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchQuery.value = e.target.value;
  };

  const handleFilterValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    filterValue.value = e.target.value as FilterValuesType;
  };

  const handleResetQuery = () => {
    searchQuery.value = '';
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterValue}>
            <option value={FilterValues.all}>All</option>
            <option value={FilterValues.active}>Active</option>
            <option value={FilterValues.completed}>Complete</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery.value}
          onChange={handleInput}
          onKeyDown={e => e.key === KeyboardKeys.Enter && e.preventDefault()}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!searchQuery.value.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
