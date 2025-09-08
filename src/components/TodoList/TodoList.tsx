/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSelectedTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos.todos);
  const filter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);

  const normalizFilterValue = filter.query.trim().toLowerCase();
  let filteredTodos = todos;

  if (filter.status === 'active') filteredTodos = todos.filter(t => !t.completed);
  else if (filter.status === 'completed') filteredTodos = todos.filter(t => t.completed);

  if (normalizFilterValue.length > 0)
    filteredTodos = filteredTodos.filter(t =>
      t.title.toLowerCase().includes(normalizFilterValue),
    );

  const handleClick = (todo: Todo) => {
    dispatch(setSelectedTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
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
              <tr
                key={todo.id}
                data-cy="todo"
                className={selectedTodo?.id === todo.id ? 'has-background-info-light' : ''}
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
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => handleClick(todo)}
                  >
                    <span className="icon">
                      <i className={selectedTodo?.id === todo.id ? 'far fa-eye-slash' : 'far fa-eye'} />
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
