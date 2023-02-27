/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  visibleTodos: Todo[],
  selectedTodo: Todo | null,
};

export const TodoList: React.FC<Props> = ({ visibleTodos: todos, selectedTodo }) => {
  return (
    <>
      {todos.length ? (
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
              <TodoItem
                todo={todo}
                key={todo.id}
                isSelected={selectedTodo?.id === todo.id}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
