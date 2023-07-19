import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as actionsFilter } from '../../features/filter';

enum SelectValue {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
export const TodoFilter: React.FC = () => {
  const [select, setSelect] = useState('All');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const allTodos = useAppSelector(state => state.allTodos);

  const filterFunc = () => {
    switch (select) {
      case SelectValue.ALL:
        dispatch(actionsFilter.filterAll(allTodos, search));
        break;

      case SelectValue.ACTIVE:
        dispatch(actionsFilter.filterActive(allTodos, search));
        break;

      case SelectValue.COMPLETED:
        dispatch(actionsFilter.filterCompleted(allTodos, search));
        break;

      default:
        dispatch(actionsFilter.filterAll(allTodos, search));
    }
  };

  useEffect(() => {
    filterFunc();
  }, [select, search, dispatch, allTodos]);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
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
            value={select}
            onChange={onChangeSelect}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {search && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="btnDelete"
              onClick={() => setSearch('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
