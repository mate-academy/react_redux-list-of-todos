/* eslint-disable */
import React from 'react';
import { setUser } from '../../features/users';
import { getUser } from '../../api';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { openModal } from '../TodoModal/modalSlice';
import { Todo } from '../../types/Todo'; // ✅ Import the type definition
//import { TodoFilterStatus } from '../../types/TodoFilterStatus'; // ✅ Import the type definition

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.todos);
  const status = useAppSelector(state => state.filter.status);

  const filteredTodos = todos.filter(todo => {
    if (status === 'completed') return todo.completed; // ✅ Show completed only
    if (status === 'active') return !todo.completed; // ✅ Show active only
    return true; // ✅ Show all todos
  });
  // ✅ Fetching from Redux

  if (filteredTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  const handleTodoClick = (todo: Todo) => {
    dispatch(openModal(todo.id)); // ✅ Store selected todo ID
    getUser(todo.userId).then(user => {
      dispatch(setUser({ id: todo.userId, user })); // ✅ Store user dynamically
    });
  };

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
        {filteredTodos.map(todo => (
          <tr key={todo.id} data-cy="todo">
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
                name="button"
                onClick={() => handleTodoClick(todo)} // ✅ Open modal on click
              >
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
