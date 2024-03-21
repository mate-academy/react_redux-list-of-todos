import React, { useEffect, useMemo } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as todoStateActions } from '../../features/todostate';
import { Todo } from '../../types/Todo';
import { actions as todosActions } from '../../features/todos';
import { getTodos } from '../../api';
import { getFiltered } from '../../utils/getFiltered';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, filter, currentTodo, todostate } = useAppSelector(
    state => state,
  );

  const setTodos = (passedTodos: Todo[]) => {
    dispatch(todosActions.setTodos(passedTodos));
  };

  const setCurrentTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const setLoading = (value: boolean) => {
    dispatch(todoStateActions.setLoading(value));
  };

  const setError = (value: boolean) => {
    dispatch(todoStateActions.setError(value));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);

      try {
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);

        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const filtered = useMemo(() => {
    return getFiltered(todos, filter);
  }, [todos, filter]);

  const isFilterWarningShown =
    !filtered.length && !todostate.loading && !todostate.error;

  return (
    <>
      {isFilterWarningShown && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!todostate.error && (
        <div className="notification is-danger is-light">
          <button className="delete" onClick={() => setError(false)} />
          Todos couldn&apos;t be loaded, check your connection
        </div>
      )}

      {!todostate.loading && !!filtered.length && (
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
            {filtered.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': currentTodo?.id !== todo.id,
                          'fa-eye-slash': currentTodo?.id === todo.id,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
