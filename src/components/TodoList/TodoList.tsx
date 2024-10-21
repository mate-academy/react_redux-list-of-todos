/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch: AppDispatch = useDispatch();

  const handleEyeButton = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
  };

  return (
    <>
      {todoList.length === 0 ? (
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
            {todoList.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': currentTodo === todo,
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
                    onClick={() => handleEyeButton(todo)}
                  >
                    {todo !== currentTodo ? (
                      <span className="icon">
                        <i className="far fa-eye" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="far fa-eye-slash" />
                      </span>
                    )}
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
