/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  selectTodoId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onSelect,
  selectTodoId,
}) => {
  if (todos.length === 0) {
    return (
      <div className="notification">
        There are no todos matching current filter criteria.
      </div>
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
        {todos.map(todo => {
          return (
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
                {!todo.completed ? (
                  <p className="has-text-danger">{todo.title}</p>
                ) : (
                  <p className="has-text-success">{todo.title}</p>
                )}
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => onSelect(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        selectTodoId === todo.id
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
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
