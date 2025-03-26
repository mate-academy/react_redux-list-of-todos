/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/store';
import { filterSelector } from '../../features/filter';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions, currentTodoSelector } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const filter = useAppSelector(filterSelector);
  const currentTodo = useAppSelector(currentTodoSelector);
  const dispatch = useDispatch();

  if (!todos.length && !!filter.query) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
      {todos.map((todo: Todo) => {
        return (
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
                className="button"
                type="button"
                onClick={() => {
                  dispatch(actions.set(todo));
                }}
              >
                <span className="icon">
                  <i
                    className={classNames(
                      'far',
                      currentTodo === todo ? 'fa-eye-slash' : 'fa-eye',
                    )}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
  );
};
