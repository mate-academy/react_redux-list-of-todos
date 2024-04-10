/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const currentTodo = useAppSelector(store => store.currentTodo);
  const handleCurrentTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  return (
    <>
      {todos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
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

          <tbody>
            {todos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': todo === currentTodo,
                })}
              >
                <td className="is-vcentered">{todo.id}</td>
                {todo.completed ? (
                  <td aria-label="Icon Completed" className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td aria-label="empty" className="is-vcentered" />
                )}

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      { 'has-text-danger': !todo.completed },
                      { 'has-text-success': todo.completed },
                    )}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    aria-label="Select Button"
                    className="button"
                    type="button"
                    onClick={() => handleCurrentTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'far',
                          { 'fa-eye-slash': todo === currentTodo },
                          { 'fa-eye': todo !== currentTodo },
                        )}
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
