/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectedTodos } from '../../features/todos';
import {
  actions as currentTodoActions,
  todoSelector,
} from '../../features/currentTodo';

import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectedTodos.getVisibleTodos);
  const selectedTodo = useAppSelector(todoSelector.getCurrentTodo);

  const selectedTodoId = selectedTodo?.id;

  const selectTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

  return (
    <>
      {
        todos.length === 0
        && (
          <p className="notification is-warning">
            There are no todos matching current filter criteria
          </p>
        )
      }

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
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn({
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
                  onClick={() => selectTodo(todo)}
                >
                  <span className="icon">
                    <i className={cn('far fa-eye', {
                      'far fa-eye-slash': todo.id === selectedTodoId,
                    })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
