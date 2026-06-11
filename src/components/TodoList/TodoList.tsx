/* eslint-disable */
import React from 'react';
import { setCurrentTodo } from '../../features/currentTodo';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos.items);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const error = useAppSelector(state => state.todos.error);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = todos
    .filter(todo => {
      switch (status) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {filteredTodos.length > 0 && (
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
              <tr data-cy="todo" key={todo.id}>
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
                  <button data-cy="selectButton" className="button" type="button" onClick={() => dispatch(setCurrentTodo(todo))}>
                    <span className="icon">
                      <i className={todo.id === currentTodo?.id ? 'far fa-eye-slash' : 'far fa-eye'} />
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
