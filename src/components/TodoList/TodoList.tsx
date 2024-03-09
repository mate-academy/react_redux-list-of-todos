import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListItem/TodoListItem';

interface Props {
  selectedTodo: Todo | null;
  setCurrentTodo: (todo: Todo) => void;
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({
  selectedTodo,
  setCurrentTodo,
  todos,
}) => {
  if (todos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>

          <th aria-label="1">
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>

          <th>Title</th>
          <th aria-label="icon" />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <TodoListItem
            key={todo.title}
            todo={todo}
            selectedTodo={selectedTodo}
            setCurrentTodo={setCurrentTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
