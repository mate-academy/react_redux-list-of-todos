/* eslint-disable */
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { currentTodoSlice } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const status = useAppSelector(state => state.filter.status);
  const query = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

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
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const handleButton = (value: Todo) => {
    dispatch(currentTodoSlice.actions.setTodo(value));
  };

  return (
    <>
      {!filteredTodos.length ? (
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
                    className={classNames({
                      'has-text-danger': !todo.completed,
                      'has-text-success': todo.completed,
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
                    onClick={() => handleButton(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': currentTodo?.id !== todo.id || !currentTodo,
                          'fa-eye-slash': currentTodo?.id === todo.id,
                        })}
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
