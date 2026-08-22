/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setCurrentTodo } from '../../features/currentTodo';
import classNames from 'classnames';

export const TodoList: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const { query, status } = useSelector((state: RootState) => state.filter);
  const currentTodo = useSelector((state: RootState) => state.currentTodo);
  const dispatch = useDispatch();

  const visibleTodos = todos.filter(todo => {
    const matchesQuery = todo.title.toLowerCase().includes(query.toLowerCase());
    let matchesStatus = false;

    if (status === 'all') {
      matchesStatus = true;
    } else if (status === 'completed') {
      matchesStatus = todo.completed === true;
    } else if (status === 'active') {
      matchesStatus = todo.completed === false;
    }

    return matchesQuery && matchesStatus;
  });


  return (
    <>
      {visibleTodos.length === 0 && (
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
      {visibleTodos.map(todo => {
        const isSelected = currentTodo?.id === todo.id;

        return (
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
              <p className="has-text-danger">{todo.title}</p>
            </td>

            <td className="has-text-right is-vcentered">
              <button
                data-cy="selectButton"
                className="button"
                type="button"
                onClick={() => dispatch(setCurrentTodo(isSelected ? null : todo))}
              >
                <span className="icon">
                  <i
                    className={classNames('far', {
                      'fa-eye-slash': isSelected,
                      'fa-eye': !isSelected,
                    })}
                  />
                </span>
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
      </table>
    </>
  );
};
