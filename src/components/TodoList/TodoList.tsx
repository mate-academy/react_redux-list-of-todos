import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types';
import { prepareTodos } from '../../utils/prepareTodos';
import { actions } from '../../features/currentTodo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const filter = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const preparedTodos = prepareTodos(todos, filter);

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
        {preparedTodos.map(todo => (
          <tr
            data-cy="todo"
            key={todo.id}
            className={classNames({
              'has-background-info-light': selectedTodo?.id === todo.id,
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
              <p className={
                todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'
              }
              >
                {todo.title}
              </p>
            </td>
            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(actions.setTodo(todo))}
              >
                <span className="icon">
                  <i className={
                    selectedTodo?.id === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye'
                  }
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
