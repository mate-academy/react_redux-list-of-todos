/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const isTodos = todos.length > 0;
  return (
    <>
      {!isTodos &&
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      }

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

          {isTodos && todos.map(item => <TodoItem todo={item} key={item.id}/>)}
        </tbody>
      </table>
    </>
  );
};
