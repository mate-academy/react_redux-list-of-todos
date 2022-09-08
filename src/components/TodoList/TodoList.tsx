/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector((state: RootState) => state.todos.todos);
  const selectedTodo = useAppSelector((state: RootState) => state.currentTodo.todo);
  const { query, status } = useAppSelector((state: RootState) => state.filter);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const queriedTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  const filteredTodos = queriedTodos.filter(todo => {
    switch (status) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

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
            <tr
              data-cy="todo"
              key={todo.id}
              className={classNames({ 'has-background-info-light': selectedTodo?.id === todo.id })}
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
                <p className={todo.completed
                  ? 'has-text-success'
                  : 'has-text-danger'}
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
                    dispatch(actions.setTodo(todo));
                    setIsButtonActive(prev => !prev);
                  }}
                >
                  <span className="icon">
                    <i className={classNames(isButtonActive
                      && selectedTodo?.id === todo.id
                      ? 'far fa-eye-slash'
                      : 'far fa-eye')}
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
