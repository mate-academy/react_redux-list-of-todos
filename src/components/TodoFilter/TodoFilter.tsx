import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import { actions } from '../../store/filter';
import { SortedType } from '../../types/SortType';

export const TodoFilter: FC = () => {
  const dispatch = useDispatch();
  const query = useAppSelector(state => state.filter.query);

  const setFilter = (value: SortedType) => {
    switch (value) {
      case SortedType.active:
        dispatch(actions.activeFilter());
        break;
      case SortedType.completed:
        dispatch(actions.completedFilter());
        break;
      default:
        dispatch(actions.allFilter());
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={event => {
              setFilter(event.target.value as SortedType);
            }}
          >
            <option value={SortedType.all}>All</option>
            <option value={SortedType.active}>Active</option>
            <option value={SortedType.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => {
            dispatch(actions.setQueryfilter(event.target.value));
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {query.length > 0 && (
            <button
              type="button"
              className="delete has-text"
              onClick={() => dispatch(actions.clearQueryFilter())}
            />
          )}
        </span>
      </p>
    </form>
  );
};
