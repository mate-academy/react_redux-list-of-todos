/* eslint-disable */
import React from 'react';
import { TodoItem } from '../TodoItem';
import { useAppSelector } from '../../app/hooks';

type Props = {};

export const TodoList: React.FC<Props> = () => {
  const todos = useAppSelector(state => state.todos.todos);
  const status = useAppSelector(state => state.filterSlice.status);
  const query = useAppSelector(state => state.filterSlice.query);

  const filteredTodos = todos.filter(todo => {
    const filterQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    const filterStatus =
      status === 'all'
        ? todo
        : status === 'completed'
          ? todo.completed
          : !todo.completed;

    return filterQuery && filterStatus;
  });

  return (
    <>
      {filteredTodos.length === 0 ? (
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

          <TodoItem todos={filteredTodos} />
        </table>
      )}
    </>
  );
};
