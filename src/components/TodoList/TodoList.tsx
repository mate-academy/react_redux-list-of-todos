/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const currentTodos = useAppSelector(state => state.currentTodos);
  const filter = useAppSelector(state => state.filter);

  const preparedTodos = todos
    .filter(todo => {
      switch (filter.status) {
        case 'all':
          return true;

        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    })
.filter(todo =>
  todo.title
    .toLocaleLowerCase()
    .includes(filter.query.trim().toLocaleLowerCase())
)

  return (
    <>
      {preparedTodos.length === 0 && (
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
          {preparedTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered"> </td>
              <td className="is-vcentered">
                {todo?.completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check"></i>
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded ">
                <p
                  className={`has-text-${todo?.completed ? 'success' : 'danger'}`}
                >
                  {todo.title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => {
                    dispatch(currentTodoActions.setCurrentTodos(todo));
                  }}
                >
                  <span className="icon">
                    <i
                      className={`far fa-eye${currentTodos?.id === todo.id ? '-slash' : ''}`}
                    />
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
