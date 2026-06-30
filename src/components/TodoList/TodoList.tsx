/* eslint-disable */
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector((state: RootState) => state.filter);
  const filteredTodos = todos.filter(todo => {
    const matchedQuery = todo.title
      .toLowerCase()
      .includes(filter.query.toLowerCase());

    const matchedStatus =
      filter.status === 'all'
        ? true
        : filter.status === 'completed'
          ? todo.completed
          : !todo.completed;
    return matchedQuery && matchedStatus;
  });

  const currentTodo = useAppSelector(state => state.currentTodo);

  return (
    <>
    {!filteredTodos && (
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
                <i className="fas fa-check" data-cy="iconCompleted" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed && (
                  <span className="icon">
                    <i className="fas fa-check" data-cy="iconCompleted" />
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
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  <span className="icon">
                    <i
                      className={
                        currentTodo?.id === todo.id
                          ? 'fas fa-eye-slash'
                          : 'far fa-eye'
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
