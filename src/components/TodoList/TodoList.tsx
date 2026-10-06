/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const { todos, currentTodo, filter } = useAppSelector(state => state);
  const { query, status } = filter;
  const dispatch = useDispatch();

  const getVisibleTodos = () => {
    let visibleTodos = [...todos];

    visibleTodos = visibleTodos.filter(todo =>
      todo.title.toLowerCase().includes(query),
    );

    if (status === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
    } else if (status === 'active') {
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
    }

    return visibleTodos;
  };

  const visibleTodos = getVisibleTodos();

  return (
    <>
      {visibleTodos.length === 0 ? (
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
            {visibleTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={cn({
                  'has-background-info-light': currentTodo?.id === todo.id,
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
                    className={cn({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() =>
                      dispatch(currentTodoActions.selectTodo(todo))
                    }
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
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
