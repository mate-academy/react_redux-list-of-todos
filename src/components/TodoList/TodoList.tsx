/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, { useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as selectTodoAction } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { FilterBy } from '../../types/FilterBy';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();
  const { query, status } = filter;

  const onSelectTodo = (newTodo: Todo) => {
    dispatch(selectTodoAction.setTodo(newTodo));
  };

  const filteredTodos: Todo[] = useMemo(() => {
    let preparedTodos = [...todos];

    if (status) {
      preparedTodos = preparedTodos.filter((todo: Todo) => {
        switch (status) {
          case FilterBy.ACTIVE:
            return !todo.completed;

          case FilterBy.COMPLETED:
            return todo.completed;

          case FilterBy.ALL:
          default:
            return todo;
        }
      });
    }

    if (query.trim()) {
      preparedTodos = preparedTodos
        .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
    }

    return preparedTodos;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, filter, query]);

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
              <tr
                data-cy="todo"
                key={todo.id}
                className={classNames({
                  'has-background-info-light': currentTodo === todo,
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
                    onClick={() => onSelectTodo(todo)}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': currentTodo !== todo,
                          'fa-eye-slash': currentTodo === todo,
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
