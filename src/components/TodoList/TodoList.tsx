/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearCurrentTodo, setCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.trim().toLowerCase());

    switch(status) {
      case 'active': 
        return matchesQuery && !todo.completed;
      case 'completed': 
        return matchesQuery && todo.completed;
      
      case 'all':
      default: 
        return matchesQuery;
    }
  });

  const handleSelectTodo = (todo: Todo) => {
    if(currentTodo?.id === todo.id) {
      dispatch(clearCurrentTodo());
    } else {
      dispatch(setCurrentTodo(todo));
    }
  };

  if (visibleTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

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
        {visibleTodos.map(todo => {
          const { id, title, completed } = todo;
          const isSelected = currentTodo?.id === id;

          return (
            <tr
              key={id}
              data-cy="todo"
              className={isSelected ? 'has-background-info-light' : undefined}
            >
              <td className="is-vcentered">{id}</td>
              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p className={completed ? 'has-text-success' : 'has-text-danger'}>
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleSelectTodo(todo)}
                >
                  <span className="icon">
                    <i className={isSelected ? 'far fa-eye-slash' : 'far fa-eye'} />
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

