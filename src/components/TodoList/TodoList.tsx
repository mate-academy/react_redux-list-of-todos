import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, currentTodo }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {!todos.length
        ? (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
        : (
          <table className="table is-narrow is-fullwidth">
            <thead>
              <tr>
                <th>#</th>

                <th>
                  <span
                    className="icon"
                    aria-label="Check icon"
                  >
                    <i className="fas fa-check" />
                  </span>
                </th>

                <th>Title</th>
                <th aria-label="empty" />
              </tr>
            </thead>

            <tbody>
              {todos.map((todo) => (
                <tr
                  key={todo.id} // Add a unique key for each todo
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': todo.id === currentTodo?.id,
                  })}
                >
                  <td className="is-vcentered">{todo.id}</td>
                  <td className="is-vcentered">
                    {todo.completed && (
                      <span
                        className="icon"
                        data-cy="iconCompleted"
                      >
                        <i className="fas fa-check" />
                      </span>
                    )}
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
                      aria-label="Select todo"
                      onClick={() => dispatch(actions.setTodo(todo))}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': todo.id === currentTodo?.id,
                            'fa-eye': todo.id !== currentTodo?.id,
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
