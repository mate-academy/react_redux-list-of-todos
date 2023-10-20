/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentActions } from '../../features/currentTodo';
import { SearchField } from '../../types/SearchField';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const setTodo = (todo: Todo) => dispatch(currentActions.setTodo(todo));

  const preparedTodos = todos.filter(todo => {
    const normalTodo = todo.title.toLowerCase().includes(query);

    switch (status) {
      case SearchField.ALL:
        return normalTodo;
      case SearchField.ACTIVE:
        return normalTodo && !todo.completed;
      case SearchField.COMPLETED:
        return normalTodo && todo.completed;
      default:
        return todo;
    }
  });

  return (
    <>
      {!todos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {todos.length > 0 && (
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

              <tr
                data-cy="todo"
                key={todo.id}
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
                    className={classNames(
                      todo.completed ? 'has-text-success' : 'has-text-danger',
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
                    onClick={() => setTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye-slash': currentTodo?.id === todo.id,
                        'fa-eye': currentTodo?.id !== todo.id,
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
