/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const { status, query } = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const getVisibleTodos = () => {
    let todosStatus;

    switch (status) {
      case 'active':
        todosStatus = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        todosStatus = todos.filter(todo => todo.completed);
        break;
      default:
        todosStatus = todos;
    }

    return todosStatus.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  };

  useEffect(() => {
    setVisibleTodos(getVisibleTodos());
  }, [status, query]);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  return (
    <>
      {
        visibleTodos.length === 0
          ? (
            <p className="notification is-warning">
              There are no todos matching current filter criteria
            </p>
          )
          : (
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
                {visibleTodos.map(todo => (
                  <tr
                    data-cy="todo"
                    key={todo.id}
                    className={classNames(
                      { 'has-background-info-light': todo.id === currentTodo?.id },
                    )}
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
                      <p className={classNames(
                        { 'has-text-danger': !todo.completed },
                        { 'has-text-success': todo.completed },
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
                          <i className={classNames(
                            'far',
                            {
                              'far fa-eye': todo.id !== currentTodo?.id,
                              'fa-eye-slash': todo.id === currentTodo?.id,
                            },
                          )}
                          />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
      }
    </>
  );
};
