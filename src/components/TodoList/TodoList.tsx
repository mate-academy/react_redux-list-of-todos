import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/store';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const currentTodoId = currentTodo ? currentTodo.id : 0;

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
          <TodoItem todo={todo} key={todo.id} currentTodoId={currentTodoId} />
        ))}
      </tbody>
      {/* {!todos.length && (
        <th className="notification is-warning">
          There are no todos matching current filter criteria
        </th>
      )} */}
    </table>
  );
};
