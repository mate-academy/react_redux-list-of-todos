import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    switch (status) {
      case 'active':
        return matchesQuery && !todo.completed;
      case 'completed':
        return matchesQuery && todo.completed;
      default:
        return matchesQuery;
    }
  });

  const handleSelectTodo = (todo: Todo) => {
    if (currentTodo?.id === todo.id) {
      dispatch(setCurrentTodo(null));
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  return (
    <table className="table is-narrow is-fullwidth" data-cy="todosTable">
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
        {visibleTodos.map(todo => {
          const isSelected = currentTodo?.id === todo.id;

          return (
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
                <p className={todo.completed ? 'has-text-success' : ''}>
                  {todo.title}
                </p>
              </td>
              <td className="is-vcentered is-narrow">
                <button
                  type="button"
                  className="button"
                  data-cy="selectButton"
                  onClick={() => handleSelectTodo(todo)}
                >
                  <span className="icon">
                    <i
                      className={`far ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
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
