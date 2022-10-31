import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { Select } from '../../types/Select';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const inputValue = useAppSelector(state => state.filter.query);

  const handlerFilter = (
    e: React.ChangeEvent<HTMLSelectElement>
    | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, nodeName } = e.target;

    switch (nodeName) {
      case 'INPUT':
        dispatch(filterActions.setFilterInput(value));
        break;

      case 'SELECT':
        dispatch(filterActions.setFilterSelect(value as Select));
        break;

      default:
        break;
    }
  };

  const clearState = () => {
    dispatch(filterActions.setFilterInput(''));
    dispatch(filterActions.setFilterSelect(Select.All));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            name="select"
            onChange={handlerFilter}
          >
            <option value={Select.All}>All</option>
            <option value={Select.Active}>Active</option>
            <option value={Select.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          name="search"
          value={inputValue}
          onChange={handlerFilter}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearState}
            >
              &nbsp
            </button>
          </span>
        )}
      </p>
    </form>
  );
};
