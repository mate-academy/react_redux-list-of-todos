/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const query = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);

  const { addTodo } = currentTodoSlice.actions;

  const filteredQueryTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase()),
  );

  const filteredAllTodos = filteredQueryTodos.filter(todo => {
    switch (status) {
      case 'all':
        return todo;

      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      default: return todo;
    }
  })

  return (
    <>
      {filteredAllTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

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
          {filteredAllTodos.map(todo => (
            <tr
              key={todo.id}
              data-cy="todo"
              className={`${currentTodo?.id === todo.id ? 'has-background-info-light' : ''}`}
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
                  className={`${todo.completed ? 'has-text-success' : 'has-text-danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(addTodo(todo))}
                >
                  <span className="icon">
                    {currentTodo?.id === todo.id ? (
                      <i className="far fa-eye-slash" />
                    ) : (
                      <i className="far fa-eye" />
                    )}
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
