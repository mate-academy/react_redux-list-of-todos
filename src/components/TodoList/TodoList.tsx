/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { useDispatch } from 'react-redux';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);

  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const { query, status } = useAppSelector(state => state.filter);

  const setCurrentTodo = (value: Todo) =>
    dispatch(currentTodoActions.setTodo(value));

  let visibleTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  visibleTodos = visibleTodos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <>
      {!visibleTodos.length ? (
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
              const { id, title, completed } = todo;

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
                      onClick={() => setCurrentTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={cn('far', {
                            'fa-eye': currentTodo?.id !== todo.id,
                            'fa-eye-slash': currentTodo?.id === todo.id,
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
