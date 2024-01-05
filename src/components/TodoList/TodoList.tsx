import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { filter, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const currentTodos = useMemo(() => {
    let filteredTodos = todos;

    // Step 1: Filter by status
    switch (filter) {
      case Status.ACTIVE:
        filteredTodos = filteredTodos.filter((todo) => (
          !todo.completed
        ));
        break;
      case Status.COMPLETED:
        filteredTodos = filteredTodos.filter((todo) => (
          todo.completed
        ));
        break;
      default:
        break;
    }

    // Step 2: Filter by query
    const queryReformat = query.trim().toLowerCase();

    if (queryReformat) {
      filteredTodos = filteredTodos.filter((todo) => (
        todo.title.toLowerCase().includes(queryReformat)
      ));
    }

    return filteredTodos;
  }, [todos, filter, query]);

  return (
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
        {currentTodos.map((todo) => {
          const { id, title, completed } = todo;

          return (
            <tr key={id} data-cy="todo">
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
                  className={`has-text-${completed ? 'success' : 'danger'}`}
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
                      className={`far fa-eye${currentTodo?.id === id ? '-slash' : ''}`}
                    />
                  </span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
