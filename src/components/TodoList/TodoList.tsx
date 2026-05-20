/* eslint-disable */
import React from 'react';
import { setCurrentTodo, clearCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../hooks';


export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state: RootState) => state.todos);
  const { query, status } = useAppSelector((state: RootState) => state.filter);
  
  const currentTodo = useAppSelector((state: RootState) => state.currentTodo);

  const filteredTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && !todo.completed) ||
      (status === 'completed' && todo.completed);

    return matchesQuery && matchesStatus;
  });

  return (
    <table className="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th>#</th>
          <th className="has-text-centered">
            <i className="icon fas fa-check" />
          </th>
          <th>Title</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredTodos.map(todo => (
          <tr key={todo.id} data-cy="todo">
            <td>{todo.id}</td>
            <td className="has-text-centered">
              {todo.completed && (
                <span className="icon has-text-black" data-cy="iconCompleted">
                  <i className="fas fa-check" />
                </span>
              )}
            </td>
            <td
              className={
                todo.completed ? 'has-text-success' : 'has-text-danger'
              }
            >
              {todo.title}
            </td>
            <td>
              <button
                data-cy="selectButton"
                className="button"
                onClick={() =>
                 dispatch(
                    currentTodo?.id === todo.id
                      ? clearCurrentTodo()
                      : setCurrentTodo(todo),
                  )
                }
              >
                <span className="icon">
                  <i
                    className={`fas ${currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                  />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
