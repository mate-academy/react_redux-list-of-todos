/* eslint-disable */
import React from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useDispatch } from 'react-redux';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);

  const setSelectedTodo = (todo: Todo) =>
    dispatch(currentTodoSlice.actions.setSelectedTodo(todo));

  enum Status {
    Active = 'active',
    Completed = 'completed',
  };

  let filterTodos = [...todos];

  switch (status) {
    case Status.Active:
      filterTodos = filterTodos.filter(todo => todo.completed);
      break;
    case Status.Completed:
      filterTodos = filterTodos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  if (query.trim().length > 0) {
    filterTodos = filterTodos.filter(todo =>
      todo.title.toLowerCase().trim().includes(query.trim().toLowerCase()),
    );
  }

  return (
    <>
      {!filterTodos.length ? (
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
            {filterTodos.map(todo => (
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': selectedTodo?.id === todo.id,
                })}
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
                    className={classNames('has-text-success', {
                      'has-text-danger': !todo.completed,
                    })}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setSelectedTodo(todo)}
                  >
                    <span className="icon">
                      {selectedTodo?.id === todo.id ? (
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
      )}
    </>
  );
};
