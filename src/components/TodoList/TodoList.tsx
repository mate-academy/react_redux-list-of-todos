/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/index';
import { setOpen } from '../../features/currentTodo';
import cn from 'classnames';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const { query, status } = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo.todo);
  const isLoading = useAppSelector(state => state.todos.isLoading);

  const filteredTodos = todos.filter(todo => {
    const statusMatches =
      status === 'all' ||
      (status === 'active' ? !todo.completed : todo.completed);
    const queryMatches = todo.title.toLowerCase().includes(query.toLowerCase());
    return statusMatches && queryMatches;
  });

  return (
    <>
      {!isLoading && filteredTodos.length === 0 && (
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
          {filteredTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={cn({
                'has-background-info-light': selectedTodo?.id === todo.id,
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
                    todo.completed ? 'has-text-success' : 'has-text-danger'
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
                  onClick={() => dispatch(setOpen(todo))}
                >
                  <span className="icon">
                    <i
                      className={cn('far', {
                        'fa-eye': selectedTodo?.id !== todo.id,
                        'fa-eye-slash': selectedTodo?.id === todo.id,
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
