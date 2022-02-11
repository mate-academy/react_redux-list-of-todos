import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterActions, filterSelectors } from '../../store/filter';
import { todosActions } from '../../store/todos';
import { TodoStatus } from '../../types/TodoStatus';
import './SearchForm.scss';

export const SearchForm: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelectors.getFilter);

  useEffect(() => {
    dispatch(todosActions.loadTodos(filter));
  }, [filter]);

  return (
    <form className="form">
      <input
        type="text"
        value={filter.query}
        name="query"
        onChange={(event) => dispatch(filterActions.setQuery(event.target.value))}
        className="input is-link"
      />

      <div className="select is-link">
        <select
          name="todoStatus"
          value={filter.status}
          onChange={(event) => dispatch(filterActions.setStatus(event.target.value as TodoStatus))}
        >
          <option value={TodoStatus.All}>All</option>
          <option value={TodoStatus.Active}>Active</option>
          <option value={TodoStatus.Completed}>Completed</option>
        </select>
      </div>
    </form>
  );
};
