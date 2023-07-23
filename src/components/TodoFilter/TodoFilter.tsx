import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsFilter, Filter } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { filter, query } = useAppSelector(state => state.filter);
  const todos = useAppSelector(state => state.todos);

  const filterFunc = () => {
    const allTodos = [...todos];

    const filterTodos = allTodos.filter(todo => {
      const isMathQuery = todo.title.toLowerCase()
        .includes(query.toLowerCase());

      switch (filter) {
        case Filter.ALL:
          return isMathQuery;

        case Filter.ACTIVE:
          return !todo.completed && isMathQuery;

        case Filter.COMPLETED:
          return todo.completed && isMathQuery;

        default:
          return todo;
      }
    });

    dispatch(actionsFilter.setFilterTodos(filterTodos));
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(actionsFilter.setFilter(e.target.value as Filter));
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsFilter.setQuery(e.target.value));
  };

  const onChangeSearchRemove = () => {
    dispatch(actionsFilter.setQuery(''));
  };

  useEffect(() => {
    filterFunc();
  }, [filter, query, dispatch, todos]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={onChangeSelect}
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
          onChange={onChangeSearch}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="btnDelete"
              onClick={onChangeSearchRemove}
            />
          )}
        </span>
      </p>
    </form>
  );
};
