/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as ActionCurrentTodo } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const filterStatus = useAppSelector(state => state.filter.status);
  const filterQuery = useAppSelector(state => state.filter.query);
  const currentTodo = useAppSelector(state => state.currentTodo);
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();

  const filterTodosByStatus = useMemo(() => {
    const copy = [...todos];

    if (filterStatus === 'active') {
      return copy.filter((todo:Todo) => !todo.completed);
    }

    if (filterStatus === 'completed') {
      return copy.filter((todo:Todo) => todo.completed);
    }

    return copy;
  }, [filterStatus]);

  const filterTodosByQuery = useMemo(() => {
    const copy = [...filterTodosByStatus];

    if (filterQuery) {
      return copy.filter((todo:Todo) => todo.title.toLowerCase().includes(filterQuery.toLowerCase()));
    }

    return copy;
  }, [filterTodosByStatus, filterQuery]);

  const chooseTodo = (todo:Todo) => {
    if (currentTodo === todo) {
      dispatch(ActionCurrentTodo.removeTodo());
    } else {
      dispatch(ActionCurrentTodo.setTodo(todo));
    }
  };

  const disable = useCallback((todo:Todo) => {
    return currentTodo ? currentTodo !== todo : true;
  }, [currentTodo]);

  const active = useCallback((todo:Todo) => {
    return currentTodo ? currentTodo === todo : false;
  }, [currentTodo]);

  return (
    <>
      {!filterTodosByQuery.length && (
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
          {filterTodosByQuery.map((todo:Todo) => {
            return (
              <tr data-cy="todo" key={todo.id}>
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted">
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p className={classNames({
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
                    onClick={() => chooseTodo(todo)}
                  >
                    <span className="icon">
                      <i className={classNames('far', {
                        'fa-eye': disable(todo),
                        'fa-eye-slash': active(todo),
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
