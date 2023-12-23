import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import 'bulma/css/bulma.css';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({
  todos,
}) => {
  const selectedTodo
    = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  return (
    <>
      {todos.length ? (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th role="button" aria-label="Select task">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th role="button" aria-label="Select task"> </th>
            </tr>
          </thead>

          <tbody>
            {todos.map(({
              id,
              title,
              completed,
              userId,
            }) => (
              <tr key={id} data-cy="todo" className="">
                <td className="is-vcentered">{id}</td>
                {completed ? (
                  <td
                    className="is-vcentered"
                    role="button"
                    aria-label="Select task"
                  >
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                ) : (
                  <td
                    className="is-vcentered"
                    role="button"
                    aria-label="Select task"
                  />
                )}
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': completed,
                      'has-text-danger': !completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  {id === selectedTodo?.id ? (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => dispatch(currentTodoActions.removeTodo())}
                      aria-label="Select task"
                    >
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    </button>
                  ) : (
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        dispatch(currentTodoActions.setTodo({
                          id,
                          title,
                          completed,
                          userId,
                        }));
                      }}
                      aria-label="Select task"
                    >
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
