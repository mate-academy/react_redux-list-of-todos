import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { getTodos } from '../../api';
import { actions as todosAction } from '../../features/todos';
import { actions as currentTodoAction } from '../../features/currentTodo';
import { Loader } from '../Loader';

enum Status {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      ? [...todos].filter(todo => todo.title.toLowerCase().includes(query))
      : [...todos];

    switch (status) {
      case Status.active:
        return newTodos.filter(todo => !todo.completed);

      case Status.completed:
        return newTodos.filter(todo => todo.completed);

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
            {visibleTodos.map(todo => {
              const { id, completed, title } = todo;

              return (
                <tr key={id} data-cy="todo">
                  <td className="is-vcentered">{id}</td>
                  <td className="is-vcentered">
                    {completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )}
                  </td>

                  <td className="is-vcentered is-expanded">
                    <p
                      className={classNames(
                        { 'has-text-danger': !completed },
                        { 'has-text-success': completed },
                      )}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoAction.setTodo(todo))}
                    >
                      <span className="icon">
                        <i className={id === currentTodo?.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'}
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
