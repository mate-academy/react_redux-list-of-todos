/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as todoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filterTodos = () => {
    switch (status) {
      case 'active': {
        const filteredTodos = todos.filter(todo => !todo.completed);

        return filteredTodos.filter(todo => todo.title.includes(query));
      }

      case 'completed': {
        const filteredTodos = todos.filter(todo => todo.completed);

        return filteredTodos.filter(todo => todo.title.includes(query));
      }

      default:
        return todos.filter(todo => todo.title.includes(query));
    }
  };

  const handleClickInfoTodo = (todo: Todo) => () => {
    dispatch(todoActions.setTodo(todo));
  };

  return (
    <>
      {!filterTodos().length ? (
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
            {filterTodos().map(({
              id, title, completed, userId,
            }) => (
              <tr key={id} data-cy="todo">
                <td className="is-vcentered">{id}</td>
                <td className="is-vcentered">
                  {completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={`has-text${completed ? '-success' : '-danger'}`}
                  >
                    {title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    onClick={handleClickInfoTodo({
                      id, title, completed, userId,
                    })}
                    data-cy="selectButton"
                    className="button"
                    type="button"
                  >
                    <span className="icon">
                      <i className={currentTodo?.id === id ? 'far fa-eye-slash' : 'far fa-eye'} />
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
