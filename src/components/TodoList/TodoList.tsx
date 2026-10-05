import React from 'react';

import { Todo } from '../../types/Todo';

export const TodoList: React.FC<{
  todos: Todo[];
  selectedTodo: Todo | null;
  onSelectTodo: (todo: Todo) => void;
}> = ({ todos, selectedTodo, onSelectTodo }) => (
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
      {todos.map(currentTodo => (
        <tr
          data-cy="todo"
          className={
            selectedTodo?.id === currentTodo.id
              ? 'has-background-info-light'
              : ''
          }
          key={currentTodo.id}
        >
          <td className="is-vcentered">{currentTodo.id}</td>
          {currentTodo.completed && (
            <td className="is-vcentered">
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </td>
          )}
          {!currentTodo.completed && <td className="is-vcentered" />}
          <td className="is-vcentered is-expanded">
            <p
              className={
                !currentTodo.completed ? 'has-text-danger' : 'has-text-success'
              }
            >
              {currentTodo.title}
            </p>
          </td>
          <td className="has-text-right is-vcentered">
            <button
              data-cy="selectButton"
              className="button"
              type="button"
              onClick={() => onSelectTodo(currentTodo)}
            >
              <span className="icon">
                <i
                  className={
                    selectedTodo?.id === currentTodo.id
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
