/* eslint-disable */
import React from 'react';
import TodoComponent from '../Todo/Todo';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const TodoList: React.FC = () => {
  {
    const todos = useSelector((state: RootState) => state.todos);
    const filter = useSelector((state: RootState) => state.filter);

    const visibleTodos = todos.filter(todo => {
      let matchesStatus = true;
      if (filter.status === 'completed') {
        matchesStatus = todo.completed;
      } else if (filter.status === 'active') {
        matchesStatus = !todo.completed;
      }

      let matchesQuery = true;
      if (filter.query) {
        matchesQuery = todo.title
          .toLowerCase()
          .includes(filter.query.toLowerCase());
      }

      return matchesStatus && matchesQuery;
    });
    return (
      <>
        {visibleTodos.length === 0 ? (
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
              {visibleTodos.map(todo => (
                <TodoComponent key={todo.id} todo={todo} />
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  }
};
