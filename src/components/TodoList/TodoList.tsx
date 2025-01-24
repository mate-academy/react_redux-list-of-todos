/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { currentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

interface Props {
  todosList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todosList }) => {
  const current = useSelector((state: RootState) => state.currentTodo);
  const filter = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  function filterTodos() {
    switch (filter.status) {
      case 'all': {
        return filter.query
          ? todosList.filter(todo => todo.title.toLowerCase().includes(filter.query.toLowerCase()))
          : todosList;
      }
      case 'active': {
        return filter.query
          ? todosList.filter(
              todo =>
                !todo.completed && todo.title.toLowerCase().includes(filter.query.toLowerCase()),
            )
          : todosList.filter(todo => !todo.completed);
      }
      case 'completed': {
        return filter.query
          ? todosList.filter(
              todo =>
                todo.completed && todo.title.toLowerCase().includes(filter.query.toLowerCase()),
            )
          : todosList.filter(todo => todo.completed);
      }
      default:
        return todosList;
    }
  }

  const currentTodos = filterTodos();

  return (
    <>
      {currentTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {currentTodos.length > 0 && (
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
            {currentTodos.map(todo => (
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
                      if (todo !== null) {
                        dispatch(currentTodo(todo));
                      }
                    }}
                  >
                    <span className="icon">
                      <i
                        className={`far ${current?.id === todo.id ? 'fa-eye-slash' : 'fa-eye'}`}
                      />
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
