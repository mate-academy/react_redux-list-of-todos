import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currTodoActions } from '../../features/currentTodo';

import { Status } from '../../types/Status';
import { Error } from '../Error';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const { filter, todos } = useAppSelector(state => state);

  const getSortedTodos = () => {
    const filteredByQuery = todos.filter(({ title }) => (
      title.toLowerCase().includes(filter.query.toLowerCase())
    ));

    return filteredByQuery.filter(({ completed }) => {
      switch (filter.status) {
        case Status.ACTIVE:
          return !completed;

        case Status.COMPLETED:
          return completed;

        default:
          return true;
      }
    });
  };

  const sortedTodos = useMemo(
    getSortedTodos, [filter, todos],
  );

  return (
    <>
      {!sortedTodos.length
        ? (
          <Error>
            There are no todos matching current filter criteria
          </Error>
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
              {sortedTodos.map((todo) => {
                const isCurrentTodo = selectedTodo?.id === todo.id;

                return (
                  <tr
                    data-cy="todo"
                    className=""
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
                        onClick={() => (
                          dispatch(currTodoActions.setTodo(todo))
                        )}
                      >
                        <span className="icon">
                          <i className={classNames(
                            'far',
                            {
                              'fa-eye': !isCurrentTodo,
                              'fa-eye-slash': isCurrentTodo,
                            },
                          )}
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
