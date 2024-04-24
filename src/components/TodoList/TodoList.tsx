/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo as TodoType } from '../../types/Todo';
import { Loader } from '../Loader';
import { getTodos } from '../../api';
import { actions as todosActions } from '../../features/todos';
import { Todo } from '../Todo/Todo';
import { Status } from '../../features/filter';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    getTodos()
      .then((response: TodoType[]) => {
        dispatch(todosActions.loadTodos(response));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filteredTodos = useMemo(() => {
    const searchedTodos = todos.filter((todo: TodoType) =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );

    switch (status) {
      case Status.Completed:
        return searchedTodos.filter(todo => todo.completed);
      case Status.Active:
        return searchedTodos.filter(todo => !todo.completed);

      default:
        return searchedTodos;
    }
  }, [status, query, todos]);

  return (
    <>
      {isLoading && <Loader />}
      {!filteredTodos.length && !isLoading && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!filteredTodos.length && (
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
            {filteredTodos.map((todo: TodoType) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
