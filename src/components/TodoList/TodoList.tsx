/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  let visibleTodos = [...todos];

  if (query) {
    visibleTodos = visibleTodos.filter(todo => todo.title.toLowerCase().includes(query.trim().toLowerCase()));
  }

  if (status !== 'all') {
    visibleTodos = visibleTodos.filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          throw new Error('Wrong filter');
      }
    });
  }

  return (
    <>
      {!visibleTodos.length
        ? (
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
              {visibleTodos.map(todo => {
                const isCurrent = currentTodo?.id === todo.id;
                const { id, completed, title } = todo;

                return (
                  <tr data-cy="todo" key={id}>
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
                        onClick={() => dispatch(actions.setTodo(todo))}
                      >
                        <span className="icon">
                          <i
                            className={cn('far', {
                              'fa-eye': !isCurrent,
                              'fa-eye-slash': isCurrent,
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
