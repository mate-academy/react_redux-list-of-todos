/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentAction } from '../../features/currentTodo';
import { actions as filterActions, filterTodos } from '../../features/filter';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const loadedTodos = useAppSelector((state) => state.todos);
  const openedTodo = useAppSelector((state) => state.currentTodo);
  const { query, status } = useAppSelector((state) => state.filter);

  useEffect(() => {
    dispatch(filterActions.filterTodosAction(query, status));
  }, [dispatch, query, status]);

  const handleSelect = (todo: Todo) => {
    dispatch(currentAction.setTodo(todo));
  };

  const filteredTodos = filterTodos(query, status, loadedTodos);

  return (
    <>
      {filteredTodos.length > 0 ? (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>
              <th aria-label="View Todo">
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>
              <th>Title</th>
              <th aria-label="View Todo"> </th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map(todo => (
              <tr key={todo.id} data-cy="todo">
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                  {' '}
                </td>
                <td className="is-vcentered is-expanded">
                  <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>
                    {todo.title}
                  </p>
                </td>
                <td className="has-text-right is-vcentered">
                  <button data-cy="selectButton" className="button" onClick={() => handleSelect(todo)} type="button">
                    <span className="icon">
                      {openedTodo === todo
                        ? <i className="far fa-eye-slash" />
                        : <i className="far fa-eye" />}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="notification is-warning">
          There are no todos matching the current filter criteria
        </p>
      )}
    </>
  );
};
