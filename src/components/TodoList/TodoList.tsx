/* eslint-disable max-len */
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { status, query } = useAppSelector(state => state.filter);

  const setSelectedTodo = (newTodo: Todo) => dispatch(currentTodoActions.setTodo(newTodo));

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, status, query);
  }, [todos, status, query]);

  return (
    <>
      {visibleTodos.length === 0 ? (
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

          {todos.length > 0 && (
            <tbody>
              {visibleTodos.map(todo => (
                <tr
                  data-cy="todo"
                  key={todo.id}
                  className={selectedTodo ? (
                    classNames(
                      { 'has-background-info-light': selectedTodo.id === todo.id },
                    )
                  ) : ''}
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
                      className={!todo.completed
                        ? 'has-text-danger' : 'has-text-success'}
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
                        {selectedTodo && selectedTodo.id === todo.id ? (
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
          )}
        </table>
      )}
    </>
  );
};
