import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoCard } from '../TodoCard';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <table className="table is-narrow is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <span className="icon">
              <i className="fas fa-check" />
            </span>
          </th>
          <th>Title</th>
          <th> </th>
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <TodoCard
            key={todo.id}
            todo={todo}
            // setTodo={setTodo}
            // chooseTodo={chooseTodo}
          />
        ))}
      </tbody>
    </table>
  );
};
