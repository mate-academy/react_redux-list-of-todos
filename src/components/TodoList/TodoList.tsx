/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { getVisibleTodos } from '../../utils/getVisibleTodos';

export const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos);
  const selectedTodo = useAppSelector((state) => state.currentTodo);
  const { status, query } = useAppSelector((state) => state.filter);
  const dispatch = useDispatch();

  const visibleTodos = useMemo(() => {
    return getVisibleTodos(todos, query, status);
  }, [todos, query, status]);

  const setSelectedTodo = (todo: Todo) => {
    dispatch(currentTodoActions.setTodo(todo));
  };

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
              {visibleTodos.map((todo) => (
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
                      onClick={() => setSelectedTodo(todo)}
                    >
                      <span className="icon">
                        <i
                          className={classNames('far', {
                            'fa-eye-slash': selectedTodo?.id === todo.id,
                            'fa-eye': selectedTodo?.id !== todo.id,
                          })}
                        />
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
