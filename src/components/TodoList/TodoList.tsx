/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  handleCurrentTodo: (todo: Todo) => void;
  currentTodo: Todo | null;
};

export const TodoList: React.FC<Props> = ({ todos, handleCurrentTodo, currentTodo }) => {
  const todoCompletedClass = (value: boolean) => cn(
    { 'has-text-danger': value === false },
    { 'has-text-success': value === true },
  );

  const eyeClass = (selectedTodo: Todo | null, filteredTodo: Todo) => cn(
    'far',
    { 'fa-eye': selectedTodo === null },
    { 'fa-eye-slash': selectedTodo && selectedTodo.id === filteredTodo.id },
  );

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
                <span aria-label="delete" className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th aria-label="delete"> </th>
            </tr>
          </thead>

          <tbody>
            {todos.map(todo => (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={todoCompletedClass(todo.completed)}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleCurrentTodo(todo)}
                    aria-label="delete"
                  >
                    <span className="icon">
                      <i className={eyeClass(currentTodo, todo)} />
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
