import { useEffect, useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  onSettingTodo: React.Dispatch<React.SetStateAction<Todo[]>>,
}

enum SortType {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}

export const TodoFilter: React.FC<Props> = ({ todos, onSettingTodo }) => {
  const [query, setQuery] = useState('');
  const lowerQuery = query.toLowerCase();

  const getFilteredTodos = () => {
    onSettingTodo(todos
      .filter(todo => todo.title.toLowerCase()
        .includes(lowerQuery)));
  };

  useEffect(() => getFilteredTodos(), [lowerQuery]);

  const handleOnSelect = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    switch (target.value) {
      case (SortType.All):
        onSettingTodo(todos);
        break;

      case (SortType.Completed):
        onSettingTodo(todos.filter(todo => todo.completed));
        break;

      case (SortType.Active):
        onSettingTodo(todos.filter(todo => !todo.completed));
        break;

      default:
        break;
    }
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleOnSelect}
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
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onSettingTodo(todos);
              setQuery('');
            }}
          />
        </span>
      </p>
    </form>
  );
};
