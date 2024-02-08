/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';

export const TodoList: React.FC = ({
  onSetTodo,
  currentTodo,
  todos,
}) => {

  let isTodoSelected //  check if currentTodo id and todo id equals

  const handleCurrentTodo = (todo) => {
    onSetTodo(todo); // function that dispatch todo
    isTodoSelected = currentTodo.id === todo.id;
  };

  return (
    todos.length ? (
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
          {todos.map((todo) => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
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
                <button onClick={() => handleCurrentTodo(todo)}
                  data-cy="selectButton"
                  className="button"
                  type="button">
                  <span className="icon">
                    <i className={cn('far',
                      { 'fa-eye': !isTodoSelected },
                      { 'fa-eye-slash': isTodoSelected })}
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
