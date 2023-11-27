/* eslint-disable max-len */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../Todo/todo';
import { filterTodos } from '../filteredTodos/filteredTodos';

type Props = {
  // wygodniej dac any bo nazwa typu Todo pokrywa sie z nazwa komponentu Todo
  todos: any[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filter = useAppSelector((state) => state.filter.status);
  const searchText = useAppSelector((state) => state.filter.query);
  // przekazanie todos do filtrowania
  const filteredTodos = filterTodos({ todos, filter, searchText });

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map((todo) => (
            <Todo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              completed={todo.completed}
              userId={todo.userId}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
