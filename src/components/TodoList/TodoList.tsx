/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const setTodo = (todo: Todo) => {
    dispatch(actions.setTodo(todo));
  };

  const getFilteredTodos = () => {
    const updatedTodos = todos.filter(todo => todo.title
      .toLocaleLowerCase()
      .includes(filter.query));

    switch (filter.status) {
      case 'active':
        return updatedTodos.filter(todo => !todo.completed);
      case 'completed':
        return updatedTodos.filter(todo => todo.completed);
      default:
        return updatedTodos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <>
      {filteredTodos.length > 0 ? (
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
                data-cy="todo"
                key={todo.id}
                className={selectedTodo?.id === todo.id ? 'has-background-info-light' : ''}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => setTodo(todo)}
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
      ) : (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}
    </>
  );
};
