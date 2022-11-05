import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

interface Props {
  queryTodoList: Todo[];
  setTodoList: (todos: Todo[]) => void;
}

export const TodoFilter: React.FC<Props> = ({ queryTodoList, setTodoList }) => {
  const [searchText, setSearchText] = useState('');

  const todoListFilter = (status: Status) => {
    switch (status) {
      case 'active':
        setTodoList(queryTodoList.filter(t => !t.completed));
        break;

      case 'completed':
        setTodoList(queryTodoList.filter(t => t.completed));
        break;

      default:
        setTodoList(queryTodoList);
    }
  };

  const onSearch = (value: string) => {
    setSearchText(value);
    setTodoList(queryTodoList.filter(t => t.title.includes(value)));
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
            onChange={e => todoListFilter(e.target.value as Status)}
          >
            <option value="all">
              All
            </option>
            <option value="active">
              Active
            </option>
            <option value="completed">
              Completed
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => onSearch(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchText.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearch('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
