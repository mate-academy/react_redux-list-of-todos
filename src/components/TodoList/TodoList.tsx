import React from 'react';

import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectTodo = useAppSelector(state => state.currentTodo);
  const isSelected = (id: number) => selectTodo?.id === id;

  const filteredTodos = useAppSelector(({ filter, todos }) => {
    const allTodos: Todo[] = todos;
    const queryToLowerCase = filter.query.toLowerCase();

    return allTodos.filter(todo => {
      switch (filter.status) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        case 'all':
        default:
          return todo;
      }
    })
      .filter(todo => todo.title.toLowerCase().includes(queryToLowerCase));
  });

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
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
          {filteredTodos.map(todo => {
            const { id, title, completed } = todo;

            return (
              <tr
                key={id}
                data-cy="todo"
                className={cn({
                  'has-background-info-light': isSelected(id),
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
                    className={cn({
                      'has-text-danger': !completed,
                      'has-text-success': completed,
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
                    onClick={() => dispatch(
                      currentActions.setTodo(todo),
                    )}
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': !isSelected(id),
                          'fa-eye-slash': isSelected(id),
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
    </>
  );
};
