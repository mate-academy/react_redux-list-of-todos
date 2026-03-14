/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
interface TodoListProp {
  todos: Todo[];
  onShow: (todo: Todo) => void;
  selectedTodo?: Todo | null;
}

export const TodoList: React.FC<TodoListProp> = ({
  todos,
  onShow,
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
        <th> </th>
      </tr>
    </thead>

    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} data-cy="todo">
          <td className="is-vcentered">{todo.id}</td>
          <td className="is-vcentered">
            <span
              className={`icon has-text-${
                todo.completed ? 'success' : 'danger'
              }`}
            ></span>
          </td>
          <td>{todo.title}</td>

          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              type="button"
              className="button is-link is-light is-small"
              onClick={() => onShow(todo)}
            >
              <span>
                <i className={`fas fa-${todo.completed ? 'check' : 'times'}`} />
              </span>
              <span
                className="icon"
                data-cy={todo.completed ? 'iconCompleted' : 'iconNotCompleted'}
              ></span>
              {selectedTodo && selectedTodo.id === todo.id ? (
                <i className="far fa-eye-slash" />
              ) : (
                <i className="far fa-eye" />
              )}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
