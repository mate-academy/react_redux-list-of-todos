import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const setTodo = (todo: Todo) => dispatch(actions.setTodo(todo));
  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
      {todos.length ? (
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
            {todos.map((todo) => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames(
                  { 'has-background-info-light': todo.id === currentTodo?.id },
                )}
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
                    className={todo.completed
                      ? 'has-text-success'
                      : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={todo.id === currentTodo?.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
        : (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )}
    </>
  );
};
