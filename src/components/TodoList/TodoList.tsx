/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  currentTodo,
  setCurrentTodo,
}) => {
  const toggleTodoVisibility = (id: number) => {
    const newTodo = todos.find(todo => todo.id === id);

    if (newTodo) {
      setCurrentTodo(newTodo);
    }
  };

  const filteredTodos = todos.filter(todo => todo === todo); // заглушка

  return (
    <>
      {!filteredTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames({
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
                  onClick={() => toggleTodoVisibility(todo.id)}
                >
                  <span className="icon">
                    <i
                      className={classNames({
                        'far fa-eye': currentTodo?.id !== todo.id,
                        'far fa-eye-slash': currentTodo?.id === todo.id,
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
