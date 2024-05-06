/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currTodosActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentFilter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const handleChooseTodo = (todo: Todo) => {
    dispatch(currTodosActions.setTodo(todo));
  };

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(currentFilter.query.toLowerCase());

    switch (currentFilter.status) {
      case 'completed':
        return todo.completed && matchesQuery;
      case 'active':
        return !todo.completed && matchesQuery;
      default:
        return matchesQuery;
    }
  });

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
          {visibleTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={
                todo === currentTodo ? 'has-background-info-light' : ''
              }
            >
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered" />
              )}
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
                  onClick={() => handleChooseTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={
                        todo === currentTodo ? 'far fa-eye-slash' : 'far fa-eye'
                      }
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
