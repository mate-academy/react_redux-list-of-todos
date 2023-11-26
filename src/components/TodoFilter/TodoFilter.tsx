import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const formItems = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const statusSelectChange = (status: string) => {
    return dispatch(filterActions.statusSelect(status));
  };

  const inputChange = (query: string) => {
    return dispatch(filterActions.input(query));
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            className="statusSelect"
            value={formItems.statusSelect}
            onChange={e => statusSelectChange(e.target.value)}
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
          value={formItems.input}
          onChange={e => inputChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {formItems.input && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => inputChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
