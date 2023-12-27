import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/filter';
import { FilterStatus, Status } from '../../types/Status';

export const TodoFilter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();

  const setFilterStatus = (statusValue: Status) => {
    dispatch(actions.filterTodos(statusValue));
  };

  const setSearchTerm = (query: string) => {
    dispatch(actions.filterTodosByQuery(query));
    setSearchQuery(query);
  };

  const heandlResetQuery = () => {
    dispatch(actions.clearQuery());
    setSearchQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={
              (e) => setFilterStatus(e.target.value as Status)
            }
          >
            <option value={FilterStatus.All}>{`${FilterStatus.All}`}</option>
            <option value={FilterStatus.Active}>{`${FilterStatus.Active}`}</option>
            <option value={FilterStatus.Completed}>{`${FilterStatus.Completed}`}</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={
            searchQuery
          }
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>

        {
          searchQuery
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={heandlResetQuery}
                aria-label="reset button"
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
