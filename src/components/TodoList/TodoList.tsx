import React from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo, clearCurrentTodo } from '../../features/currentTodo';
import { Loader } from '../Loader';
import { selectVisibleTodos } from '../../features/todos/selectors';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { loading, error } = useAppSelector(state => state.todos);

  const visibleTodos = useAppSelector(selectVisibleTodos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const hasTodos = visibleTodos.length > 0;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="notification is-danger">{error}</p>;
  }

  return (
    <>
      {!hasTodos && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {hasTodos && (
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
              const isSelected = currentTodo?.id === todo.id;

              return (
                <tr
                  key={todo.id}
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelected,
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
                      onClick={() => {
                        if (isSelected) {
                          dispatch(clearCurrentTodo());
                        } else {
                          dispatch(setCurrentTodo(todo));
                        }
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelected,
                            'fa-eye-slash': isSelected,
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
};
