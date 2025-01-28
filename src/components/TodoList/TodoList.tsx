/* eslint-disable */
import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../hooks/useAppSelector';
import { currentTodoSlice } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();

  const todos = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const filteredTodos = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    const cleanStatus = status === 'completed' ? true : false;

    return todos.filter(
      todo =>
        todo.title.toLowerCase().includes(cleanQuery) &&
        (status === 'all' || todo.completed === cleanStatus),
    );
  }, [query, status]);

  const selectTodo = useCallback((todo: Todo | null) => {
    dispatch(currentTodoSlice.actions.select(todo));
  }, []);

  const hasTodo = filteredTodos.length !== 0;

  return (
    <>
      {!hasTodo && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {hasTodo && (
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
            {filteredTodos.map(todo => {
              const isSelected = currentTodo?.id === todo.id;

              return (
                <tr
                  data-cy="todo"
                  className={classNames({
                    'has-background-info-light': isSelected,
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
                    <p className="has-text-danger">{todo.title}</p>
                  </td>

                  <td className="has-text-right is-vcentered">
                    <button
                      data-cy="selectButton"
                      className="button"
                      type="button"
                      onClick={() => selectTodo(isSelected ? null : todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye': !isSelected,
                            'fa-eye-slash': isSelected,
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
      )}
    </>
  );
};
