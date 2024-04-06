/* eslint-disable */
import React, { useMemo } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const setTodo = (todo: Todo) => dispatch(currentTodoActions.setTodo(todo));

  const filteringTodos = useMemo(() => {
    let filterTodos = [...todos];

    if (filter.query) {
      filterTodos = filterTodos.filter(todo => {
        return todo.title.toLowerCase().includes(filter.query.toLowerCase());
      });
    }

    return filterTodos.filter(todo => {
      if (filter.status === 'all') {
        return true;
      }

      if (filter.status === 'active') {
        return !todo.completed;
      }

      return todo.completed;
    });
  }, [filter, todos]);

  const handleSelect = (todo: Todo) => {
    setTodo(todo);
  };

  return (
    <>
      {!filteringTodos.length ? (
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
            {filteringTodos.map(todo => (
              <tr
                data-cy="todo"
                className={classNames({
                  'has-background-info-light': currentTodo === todo,
                })}
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
                    onClick={() => handleSelect(todo)}
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
