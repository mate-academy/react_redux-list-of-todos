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
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded) {
      getTodos().then((response: TodoType[]) => {
        console.log(response);

        dispatch(todosActions.loadTodos(response));
        setIsLoaded(false);
      });
    }
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
      {isLoaded && <Loader />}
      {filteredTodos.length === 0 && !isLoaded && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
