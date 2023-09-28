/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

type Props = {
  filteredTodos: Todo[],
};

export const TodoList: React.FC<Props> = (
  { filteredTodos },
) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const setSelectedTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  return (
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
        {
          filteredTodos.map(todo => {
            return (
              <tr data-cy="todo" className="" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={classNames(
                    todo.completed ? 'has-text-success' : 'has-text-danger',
                  )}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames(
                        selectedTodo?.id !== todo.id
                          ? 'far fa-eye'
                          : 'far fa-eye-slash',
                      )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
