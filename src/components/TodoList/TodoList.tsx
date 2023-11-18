import React, { useMemo } from 'react';
import { StatusFilterSelect } from '../../enums/StatusFilterSelect';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as actionsCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const dispatch = useAppDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filterTodos = useMemo(() => {
    const filteredByTodos = todos.filter((todo) => {
      const { completed } = todo;

      switch (status) {
        case StatusFilterSelect.ALL: return true;
        case StatusFilterSelect.ACTIVE: return !completed;
        case StatusFilterSelect.COMPLETED: return completed;
        default: return true;
      }
    });

    const filteredByQueryTodos = query
      ? filteredByTodos.filter((todo) => todo.title
        .toLowerCase().includes(query.toLowerCase())) : filteredByTodos;

    return filteredByQueryTodos;
  }, [query, status, todos]);

  return (
    !filterTodos.length ? (
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
          {
            filterTodos.map((todo) => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={
                  currentTodo ? 'has-background-info-light' : ''
                }
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {
                    todo.completed && (
                      <span className="icon" data-cy="iconCompleted">
                        <i className="fas fa-check" />
                      </span>
                    )
                  }
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={todo.completed
                    ? 'has-text-success'
                    : 'has-text-danger'}
                  >
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(actionsCurrentTodo.setTodo(todo))}
                  >
                    <span className="icon">
                      <i className={
                        currentTodo
                          ? 'far fa-eye-slash'
                          : 'far fa-eye'
                      }
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  );
};
