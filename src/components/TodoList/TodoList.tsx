/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCurrentTodo } from '../../features/currentTodo';
interface Props {
  isLoading: boolean;
}
export const TodoList: React.FC<Props> = ({ isLoading }) => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const filterTodos = todos.filter(todo => {
    if (status === 'active' && todo.completed) {
      return false;
    }
    if (status === 'completed' && !todo.completed) {
      return false;
    }
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <>
      {!isLoading && filterTodos.length === 0 && (
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
          {filterTodos.map(todo => (
            <tr data-cy="todo" key={todo.id}>
              <td className="is-vcentered">{todo.id}</td>
              <td className="is-vcentered">
                {' '}
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
                  onClick={() => {
                    dispatch(setCurrentTodo(todo));
                  }}
                >
                  <span className="icon">
                    <i className="far fa-eye" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
          {/* <tr data-cy="todo">
            <td className="is-vcentered">1</td>
            <td className="is-vcentered"> </td>

            <td className="is-vcentered is-expanded">
              <p className="has-text-danger">delectus aut autem</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button data-cy="selectButton" className="button" type="button">
                <span className="icon">
                  <i className="far fa-eye" />
                </span>
              </button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};
