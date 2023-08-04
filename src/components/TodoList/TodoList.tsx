/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
  errorMessage: string,
};

export const TodoList: React.FC<Props> = ({ todos, errorMessage }) => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector((state) => state.currentTodo);

  const handleClick = (todoId: number) => {
    const findTodo = todos.find(todo => todo.id === todoId);

    if (findTodo) {
      dispatch(currentTodoActions.setTodo(findTodo));
    }
  };

  return (
    <>
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
          {!errorMessage
            ? todos.map(({ id, completed, title }) => (
              <tr
                key={id}
                data-cy="todo"
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
                    })}
                  >
                    {title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleClick(id)}
                  >
                    <span className="icon">
                      {selectTodo && selectTodo.id === id
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            ))
            : <td>{errorMessage}</td>}
        </tbody>
      </table>
    </>
  );
};
