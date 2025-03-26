/* eslint-disable */
import classNames from 'classnames';

import { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Filters } from '../../features/filter';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setCurrentTodo } from '../../features/currentTodo';

export function TodoList() {
  const { todos, isLoading } = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const { currentTodo } = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  function handleCurrentTodo(todo: Todo) {
    if (currentTodo?.id !== todo.id) {
      dispatch(setCurrentTodo(todo));
    } else {
      dispatch(setCurrentTodo(null));
    }
  }

  const filteredTodos: Todo[] = useMemo(() => {
    function filterByStatus() {
      if (status === Filters.Completed) {
        return todos.filter(todo => todo.completed);
      }

      if (status === Filters.Active) {
        return todos.filter(todo => !todo.completed);
      }

      return todos;
    }

    if (query.trim() !== '') {
      return filterByStatus().filter(todo =>
        todo.title.toLocaleLowerCase().includes(query.toLowerCase()),
      );
    }

    return filterByStatus();
  }, [todos, status, query]);

  return (
    <>
      {filteredTodos.length === 0 && !isLoading && (
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
            {filteredTodos.map(todo => {
              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': currentTodo?.id === todo.id,
                  })}
                >
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
                      className={classNames({
                        'has-text-success': todo.completed,
                        'has-text-danger': !todo.completed,
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
                      onClick={() => handleCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': currentTodo?.id === todo.id,
                            'fa-eye': !(currentTodo?.id === todo.id),
                          })}
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
}
