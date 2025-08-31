import { Select } from '../../App';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearchQueryTitle, setSelectValue } from '../../features/filter';

export const TodoFilter = () => {
  const { status: selectedValue, query: searchQueryTitle } = useAppSelector(
    state => state.filter,
  );
  const dispatch = useAppDispatch();

  const selectTodoOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (Object.values(Select).includes(value as Select)) {
      dispatch(setSelectValue(value as Select));
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => selectTodoOption(event)}
            value={selectedValue}
            data-cy="statusSelect"
          >
            <option value={Select.ALL}>All</option>
            <option value={Select.ACTIVE}>Active</option>
            <option value={Select.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQueryTitle}
          onChange={event => dispatch(setSearchQueryTitle(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQueryTitle && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setSearchQueryTitle(''))}
            />
          )}
        </span>
      </p>
    </form>
  );
};
