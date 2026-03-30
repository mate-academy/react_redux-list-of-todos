import { RootState } from '../../app/store';
import { setFilterStatus, setSearchQuery } from '../../features/filter';
import { Status } from '../../types/Status';
import { useDispatch, useSelector } from 'react-redux';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.filter.query);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            id="statusSelect"
            data-cy="statusSelect"
            onChange={e =>
              dispatch(setFilterStatus(e.target.value.toLowerCase() as Status))
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => dispatch(setSearchQuery(e.target.value.toLowerCase()))}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => dispatch(setSearchQuery(''))}
            />
          </span>
        )}
      </p>
    </form>
  );
};
