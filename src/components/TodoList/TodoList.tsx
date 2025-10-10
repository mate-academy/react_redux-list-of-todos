/* eslint-disable */
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

const preparedTodos = (data: Todo[], status: Status, text: string) => {
  const preparedQuery = text.trim().toLowerCase();

  switch (status) {
    case 'active': {
      return data.filter(
        todo =>
          !todo.completed && todo.title.toLowerCase().includes(preparedQuery),
      );
    }

    case 'completed': {
      return data.filter(
        todo =>
          todo.completed && todo.title.toLowerCase().includes(preparedQuery),
      );
    }

    case 'all':
    default:
      return data.filter(todo =>
        todo.title.toLowerCase().includes(preparedQuery),
      );
  }
};

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(state => state.todos);
  const { status, query } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const todos = useMemo(() => {
    return preparedTodos(data, status as Status, query);
  }, [data, status, query]);

  return (
    <>
      {todos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos.length > 0 && (
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
            {todos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': selectedTodo?.id === todo.id,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}{' '}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
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
                    onClick={() => dispatch(setCurrentTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': todo.id !== selectedTodo?.id,
                          'fa-eye-slash': todo.id === selectedTodo?.id,
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
