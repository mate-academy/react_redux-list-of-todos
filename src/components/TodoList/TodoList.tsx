/* eslint-disable no-console */
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { TodoItem } from '../TodoItem';
import { getFilteredTodos } from '../../redux/selectors';

interface TodoListProps {
  loading: boolean;
}

export const TodoList: React.FC<TodoListProps> = ({ loading }) => {
  const filteredTodos = useAppSelector(getFilteredTodos);

  return (
    <>
      {!loading && (
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
                {filteredTodos.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </>
  );
};
