/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type State = Todo | null;

interface Props {
  onSetTodo: (todo: Todo) => void;
  currentTodo: State;
  todos: Todo[]
}

export const TodoList: React.FC<Props> = ({
  onSetTodo,
  currentTodo,
  todos,
}) => {
  const handleCurrentTodo = (todo: Todo) => {
    onSetTodo(todo); // function that dispatch todo;
  };

  return (
    todos.length ? (
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th aria-label="th">
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th aria-label="empty-head"> </th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo: Todo) => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td aria-label="empty-head" className="is-vcentered">
                <span className="icon" data-cy="iconCompleted">
                  <i className={cn({ 'fas fa-check': todo.completed })} />
                </span>
              </td>

              <td className="is-vcentered is-expanded">
                <p className={cn(
                  { 'has-text-success': todo.completed },
                  { 'has-text-danger': !todo.completed },
                )}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  aria-label="button"
                  onClick={() => handleCurrentTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button"
                >
                  <span className="icon">
                    <i className={cn('far',
                      { 'fa-eye': currentTodo === null || currentTodo.id !== todo.id },
                      { 'fa-eye-slash': currentTodo && currentTodo.id === todo.id })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    )
  );
};
