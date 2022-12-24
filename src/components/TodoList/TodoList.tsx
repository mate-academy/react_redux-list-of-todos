/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Todo } from '../../types/Todo';
import { actions as currentActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos: Todo[] = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();

  const [renderTodos, setrenderTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setrenderTodos(todos
      .filter(todo => {
        if (todo.title.toLowerCase().includes(query.toLowerCase())) {
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
        }

        return false;
      }));
  }, [query, status]);

  useEffect(() => {
    setrenderTodos(todos);
  }, [todos]);

  const setCurrentTodo = useCallback((todo) => dispatch(currentActions.setTodo(todo)), []);

  return (
    <>
      {renderTodos.length > 0
        ? (
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
              {renderTodos.map(todo => {
                return (
                  <tr data-cy="todo" key={todo.id}>
                    <td className="is-vcentered">{todo.id}</td>
                    <td className="is-vcentered">
                      {todo.completed
                        ? (
                          <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                        )
                        : null}
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
                        onClick={() => {
                          setCurrentTodo(todo);
                        }}
                      >
                        <span className="icon">
                          <i className="far fa-eye" />
                        </span>
                      </button>
                    </td>
                  </tr>
                );
              })}
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
