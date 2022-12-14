/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';

const filterTodos = (todos: Todo[], query: string, status: string) => {
  return todos
    .filter(({ title }) => title.includes(query.toLowerCase()))
    .filter(({ completed }) => {
      switch (status) {
        case 'active':
          return !completed;
        case 'completed':
          return completed;
        default:
          return true;
      }
    });
};

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const [warning, setWarning] = useState(false);
  const filtredTodos = filterTodos(todos, query, status);

  useEffect(() => {
    if (filtredTodos.length === 0) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  }, [filtredTodos]);

  return (
    <>
      {warning ? (
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
            {filtredTodos
              .map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};
