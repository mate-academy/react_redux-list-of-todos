import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSetSelectedTodo: (todo: Todo) => void;
  selectedTodoId?: number;
};

export const TodoList: React.FC<Props> = (props) => {
  const { todos, onSetSelectedTodo, selectedTodoId } = props;

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
        {todos.map((todo) => {
          const { id, title, completed } = todo;
          const isSelected = selectedTodoId === id;

          return (
            <tr
              data-cy="todo"
              className={classNames(
                { 'has-background-info-light': isSelected },
              )}
              key={id}
            >
              <td className="is-vcentered">{id}</td>
              {completed
                ? (
                  <td className="is-vcentered">
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  </td>
                )
                : <td className="is-vcentered" />}

              <td className="is-vcentered is-expanded">
                <p className={classNames(
                  { 'has-text-success': completed },
                  { 'has-text-danger': !completed },
                )}
                >
                  {title}
                </p>
              </td>
              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSetSelectedTodo(todo)}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye': !isSelected },
                      { 'fa-eye-slash': isSelected },
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
