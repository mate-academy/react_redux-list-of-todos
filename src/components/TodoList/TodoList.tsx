/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todosLoadErr: boolean;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
};

export const TodoList: React.FC<Props> = ({
  todos,
  setSelectedTodo,
  todosLoadErr,
}) => {
  const handleSelectedTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!todosLoadErr && !!todos.length && (
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
                <tr key={todo.id} data-cy="todo">
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
                      className={cn({
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
                    >
                      <span
                        // onClick={() => setSelectedTodo(todo)}
                        className="icon"
                      >
                        <i
                          onClick={() => handleSelectedTodo(todo)}
                          className="far fa-eye"
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
