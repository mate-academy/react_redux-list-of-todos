import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { query, status } = useAppSelector(state => state.filter);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredTodos = todos.filter((todo: Todo) => {
    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    if (status === 'active') {
      return matchesQuery && !todo.completed;
    }

    if (status === 'completed') {
      return matchesQuery && todo.completed;
    }

    return matchesQuery;
  });

  return (
    <table
      className="table is-fullwidth is-striped is-hoverable"
      data-cy="todoList"
    >
      <tbody>
        {filteredTodos.map((todo: Todo) => {
          const isSelected = currentTodo?.id === todo.id;

          return (
            <tr
              key={todo.id}
              data-cy="todo"
              className={isSelected ? 'has-background-info-light' : ''}
            >
              <td>{todo.id}</td>

              <td className="is-vcentered">
                {todo.completed ? (
                  <span
                    className="icon has-text-success"
                    data-cy="iconCompleted"
                  >
                    <i className="fas fa-check" />
                  </span>
                ) : (
                  <span className="icon" />
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
                  type="button"
                  className="button is-link"
                  data-cy="selectButton"
                  onClick={() =>
                    dispatch(setCurrentTodo(isSelected ? null : todo))
                  }
                >
                  <span className="icon">
                    <i
                      className={`fas ${isSelected ? 'fa-eye-slash' : 'fa-eye'}`}
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
