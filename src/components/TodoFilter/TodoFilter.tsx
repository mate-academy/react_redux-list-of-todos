import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setQuary } from '../../features/quary';
import { setFilter, FilterType } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const filter = useSelector((state: RootState) => state.filter.filter);
  const quary = useSelector((state: RootState) => state.quary.quary);
  const dispatch = useDispatch();

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => {
              dispatch(setFilter(event.target.value));
            }}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={quary}
          onChange={(event) => dispatch(setQuary(event.target.value))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => dispatch(setQuary(''))}
          />
        </span>
      </p>
    </form>
  );
};
