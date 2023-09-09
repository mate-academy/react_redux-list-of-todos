import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { Loader } from '../Loader';
import { getTodos } from '../../api';
import { actions as todosAction } from '../../features/todos';

enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const { query, status } = useAppSelector((state) => state.filter);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);

    getTodos()
      .then((todosList) => dispatch(todosAction.addTodos(todosList)))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    const newTodos = query
      ? [...todos].filter((todo) => todo.title.toLowerCase().includes(query))
      : [...todos];

    switch (status) {
      case Status.active:
        return newTodos.filter((todo) => !todo.completed);

      case Status.completed:
        return newTodos.filter((todo) => todo.completed);

      case Status.all:
        return newTodos;

      default:
        return newTodos;
    }
  }, [query, status, todos]);

  return (
    <>
      {!isLoading && !isError && visibleTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {isLoading && !isError && <Loader />}

      {!isLoading && !isError && visibleTodos.length > 0 && (
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
            {visibleTodos.map((todo: Todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
