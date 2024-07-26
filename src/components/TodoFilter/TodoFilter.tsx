import React, { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
};

export const TodoFilter: React.FC<Props> = ({ todos, setFilteredTodos }) => {
  const [activFilter, setActivFiter] = useState<Status>(Status.ALL);
  const [query, setQuery] = useState('');
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivFiter(event.target.value as Status);
  };

  // useEffect(() => {
  //   const todosFilter = (state: Todo[], action: Status, string: string) => {
  //     let filtered = [...state];

  //     switch (action) {
  //       case 'active':
  //         filtered = [...state].filter(item => !item.completed);
  //         break;
  //       case 'completed':
  //         filtered = [...state].filter(item => item.completed);
  //         break;
  //       default:
  //         filtered = [...state];
  //         break;
  //     }

  //     if (string !== '') {
  //       filtered = filtered.filter(item =>
  //         item.title.toLowerCase().includes(query.toLowerCase()),
  //       );
  //     }

  //     return filtered;
  //   };

  //   setFilteredTodos(todosFilter(todos, activFilter, query));
  // }, [activFilter, todos, query, setFilteredTodos]);

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select onChange={handleFilterChange} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={() => setQuery('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        </span>
      </p>
    </form>
  );
};
