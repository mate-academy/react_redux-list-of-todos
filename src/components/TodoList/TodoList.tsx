import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  selectedTodo,
  setSelectedTodo,
}) => {
  return (
    <>
      {todos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
                key={todo.id}
                data-cy="todo"
                className={classNames('', {
                  'has-background-info-ligth': selectedTodo,
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
                  <p
                    className={
                      todo.completed ? 'has-text-succes' : 'has-text-danger'
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
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={
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
      )}
    </>
  );
};
