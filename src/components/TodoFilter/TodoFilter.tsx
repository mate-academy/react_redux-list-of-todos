import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setQueryFilter, setStatusFilter } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const status = useSelector((state: RootState) => state.filter.status);
  const valueInput = useSelector((state: RootState) => state.filter.query);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as 'all' | 'active' | 'completed';

    dispatch(setStatusFilter(newStatus));
  };

  const handleClear = () => {
    dispatch(setQueryFilter(''));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    dispatch(setQueryFilter(input));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={status}
            data-cy="statusSelect"
            onChange={event => handleChange(event)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => handleInputChange(event)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={valueInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {valueInput && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={handleClear}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
