import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { actions as FilterActions } from '../../features/filter';
import { Status } from '../../types/Status';
import { useAppSelector } from '../../app/hooks';
import { Filter } from '../../types/Filter';

export const TodoFilter = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const onChangeFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(FilterActions.changeFilter(e.target.value as Status));
  };

  const onChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(FilterActions.changeQuery(e.target.value));
  };

  const onClearQuery = () => {
    dispatch(FilterActions.clearQuery());
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
            onChange={onChangeFilter}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
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
          onChange={onChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear input"
              onClick={onClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
