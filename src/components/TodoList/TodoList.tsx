import React from 'react';
import { Todo as TodoComponent } from '../Todo/Todo';
import { Todo as TodoType } from '../../types/Todo';

type TodoListProps = {
  todos: TodoType[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <>
      {!todos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
              <TodoComponent key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
