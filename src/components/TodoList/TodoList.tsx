import React, { useState } from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  showTodo: (todo: Todo) => void;
  showModal: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, showTodo, showModal }) => {
  const [todoId, setTodoId] = useState(0);

  const handleButton = (todo: Todo) => {
    showTodo(todo);
    setTodoId(todo.id);
  };

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
            className={showModal
              && todo.id === todoId ? 'has-background-info-light' : ''}
            key={todo.id}
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
                className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
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
                  handleButton(todo);
                }}
              >
                <span className="icon">
                  <i className={`far ${showModal && todo.id === todoId ? 'fa-eye-slash' : 'fa-eye'}`} />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
