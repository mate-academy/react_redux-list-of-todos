/* eslint-disable */
import React from 'react';
import { Todo } from '../../types/Todo';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTodo } from '../../features/currentTodo';
import { RootState } from '../../app/store';

type Props = {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query);
  const status = useSelector((state: RootState) => state.filter.status);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);

  const filteredTodos = todos
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()))
    .filter(todo => {
      if (status === 'active') {
        return !todo.completed;
      }

      if (status === 'completed') {
        return todo.completed;
      }

      return true;
    })
  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon" data-cy="iconCompleted">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredTodos.map(todo => (
            <tr data-cy="todo" key={todo.id} className={`${currentTodo?.id === todo.id ? 'has-background-info-light' : ''}`}>
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
                  onClick={() => dispatch(setCurrentTodo(todo))}
                >
                  {currentTodo?.id === todo.id ? (
                    <span className="icon">
                      <i className="far fa-eye-slash" />
                    </span>
                  ) : (
                    <span className="icon">
                      <i className="far fa-eye" />
                    </span>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
