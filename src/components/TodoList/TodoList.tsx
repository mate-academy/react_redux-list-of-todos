import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[],
  selectedTodoID: number,
  selectedTodo: (todo:React.SetStateAction<number>) => void,
}

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodoID,
  selectedTodo,
}) => (
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
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
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
              {
                'has-text-success': todo.completed,
                'has-text-danger': !todo.completed,
              },
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
              onClick={() => (
                selectedTodo(todo.id)
              )}
            >
              <span className="icon">
                <i className={classNames(
                  {
                    'far fa-eye-slash': selectedTodoID,
                    'far fa-eye': !selectedTodoID,
                  },
                )}
                />
              </span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
