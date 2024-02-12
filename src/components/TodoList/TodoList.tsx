/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { State } from '../../types/Status';
import { actions } from '../../features/currentTodo';

function filterTodos(todos: Todo[], { query, status }: State) {
  let todosToFilter = todos;

  if (query) {
    todosToFilter = todosToFilter.filter((todo) => todo.title.toLowerCase().includes(query));
  }

  switch (status) {
    case 'completed':
      return todosToFilter.filter((todo) => todo.completed);

    case 'active':
      return todosToFilter.filter((todo) => !todo.completed);

    default:
      return todosToFilter;
  }
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos);
  const filterParams = useAppSelector((state) => state.filter);
  const currentTodo = useAppSelector((state) => state.currentTodo);

  const filteredTodos = filterTodos([...todos], filterParams);

  return (
    <>
      {!filteredTodos.length ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
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
            {filteredTodos.map((todo) => {
              const { id, title, completed } = todo;

              return (
                <tr key={id} data-cy="todo">
                  <td className="is-vcentered">{id}</td>
                  {completed && (
                    <td className="is-vcentered">
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    </td>
                  )}
                  <td className="is-vcentered is-expanded">
                    <p
                      className={cn({
                        'has-text-success': completed,
                        'has-text-danger': !completed,
                      })}
                    >
                      {title}
                    </p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => {
                        dispatch(actions.setTodo(todo));
                      }}
                    >
                      <span className="icon">
                        <i className={cn('far', {
                          'fa-eye': id !== currentTodo?.id,
                          'fa-eye-slash': currentTodo?.id === id,
                        })}
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
