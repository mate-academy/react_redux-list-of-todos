/* eslint-disable */
import React from 'react';
import { TodoCard } from '../TodoCard/TodoCard';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todosReducer);
  const { status, query } = useSelector(
    (state: RootState) => state.filterReduser,
  );

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) {
      return false;
    }

    if (status === Status.All) {
      return true;
    }
    if (status === Status.Active) {
      return !todo.completed;
    }
    return todo.completed;
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

          <tbody>
            {todos &&
              filteredTodos.map(todo => <TodoCard todo={todo} key={todo.id} />)}
          </tbody>
        </table>
      )}
    </>
  );
};
