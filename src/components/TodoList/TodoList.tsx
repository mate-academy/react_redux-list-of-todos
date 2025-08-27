/* eslint-disable */
import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { currentTodoSlice } from '../../features/currentTodo';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos: Todo[] = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  function getFilteredTodos(
    todos: Todo[],
    { status, query }: { status: string; query: string },
  ) {
    if (status === 'all') {
      return todos.filter(todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return todos.filter(
      todo =>
        todo.title.toLowerCase().includes(query.toLowerCase()) &&
        (status === 'active' ? !todo.completed : todo.completed),
    );
  }

  const filtered = getFilteredTodos(todos, { status, query });

  return (
    <>
      {todos.length > 0 ? (
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
            {filtered.map(todo => (
              <tr
                data-cy="todo"
                className={`${currentTodo === todo ? 'has-background-info-light' : ''}`}
                key={todo.id}
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
                    className={`has-text-${todo.completed ? 'success' : 'danger'}`}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    onClick={() => {
                      dispatch(currentTodoSlice.actions.setCurrentTodo(todo));
                    }}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i
                        className={`far fa-eye${currentTodo === todo ? '-slash' : ''}`}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
