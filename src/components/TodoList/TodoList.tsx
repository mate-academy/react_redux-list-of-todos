/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoListItem } from '../TodoListComponent';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.length === 0
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
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
                <TodoListItem todo={todo} key={todo.id} />
              ))}
            </tbody>
          </table>
        )}
    </>
  );
};
