/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classname from 'classnames';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }
    if (status === 'completed' && !todo.completed) {
      return false;
    }

    if (query && !todo.title.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <>
    { visibleTodos.length === 0 && (
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
          {visibleTodos.map(todo => {
            const isSelected = currentTodo?.id === todo.id;

            return (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classname({ 'has-background-info-light': todo.completed })}
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
                    className={classname({
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
                    onClick={() => dispatch(setCurrentTodo(isSelected ? null : todo))}
                  >
                    <span className="icon">
                      <i
                        className={classname('far', {
                          'fa-eye': !isSelected,
                          'fa-eye-slash': isSelected,
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
