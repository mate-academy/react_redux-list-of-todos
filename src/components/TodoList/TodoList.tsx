/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const status = useAppSelector((state) => state.filter.status);
  const currentTodo = useAppSelector((state) => state.currentTodo);
  const query = useAppSelector((state) => state.filter.query);

  const setTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  const removeTodo = () => {
    dispatch(currentTodoActions.removeTodo());
  };

  const filteredTodos = todos.filter(({ completed, title }) => {
    switch (status) {
      case Status.ACTIVE:
        return !completed && title.includes(query);
      case Status.COMPLETED:
        return completed && title.includes(query);
      case Status.ALL:
      default:
        return title.includes(query);
    }
  });

  return (
    <>

      {(filteredTodos.length === 0) && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredTodos.map((todo) => (
            <tr
              key={todo.id}
              data-cy="todo"
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
                  className={classNames(
                    'has-text-success',
                    {
                      'has-text-danger': !todo.completed,
                    },
                  )}
                >
                  {todo.title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                {currentTodo?.id === todo.id
                  ? (
                    <button
                      data-cy="selectButton"
                      className="button is-link"
                      type="button"
                      onClick={() => {
                        removeTodo();
                      }}
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
                        setTodo(todo);
                      }}
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
    </>
  );
};
