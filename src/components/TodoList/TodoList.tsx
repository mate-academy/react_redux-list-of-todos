import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as todosActions from '../../features/todos';
import { currentTodoActions } from '../../features/currentTodo';
import { filterTodos } from '../../app/functions';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const currentTodo = useAppSelector(state => state.currentTodo) || null;
  const { status } = useAppSelector(state => state.filter);
  const { query } = useAppSelector(state => state.filter);
  const { todos } = useAppSelector(state => state.todos);

  useEffect(() => {
    dispatch(todosActions.init());
  }, []);

  const todosToDisplay = filterTodos(todos, query, status);

  return (
    <>
      {todosToDisplay.length === 0 ? (
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
            {todosToDisplay.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={
                  currentTodo?.id === todo.id ? 'has-background-info-light' : ''
                }
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
                    onClick={() => dispatch(currentTodoActions.add(todo))}
                  >
                    <span className="icon">
                      <i
                        className={`far ${currentTodo ? 'fa-eye-slash' : 'fa-eye'}`}
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
