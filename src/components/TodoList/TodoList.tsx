import React, { useMemo } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  actions as currentTodoActions,
} from '../../features/currentTodo/actions';
import { getCurrentTodoId } from '../../features/currentTodo/selectors';
import { getFilter } from '../../features/filter/selectors';

import { filterTodosByQuery } from '../../helpers/filterTodosByQuery';
import { filterTodosByStatus } from '../../helpers/filterTodosByStatus';

import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  const dispatch = useAppDispatch();
  const { query, status } = useAppSelector(getFilter);
  const selectedTodoId = useAppSelector(getCurrentTodoId);

  const filteredTodosByStatus = useMemo(
    () => filterTodosByStatus(todos, status),
    [status, todos],
  );

  const visibleTodos = useMemo(
    () => filterTodosByQuery(filteredTodosByStatus, query),
    [query, filteredTodosByStatus],
  );

  const isMatching = visibleTodos.length && todos.length;

  return (
    <>
      {isMatching ? (
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
            {visibleTodos.map((todo) => (
              <tr
                key={todo.id}
                data-cy="todo"
              >
                <td className="is-vcentered">
                  {todo.id}
                </td>

                <td className="is-vcentered">
                  {todo.completed && (
                    <span
                      className="icon"
                      data-cy="iconCompleted"
                    >
                      <i className="fas fa-check" />
                    </span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={classNames({
                      'has-text-success': todo.completed,
                      'has-text-danger': !todo.completed,
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
                    onClick={() => {
                      dispatch(currentTodoActions.setTodo(todo));
                    }}
                  >
                    <span className="icon">
                      <i
                        className={classNames('far', {
                          'fa-eye': todo.id !== selectedTodoId,
                          'fa-eye-slash': todo.id === selectedTodoId,
                        })}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
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
