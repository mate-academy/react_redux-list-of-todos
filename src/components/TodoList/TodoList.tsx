/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const visibleTodos = todos.filter(todo => {
    const matchesStatus =
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed) ||
      status === 'all';

    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.trim().toLowerCase());

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
        </thead>

        <tbody>
          {visibleTodos.map(todo => {
            const isSelected = currentTodo?.id === todo.id;

            return (
              <tr data-cy="todo">
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
                    onClick={() => {
                      if (isSelected) return;
                      dispatch(setCurrentTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          isSelected ? 'far fa-eye-slash' : 'far fa-eye'
                        }
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
