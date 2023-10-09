import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentTodo: Todo | null
  setCurrentTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
};

export const TodoList: React.FC<Props> = React.memo(({
  todos,
  setLoading,
  currentTodo,
  setCurrentTodo,
}) => {
  const handleClick = (clickedTodo: Todo) => {
    setCurrentTodo(clickedTodo);
    setLoading(true);
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
            key={todo.id}
            data-cy="todo"
            className={cn({
              'has-background-info-light': todo.id === currentTodo?.id,
            })}
          >
            <td className="is-vcentered">{todo.id}</td>
            <td className="is-vcentered">
              {!!todo.completed && (
                <span className="icon" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td className="is-vcentered is-expanded">
              <p
                className={cn({
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
                onClick={() => handleClick(todo)}
              >
                <span className="icon">
                  <i
                    className={cn('far', {
                      'fa-eye': todo.id !== currentTodo?.id,
                      'fa-eye-slash': todo.id === currentTodo?.id,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
