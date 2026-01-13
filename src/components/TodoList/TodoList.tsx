/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../Todo/Todo';
import { TodoType } from '../../types/Todo';
import { Loader } from '../Loader';

export const TodoList: React.FC = () => {
  const { todos, error, loading } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const [visibleTodos, setVisibleTodos] = useState<TodoType[] | null>(null);

  useEffect(() => {
    if (!todos) {
      return;
    }

    setVisibleTodos(() => {
      return todos.filter(todo => {
        const matchQuery = todo.title
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase());

        const matchStatus =
          status === 'all'
            ? true
            : status === 'completed'
              ? todo.completed
              : !todo.completed;

        return matchStatus && matchQuery;
      });
    });
  }, [query, todos, status]);

  return (
    <>
      {loading ? (
        <Loader />
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

          <tbody>{visibleTodos?.map(todo => <Todo todo={todo} />)}</tbody>
        </table>
      )}

      {!todos?.length && !error && !loading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
