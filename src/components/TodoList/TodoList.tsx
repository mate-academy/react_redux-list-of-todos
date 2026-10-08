/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { currentTodoSlice } from '../../features/currentTodo';
export const TodoList: React.FC = () => {
  const Todos = useSelector((state: RootState) => state.todos);
  let query = useSelector((state: RootState) => state.filter.query);
  let category = useSelector((state: RootState) => state.filter.status);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();
  const filteredTodos = Todos.filter((todo: Todo) => {
    if (category === 'all') {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    }
    if (category === 'active') {
      if (!todo.completed) {
        return todo.title.toLowerCase().includes(query.trim().toLowerCase());
      }
    }
    if (category === 'completed') {
      if (todo.completed) {
        return todo.title.toLowerCase().includes(query.trim().toLowerCase());
      }
    }
    return;
  });
  const handleClick = (todo: Todo) => {
    dispatch(currentTodoSlice.actions.setPost(todo));
  };
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
                <p
                  className={classNames(
                    !todo.completed ? 'has-text-danger' : 'has-text-success',
                  )}
                >
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
                    <i
                      className={classNames(
                        'far',
                        currentTodo?.id === todo.id ? 'fa-eye-slash' : 'fa-eye',
                      )}
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
