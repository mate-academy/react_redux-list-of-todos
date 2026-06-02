/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo, setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const preparedQuery = query.trim().toLowerCase();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(preparedQuery);

    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  const handleSelectTodo = (todoId: number) => {
    const selectedTodo = todos.find(todo => todo.id === todoId);

    if (!selectedTodo) {
      return;
    }

    if (currentTodo?.id === todoId) {
      dispatch(clearCurrentTodo());

      return;
    }

    dispatch(setCurrentTodo(selectedTodo));
  };

  return (
    <>
      {visibleTodos.length === 0 && (
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
                key={todo.id}
                data-cy="todo"
                className={isSelected ? 'has-background-info-light' : ''}
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
                    onClick={() => handleSelectTodo(todo.id)}
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
