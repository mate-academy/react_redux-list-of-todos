import React from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { actions as currentTodoActions } from '../../features/currentTodo';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

function getVisibleTodos(todos: Todo[], query: string, status: Status) {
  let todoCopy = [...todos];

  switch (status) {
    case 'active':
      todoCopy = todoCopy.filter((todo) => !todo.completed);
      break;
    case 'completed':
      todoCopy = todoCopy.filter((todo) => todo.completed);
      break;
    case 'all':
      break;
    default:
      throw new Error('There is an issue with status type definition...');
  }

  if (query) {
    todoCopy = todoCopy.filter(
      (todo) => todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  return todoCopy;
}

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    todos,
    filter: { query, status },
    currentTodo,
  } = useAppSelector((state) => state);

  const handleTodoSelection = (todo: Todo) => {
    dispatch(currentTodoActions.setCurrentTodo(todo));
  };

  const visibleTodos = getVisibleTodos(todos, query, status);

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!!visibleTodos.length && (
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
            {visibleTodos.map(({
              id, title, completed, userId,
            }) => (
              <tr
                data-cy="todo"
                key={id}
                className={classNames({
                  'has-background-info-light': currentTodo?.id === id,
                })}
              >
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames(
                      completed ? 'has-text-success' : 'has-text-danger',
                    )}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleTodoSelection({
                      id, title, completed, userId,
                    } as Todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames(
                          'far',
                          currentTodo?.id === id ? 'fa-eye-slash' : 'fa-eye',
                        )}
                      />
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
