/* eslint-disable max-len */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions } from '../../features/currentTodo';
import { RootState } from '../../app/store';

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector((state) => state.filter);
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const setTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesQuery = todo.title.toLowerCase().trim().includes(query.toLowerCase().trim());
    const matchesStatus = status === 'all' || (status === 'active' && !todo.completed) || (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <>
      {todos.length === 0 ? (
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
            {filteredTodos.map(todo => (
              <tr data-cy="todo" key={todo.id} className={todo === currentTodo ? 'has-background-info-light' : ''}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed ? (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  ) : null}
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
                    onClick={() => setTodo(todo)}
                  >
                    {todo === currentTodo ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
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
