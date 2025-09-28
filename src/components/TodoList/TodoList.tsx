import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo, loadUser, Todo } from '../../features/currentTodo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const { todo: currentTodo } = useAppSelector(state => state.currentTodo);

  const handleSelectTodo = async (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      // If clicking on already selected todo, hide it
      dispatch(setCurrentTodo(null));
    } else {
      // Select new todo and load user
      dispatch(setCurrentTodo(todo));
      dispatch(loadUser(todo.userId));
    }
  };

  return (
    <div className="table-container">
      <table className="table is-fullwidth is-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.id} data-cy="todo">
              <td>{todo.id}</td>
              <td>
                <span className="is-flex is-align-items-center">
                  {todo.title}
                  {todo.completed && (
                    <span data-cy="iconCompleted" className="icon ml-2">
                      <i className="fas fa-check-circle has-text-success"></i>
                    </span>
                  )}
                </span>
              </td>
              <td>
                <span
                  className={`tag ${todo.completed ? 'is-success' : 'is-warning'}`}
                >
                  {todo.completed ? 'Completed' : 'Active'}
                </span>
              </td>
              <td>
                <button
                  data-cy="selectButton"
                  className="button is-small"
                  onClick={() => handleSelectTodo(todo)}
                >
                  {currentTodo?.id === todo.id ? (
                    <span className="icon">
                      <i className="fas fa-eye-slash"></i>
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="fas fa-eye"></i>
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
