/* eslint-disable */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const currentId = currentTodo ? currentTodo.id : null;
  const filteredTodos =
    filter.query === '' && filter.status === 'all'
      ? todos
      : todos.filter(
          todo =>
            (filter.status === 'all' ||
              todo.completed === (filter.status === 'completed')) &&
            (filter.query === '' ||
              todo.title.toLowerCase().includes(filter.query.toLowerCase())),
        );

  return (
    <>
      {filteredTodos.length === 0 ? (
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
            {filteredTodos.map(({ id, completed, title, userId }) => (
              <tr
                key={id}
                data-cy="todo"
                className={currentId === id ? 'has-background-info-light' : ''}
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
                    onClick={() =>
                      dispatch(
                        currentTodoSlice.actions.setTodo({
                          id,
                          completed,
                          title,
                          userId,
                        }),
                      )
                    }
                  >
                    <span className="icon">
                      <i
                        className={cn('far', {
                          'fa-eye': currentId !== id,
                          'fa-eye-slash': currentId === id,
                        })}
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
