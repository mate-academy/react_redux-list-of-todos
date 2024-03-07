/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  selectedTodo: Todo | null,
  changeSelectedTodo: (item: Todo) => void,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  selectedTodo,
  changeSelectedTodo = () => {},
}) => {
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
        {todos.map(todo => (
          <tr
            data-cy="todo"
            className={cn({
              'has-background-info-light': todo.id === selectedTodo?.id,
            })}
            key={todo.id}
          >
            <td className="is-vcentered">{todo.id}</td>

            {todo.completed ? (
              <td className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              </td>
            ) : (
              <td className="is-vcentered" />
            )}

            <td className="is-vcentered is-expanded">
              <p className={cn({
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
                onClick={() => changeSelectedTodo(todo)}
              >
                <span className="icon">
                  <i className={`far ${todo.id === selectedTodo?.id ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
