/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import Todo from '../../types/Todo';

import { selectors } from '../../store';
import { actions as currentTodoActions } from '../../store/currentTodo';

type Props = {
  todos: Todo[];
};

const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const { todo: selectedTodo } = useSelector(selectors.currentTodo);

  const handleTodoSelect = (todoId: number) => {
    dispatch(currentTodoActions.setTodoId(todoId));
  };

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

          <th />
        </tr>
      </thead>

      <tbody>
        {todos.map(todo => (
          <tr
            key={todo.id}
            data-cy="todo"
            className={classNames({
              'has-background-info-light': todo.id === selectedTodo.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>

            {todo.completed
              ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              )
              : (
                <td className="is-vcentered" />
              )}

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
                type="button"
                className="button"
                onClick={() => handleTodoSelect(todo.id)}
                data-cy="selectButton"
              >
                <span className="icon">
                  <i
                    className={classNames({
                      far: true,
                      'fa-eye': todo.id !== selectedTodo.id,
                      'fa-eye-slash': todo.id === selectedTodo.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default React.memo(TodoList);
